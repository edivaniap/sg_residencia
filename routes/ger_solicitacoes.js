const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const {eAdmin} = require("../helpers/eAdmin")

/* CARREGANDO MODELS */


/* ROTAS */

/* Gerencia de residentes */
router.get("/", eAdmin, (req, res) => {
  res.render("servidor/solicitacoes")
})


module.exports = router
