/* CARREGANDO MODULOS */
const express = require("express")
const handlebars = require("express-handlebars")
const body_parser = require("body-parser")
const mongoose = require("mongoose")
const app = express()
const servidor = require("./routes/servidor")
const path = require("path")

/* CONFIG TEMPLATE ENGINE */
app.engine("handlebars", handlebars({defaultLayout: "main"}))
app.set("view engine", "handlebars")

/* CONFIG BODY PARSER */
app.use(body_parser.urlencoded({extended: true}))
app.use(body_parser.json())

/* CONFIG MONGOOSE */
mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost/dbresidente").then(() => {
  console.log("MongoDB Conectado...")
}).catch((err) => {
  console.log("Houve um erro ao se conectar com o MongoDB: " + err);
})

/* CONFIG PASTA DE ARQUIVOS ESTATICOS (CSS, JS...) */
app.use(express.static(path.join(__dirname, "public")))

/* ROTAS */
app.use("/servidor", servidor)

/* LISTENER */
const PORT = 8082
app.listen(PORT, () => {
  console.log("Servidor rodando em localhost:" + PORT)
})
