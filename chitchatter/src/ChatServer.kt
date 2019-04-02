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

        if (list.size == 1) {
            val response = ChatApplication.MessageInfo("Server", "Member joined: $name.")
            broadcast(response)
        }

        val messages = synchronized(lastMessages) { lastMessages.toList() }
        for (messageInfo in messages) {
            val response = ChatApplication.MessageInfo(memberNames[messageInfo.sender]!!, messageInfo.message, socketInfo.channel)
            val jsonStr = mapper.writeValueAsString(response)
            socketInfo.socket.send(jsonStr)
        }
    }

    suspend fun memberRenamed(member: ChatApplication.Member, to: String) {
        val oldName = memberNames.put(member.id, to) ?: member.id
        val response = ChatApplication.MessageInfo("Server", "Member renamed from $oldName to $to")
        broadcast(response)
    }

    suspend fun memberLeft(member: ChatApplication.Member, socketInfo: ChatApplication.SocketInfo) {
        val connections = members[member.id]
        connections?.remove(socketInfo)

        if (connections != null && connections.isEmpty()) {
            val name = memberNames.remove(member.id) ?: member.id
            val response = ChatApplication.MessageInfo("Server", "Member left: $name.")
            broadcast(response)
        }
    }

    suspend fun who(message: ChatApplication.MessageInfo) {
        val res = message.copy(
            sender = "Server",
            message = memberNames.values.joinToString(prefix = "[server::who] "),
            recipient = message.sender
        )
        sendTo(res)
    }

    suspend fun help(message: ChatApplication.MessageInfo) {
        val res = message.copy(
            sender = "Server",
            message = "[server::help] Possible commands are: /user, /help and /who",
            recipient = message.sender
        )
        sendTo(res)
    }

    suspend fun sendTo(message: ChatApplication.MessageInfo) {
        val recipientSockets = members[message.recipient]
        recipientSockets?.send(message)
    }

    suspend fun message(message: ChatApplication.MessageInfo) {
        val name = memberNames[message.sender] ?: message.sender
        message.sender = name;

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
                socketInfo.socket.send(jsonStr)
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