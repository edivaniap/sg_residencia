const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
const {eComum} = require("../helpers/eComum")

/* CARREGANDO MODELS */
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")

/* ROTAS */

/* Home */
router.get("/", eComum, (req, res) => {
  res.render("residente/home")
})

module.exports = router
