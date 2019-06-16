/* CARREGANDO MODULOS */
const express = require("express")
const handlebars = require("express-handlebars")
const body_parser = require("body-parser")
const mongoose = require("mongoose")
const app = express()
const servidor = require("./routes/servidor")
const residente = require("./routes/residente")
const path = require("path")
const session = require("express-session")
const flash = require("connect-flash")

/* CONFIG SESSÃO */
app.use(session({
  secret: "projetoweb20191bti",
  resave: true,
  saveUninitialized: true
}))

/* CONFIG FLASH */
app.use(flash())

/* MIDDLEWARE */
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg")
  res.locals.error_msg = req.flash("error_msg")
  next()
})

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
app.get("/", (req, res) => {
  res.render("login")
})

app.use("/servidor", servidor)

app.use("/residente", residente)

/* LISTENER */
const PORT = 8082
app.listen(PORT, () => {
  console.log("Servidor rodando em localhost:" + PORT)
})
