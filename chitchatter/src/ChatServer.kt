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
            broadcast("server", "Member joined: $name.")
        }

        val messages = synchronized(lastMessages) { lastMessages.toList() }
        for (messageInfo in messages) {
            val response = ChatApplication.MessageInfo(member.id, messageInfo.message, socketInfo.channel)
            val jsonStr = mapper.writeValueAsString(response)
            socketInfo.socket.send(jsonStr)
        }
    }

    suspend fun memberRenamed(member: String, to: String) {
        val oldName = memberNames.put(member, to) ?: member
        broadcast("server", "Member renamed from $oldName to $to")
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

    suspend fun who(sender: String) {
        val member = members[sender]
        val memberList = memberNames.values.joinToString(prefix = "[server::who] ")

        member?.send(sender, memberList)
    }

    suspend fun help(sender: String) {
        val helpStr = "[server::help] Possible commands are: /user, /help and /who"
        val member = members[sender]

        member?.send(sender, helpStr)
    }

    suspend fun sendTo(recipient: String, sender: String, message: String) {
        val recipientSockets = members[recipient]

        recipientSockets?.send(sender, message, recipient)
    }

    suspend fun message(sender: String, message: String, channel: Channels) {

        val name = memberNames[sender] ?: sender
        val response = ChatApplication.MessageInfo(name, message, channel)
        broadcast(response)

        synchronized(lastMessages) {
            lastMessages.add(response)
            if (lastMessages.size > 100) {
                lastMessages.removeFirst()
            }
        }
    }

    private suspend fun broadcast(message: ChatApplication.MessageInfo) {
        members.values.forEach { socket ->
            socket.send(message.sender, message.message)
        }
    }

    private suspend fun List<ChatApplication.SocketInfo>.send(sender: String, message: String, recipient: String = "") {
        forEach {

            val response = ChatApplication.MessageInfo(sender, message, it.channel, recipient)
            val jsonStr = mapper.writeValueAsString(response)
            try {
                it.socket.send(jsonStr)
            } catch (t: Throwable) {
                try {
                    it.socket.close(CloseReason(CloseReason.Codes.PROTOCOL_ERROR, ""))
                } catch (ignore: ClosedSendChannelException) {
                    // at some point it will get closed
                }
            }
        }
    }
}