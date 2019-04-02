package io.chitchatter

suspend fun messageHandler(
    member: ChatApplication.Member,
    command: String,
    server: ChatServer,
    channel: Channels
) {

    val messageInfo = ChatApplication.MessageInfo(member.id, command, channel)

    when {
        command.startsWith("/who") -> server.who(messageInfo)
        command.startsWith("/user") -> {
            val newName = command.removePrefix("/user").trim()
            when {
                newName.isEmpty() -> server.sendTo(messageInfo.copy(sender = "Server", message = "[server::help] /user [newName]"))
                newName.length > 50 -> server.sendTo(messageInfo.copy(sender = "Server",message = "[server::help] new name is too long: 50 characters limit"))
                else -> server.memberRenamed(member, newName)
            }
        }
        command.startsWith("/help") -> server.help(messageInfo)
        command.startsWith("/") -> server.sendTo(messageInfo.copy(message = "server::help Unknown command ${command.takeWhile { !it.isWhitespace() }}"))
        else -> server.message(messageInfo)
    }
}