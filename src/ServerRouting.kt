package io.chitchatter

import io.ktor.application.call
import io.ktor.http.HttpStatusCode
import io.ktor.http.cio.websocket.CloseReason
import io.ktor.http.cio.websocket.Frame
import io.ktor.http.cio.websocket.close
import io.ktor.http.cio.websocket.readText
import io.ktor.http.content.*
import io.ktor.response.respond
import io.ktor.routing.Route
import io.ktor.routing.Routing
import io.ktor.routing.get
import io.ktor.sessions.get
import io.ktor.sessions.sessions
import io.ktor.websocket.webSocket
import kotlinx.coroutines.ObsoleteCoroutinesApi
import kotlinx.coroutines.channels.consumeEach
import java.io.File

fun Route.root() {
    static {
        //defaultResource("index.html", "web/build")
        //        resources("web/build")
        files("static")
        default("static/index.html")

//        staticRootFolder = File("./resources/web/build")
//        files(".")
//        default("index.html")
    }
}

fun Route.status() {
    get("/status") {
        call.respond(HttpStatusCode(200, "OK"), "OK")
    }
}

@ObsoleteCoroutinesApi
fun Route.chatSocket(server: ChatServer) {
    webSocket("/ws/{location}") {
        // this: WebSocketSession ->
        val channel = Channels.valueOf(call.parameters["location"] ?: "Global")
        println(channel)

        val session = call.sessions.get<ChatApplication.ChatSession>()

        if (session == null) {
            close(CloseReason(CloseReason.Codes.VIOLATED_POLICY, "No session exists."))
            return@webSocket
        }

        val member = ChatApplication.Member(session.id)
        val socketInfo = ChatApplication.SocketInfo(this, channel)

        server.memberJoin(member, socketInfo)

        try {
            incoming.consumeEach { frame ->
                // Frames can be [Text], [Binary], [Ping], [Pong], [Close].
                if (frame is Frame.Text) {
                    messageHandler(member, frame.readText(), server, channel)
                }
            }
        } finally {
            server.memberLeft(member, socketInfo)
        }
    }
}



