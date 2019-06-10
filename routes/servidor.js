const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

/* CARREGANDO MODEL */
require("../models/Residencia")
const Residencia = mongoose.model("residencias")

/* ROTAS */

router.get("/", (req, res) => {
  res.render("servidor/index")
})

router.get("/residencias", (req, res) => {
  res.render("servidor/residencias")
})

router.get("/residencias/adicionar", (req, res) => {
  res.render("servidor/addresidencia")
})

router.post("/residencias/nova", (req, res) => {
  const novaResidencia = {
    nome: req.body.nome,
    endereco: req.body.endereco
  }

  new Residencia(novaResidencia).save().then(() => {
    console.log("Residencia adicionada com sucesso")
  }).catch((err) => {
    console.log("Erro ao tentar adicionar residencia: " + err)
  })
})

module.exports = router
