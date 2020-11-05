const { Socket } = require("dgram");
const express = require("express");
const app = express();
// Importando HTTP nativo do node e criando o servidor (necessário para trabalhar com socket.io)
const http = require("http").createServer(app);
// Importando socket.io recebendo como parametro o servidor http
const io = require("socket.io")(http);

app.use(express.static("public"));

// Abrindo evento de conexão
io.on("connection", (socket) => {

    // Capturando desconexão do cliente
    socket.on("disconnect", () => {
        console.log("x desconectou: " + socket.id);
    });

    // Capturando evento "msg"
    socket.on("msg", (data) => {
        // Emitindo evento para o frontend, usando "io", o evento e emitido a partir do servidor para todos os clientes
        io.emit("showmsg", data);
        console.log(data);
    });
});

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
});

// Abrindo servidor nativo com HTTP na porta 3000
http.listen(3000, () => {
    console.log("Server is running...")
});