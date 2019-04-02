package io.chitchatter

suspend fun messageHandler(
    member: ChatApplication.Member,
    command: String,
    server: ChatServer,
    channel: Channels
) {
    when {
        command.startsWith("/who") -> server.who(member.id)
        command.startsWith("/user") -> {
            val newName = command.removePrefix("/user").trim()
            when {
                newName.isEmpty() -> server.sendTo(member.id, "server::help", "/user [newName]")
                newName.length > 50 -> server.sendTo(
                    member.id,
                    "server::help",
                    "new name is too long: 50 characters limit"
                )
                else -> server.memberRenamed(member.id, newName)
            }
        }
        command.startsWith("/help") -> server.help(member.id)
        command.startsWith("/") -> server.sendTo(
            member.id,
            "server::help",
            "Unknown command ${command.takeWhile { !it.isWhitespace() }}"
        )
        else -> server.message(member.id, command, channel)
    }
}