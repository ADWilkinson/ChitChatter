package io.chitchatter

suspend fun messageHandler(
    member: ChatApplication.Member,
    command: String,
    server: ChatServer,
    channel: Channels
) {

    val messageInfo =
        ChatApplication.MessageInfo(userId = member.id, sender = member.id, message = command, channel = channel)

    when {
        command.startsWith("/who") -> server.who(messageInfo)
        command.startsWith("/user") -> {
            val newName = command.removePrefix("/user").trim()
            when {
                newName.isEmpty() -> server.sendTo(
                    messageInfo.copy(
                        userId = "SERVER",
                        sender = "SERVER",
                        message = "/user [newName]",
                        recipient = messageInfo.sender,
                        type = "SERVER_MESSAGE"
                    )
                )
                newName.length > 50 -> server.sendTo(
                    messageInfo.copy(
                        userId = "SERVER",
                        sender = "SERVER",
                        message = "New name is too long, there is a 50 characters limit",
                        recipient = messageInfo.sender,
                        type = "SERVER_MESSAGE"
                    )
                )
                else -> server.memberRenamed(member, newName)
            }
        }
        command.startsWith("/help") -> server.help(messageInfo)
        command.startsWith("/") -> server.sendTo(
            messageInfo.copy(
                userId = "SERVER",
                sender = "SERVER",
                message = "Unknown command ${command.takeWhile { !it.isWhitespace() }}",
                recipient = messageInfo.sender,
                type = "SERVER_MESSAGE"
            )
        )
        else -> server.message(messageInfo)
    }
}