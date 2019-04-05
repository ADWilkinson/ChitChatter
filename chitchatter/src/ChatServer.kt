package io.chitchatter

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import io.ktor.http.cio.websocket.*
import kotlinx.coroutines.channels.ClosedSendChannelException
import java.util.*
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.CopyOnWriteArrayList
import java.util.concurrent.atomic.AtomicInteger

class ChatServer {
    private val usersCounter = AtomicInteger()
    private val memberNames = ConcurrentHashMap<String, String>()
    private val members = ConcurrentHashMap<String, MutableList<ChatApplication.SocketInfo>>()
    private val lastMessages = LinkedList<ChatApplication.MessageInfo>()
    private val mapper = jacksonObjectMapper()

    suspend fun memberJoin(member: ChatApplication.Member, socketInfo: ChatApplication.SocketInfo) {
        val name = memberNames.computeIfAbsent(member.id) { "user${usersCounter.incrementAndGet()}" }
        val list = members.computeIfAbsent(member.id) { CopyOnWriteArrayList<ChatApplication.SocketInfo>() }
        list.add(socketInfo)
        val messages = synchronized(lastMessages) { lastMessages.toList() }
        val users = memberNames.values

        val response = ChatApplication.MessageInfo(
            sender = "Server",
            message = "",
            channel = socketInfo.channel,
            type = "SERVER_UPDATE_MESSAGES",
            recipient = member.id
        )

        val usersResponse = ChatApplication.MessageInfo(
            sender = "Server",
            message = "",
            channel = socketInfo.channel,
            type = "SERVER_UPDATE_USERS"
        )

        for (messageInfo in messages) {
            response.messageHistory.add(messageInfo)
        }

        for (user in users) {
            usersResponse.participants.add(ChatApplication.Member(user))
        }

        // TOOD - change to send to only the joined user
        broadcast(response)
        // TODO -

        broadcast(usersResponse)

        if (list.size == 1) {
            val res = ChatApplication.MessageInfo(
                sender = "Server",
                message = "Member joined: $name.",
                channel = socketInfo.channel,
                type = "SERVER_MESSAGE"
            )
            broadcast(res)
        }

    }

    suspend fun memberRenamed(member: ChatApplication.Member, to: String) {
        val oldName = memberNames.put(member.id, to) ?: member.id
        val response = ChatApplication.MessageInfo(
            sender = "Server",
            message = "Member renamed from $oldName to $to",
            type = "SERVER_MESSAGE"
        )
        broadcast(response)
    }

    suspend fun memberLeft(member: ChatApplication.Member, socketInfo: ChatApplication.SocketInfo) {
        val connections = members[member.id]
        connections?.remove(socketInfo)

        if (connections != null && connections.isEmpty()) {
            val name = memberNames.remove(member.id) ?: member.id
            val response = ChatApplication.MessageInfo(
                sender = "Server",
                message = "Member left: $name.",
                channel = socketInfo.channel,
                type = "SERVER_MESSAGE"
            )
            broadcast(response)

            val users = memberNames.values

            val updateRes = ChatApplication.MessageInfo(
                sender = "Server",
                message = "",
                channel = socketInfo.channel,
                type = "SERVER_UPDATE_USERS"
            )

            for (user in users) {
                updateRes.participants.add(ChatApplication.Member(user))
            }

            broadcast(updateRes)

        }
    }

    suspend fun who(message: ChatApplication.MessageInfo) {
        val res = message.copy(
            sender = "Server",
            message = memberNames.values.joinToString(prefix = "[server::who] "),
            recipient = message.sender,
            type = "SERVER_MESSAGE"
        )
        sendTo(res)
    }

    suspend fun help(message: ChatApplication.MessageInfo) {
        val res = message.copy(
            sender = "Server",
            message = "[server::help] Possible commands are: /user, /help and /who",
            recipient = message.sender,
            type = "SERVER_MESSAGE"
        )
        sendTo(res)
    }

    suspend fun sendTo(message: ChatApplication.MessageInfo) {
        val recipientSockets = members[message.recipient]
        recipientSockets?.send(message)
    }

    suspend fun message(message: ChatApplication.MessageInfo) {
        val name = memberNames[message.sender] ?: message.sender
        message.sender = name

        broadcast(message)

        synchronized(lastMessages) {
            lastMessages.add(message)
            if (lastMessages.size > 100) {
                lastMessages.removeFirst()
            }
        }
    }

    private suspend fun broadcast(message: ChatApplication.MessageInfo) {
        for (socket in members.values) {
            socket.send(message)
        }
    }

    private suspend fun List<ChatApplication.SocketInfo>.send(message: ChatApplication.MessageInfo) {
        for (socketInfo in this) {
            val jsonStr = mapper.writeValueAsString(message)
            try {
                if(socketInfo.channel == message.channel) {
                    socketInfo.socket.send(jsonStr)
                }
            } catch (t: Throwable) {
                try {
                    socketInfo.socket.close(CloseReason(CloseReason.Codes.PROTOCOL_ERROR, ""))
                } catch (ignore: ClosedSendChannelException) {
                    // at some point it will get closed
                }
            }
        }
    }
}