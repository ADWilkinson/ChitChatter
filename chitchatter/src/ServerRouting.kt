package io.chitchatter

import io.ktor.application.call
import io.ktor.http.HttpStatusCode
import io.ktor.http.cio.websocket.CloseReason
import io.ktor.http.cio.websocket.Frame
import io.ktor.http.cio.websocket.close
import io.ktor.http.cio.websocket.readText
import io.ktor.http.content.defaultResource
import io.ktor.http.content.resources
import io.ktor.http.content.static
import io.ktor.response.respond
import io.ktor.response.respondText
import io.ktor.routing.Routing
import io.ktor.routing.get
import io.ktor.sessions.get
import io.ktor.sessions.sessions
import io.ktor.sessions.set
import io.ktor.websocket.webSocket
import kotlinx.coroutines.ObsoleteCoroutinesApi
import kotlinx.coroutines.channels.consumeEach

fun Routing.root() {
    static {
        defaultResource("index.html", "web")
        resources("web")
    }
}

fun Routing.status() {
    get("/status") {
        call.respond(HttpStatusCode(200, "OK"), "OK")
    }
}

@ObsoleteCoroutinesApi
fun Routing.chatSocket(server: ChatServer) {
    webSocket("/ws/{location}") {
        // this: WebSocketSession ->
        val channel = Channels.valueOf(call.parameters["location"] ?: "Global")
        println(channel)

        val session = call.sessions.get<ChatApplication.ChatSession>()

        if (session == null) {
            close(CloseReason(CloseReason.Codes.VIOLATED_POLICY, "No session exists."))
            return@webSocket
        }

        //call.sessions.set(session.copy(id = session.id, channel = channel))

        server.memberJoin(session.id, this)

        try {
            incoming.consumeEach { frame ->
                // Frames can be [Text], [Binary], [Ping], [Pong], [Close].
                if (frame is Frame.Text) {
                    messageHandler(session.id, frame.readText(), server)
                }
            }
        } finally {
            server.memberLeft(session.id, this)
        }
    }
}



