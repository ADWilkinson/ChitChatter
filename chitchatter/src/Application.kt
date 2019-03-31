package co.uk.chitchatter

import io.ktor.application.*
import io.ktor.response.*
import io.ktor.request.*
import io.ktor.routing.*
import io.ktor.http.*
import io.ktor.sessions.*
import io.ktor.websocket.*
import io.ktor.http.cio.websocket.*
import java.time.*
import java.util.*
import java.util.concurrent.atomic.AtomicInteger
import kotlinx.serialization.*
import kotlinx.serialization.json.Json

fun main(args: Array<String>): Unit = io.ktor.server.netty.EngineMain.main(args)

@Suppress("unused") // Referenced in application.conf
@kotlin.jvm.JvmOverloads
fun Application.module(testing: Boolean = false) {
    install(Sessions) {
        cookie<MySession>("MY_SESSION") {
            cookie.extensions["SameSite"] = "lax"
        }
    }

    install(WebSockets) {
        pingPeriod = Duration.ofSeconds(15)
        timeout = Duration.ofSeconds(15)
        maxFrameSize = Long.MAX_VALUE
        masking = false
    }

    routing {
        get("/") {
            val jsonData = Json.stringify(MySession.serializer(), MySession())
            call.respondText(jsonData, contentType = ContentType.Application.Json)
        }

        get("/session/increment") {
            val session = call.sessions.get<MySession>() ?: MySession()
            call.sessions.set(session.copy(count = session.count + 1))
            call.respondText("Counter is ${session.count}. Refresh to increment.")
        }

        val clients = Collections.synchronizedSet(LinkedHashSet<ChatClient>())

        webSocket("/chat") { // this: DefaultWebSocketSession
            val client = ChatClient(this)
            clients += client
            try {
                while (true) {
                    val frame = incoming.receive()
                    when (frame) {
                        is Frame.Text -> {
                            val text = frame.readText()
                            // Iterate over all the connections
                            val textToSend = "${client.name} said: $text"
                            for (other in clients.toList()) {
                                other.session.outgoing.send(Frame.Text(textToSend))
                            }
                        }
                    }
                }
            } finally {
                clients -= client
            }
        }
    }
}

@Serializable
data class MySession(val count: Int = 0)

class ChatClient(val session: DefaultWebSocketSession) {
    companion object { var lastId = AtomicInteger(0) }
    val id = lastId.getAndIncrement()
    val name = "user$id"
}
