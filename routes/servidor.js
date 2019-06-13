const express = require("express")
const router = express.Router()

/* ROTAS */

/* Home */
router.get("/", (req, res) => {
  res.render("servidor/home")
})

/* Gerencia de residencias */
const ger_residencias = require("./ger_residencias")
router.use("/residencias", ger_residencias)

/* Gerencia de residentes */
const ger_residentes = require("./ger_residentes")
router.use("/residentes", ger_residentes)

/* Gerencia de solicitacoes */

module.exports = router
