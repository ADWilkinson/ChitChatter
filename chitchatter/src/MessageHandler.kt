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
                newName.isEmpty() -> server.sendTo(
                    messageInfo.copy(
                        sender = "Server",
                        message = "[server::help] /user [newName]",
                        recipient = messageInfo.sender
                    )
                )
                newName.length > 50 -> server.sendTo(
                    messageInfo.copy(
                        sender = "Server",
                        message = "[server::help] new name is too long: 50 characters limit",
                        recipient = messageInfo.sender
                    )
                )
                else -> server.memberRenamed(member, newName)
            }
        }
        command.startsWith("/help") -> server.help(messageInfo)
        command.startsWith("/") -> server.sendTo(
            messageInfo.copy(
                sender = "Server",
                message = "[server::help] Unknown command ${command.takeWhile { !it.isWhitespace() }}",
                recipient = messageInfo.sender
            )
        )
        else -> server.message(messageInfo)
    }
}