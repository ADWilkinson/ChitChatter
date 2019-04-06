package io.chitchatter

import com.fasterxml.jackson.core.util.DefaultIndenter
import com.fasterxml.jackson.core.util.DefaultPrettyPrinter
import com.fasterxml.jackson.databind.SerializationFeature
import io.ktor.application.*
import io.ktor.features.CallLogging
import io.ktor.features.ContentNegotiation
import io.ktor.features.DefaultHeaders
import io.ktor.features.StatusPages
import io.ktor.http.HttpStatusCode
import io.ktor.http.cio.websocket.WebSocketSession
import io.ktor.jackson.jackson
import io.ktor.response.respond
import io.ktor.routing.routing
import io.ktor.server.engine.applicationEngineEnvironment
import io.ktor.server.engine.connector
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty
import io.ktor.sessions.*
import io.ktor.util.KtorExperimentalAPI
import io.ktor.util.generateNonce
import io.ktor.websocket.WebSockets
import kotlinx.coroutines.ObsoleteCoroutinesApi
import java.time.Duration

@KtorExperimentalAPI
@ObsoleteCoroutinesApi
fun main() {
    val env = applicationEngineEnvironment {
        module {
            ChatApplication().apply { main() }
        }

        // Private API
        connector {
            host = "127.0.0.1"
            port = 9090
        }
        // Public API
        connector {
            host = "0.0.0.0"
            port = System.getenv("PORT")?.toInt() ?: 8080
        }

    }
    embeddedServer(Netty, env).start(true)
}

class ChatApplication {

    companion object {
        private val server = ChatServer()
    }

    @ObsoleteCoroutinesApi
    @KtorExperimentalAPI
    fun Application.main() {

        install(DefaultHeaders)
        install(CallLogging)

        install(WebSockets) {
            pingPeriod = Duration.ofMinutes(1)
        }

        install(Sessions) {
            cookie<ChatSession>("SESSION")
        }

        install(StatusPages) {
            exception<Throwable> { cause ->
                call.respond(HttpStatusCode.InternalServerError)
                log.debug(cause.toString())
            }
        }

        install(ContentNegotiation) {
            jackson {
                configure(SerializationFeature.INDENT_OUTPUT, true)
                setDefaultPrettyPrinter(DefaultPrettyPrinter().apply {
                    indentArraysWith(DefaultPrettyPrinter.FixedSpaceIndenter.instance)
                    indentObjectsWith(DefaultIndenter("  ", "\n"))
                })
            }
        }
        intercept(ApplicationCallPipeline.Features) {
            if (call.sessions.get<ChatSession>() == null) {
                call.sessions.set(ChatSession(generateNonce()))
            }
        }
        routing {
            root()
            status()
            chatSocket(server)
        }
    }

    data class ChatSession(val id: String)
    data class SocketInfo(val socket: WebSocketSession, val channel: Channels)
    data class Member(val id: String)
    data class MessageInfo(
        val userId: String = "",
        var sender: String,
        var message: String = "",
        val channel: Channels = Channels.Global,
        val recipient: String = "",
        val messageTime: String = getCurrentFormattedTime(),
        val type: String = "USER_MESSAGE",
        var messageHistory: MutableList<MessageInfo> = mutableListOf(),
        var participants: MutableList<Member> = mutableListOf()
    )
}