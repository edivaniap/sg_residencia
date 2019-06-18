const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const {eAdmin} = require("../helpers/eAdmin")

/* CARREGANDO MODELS */
require("../models/Residente")
const Residente = mongoose.model("residentes")
require("../models/Residencia")
const Residencia = mongoose.model("residencias")
require("../models/Quarto")
const Quarto = mongoose.model("quartos")

/* ROTAS */

/* Home */
// router.get("/", eAdmin, (req, res) => {
//   res.render("servidor/home")
// })

router.get("/", (req, res) => {
  //conta residentes
  Residente.count().then((numResidentes) => {
    //conta residencias
    Residencia.count().then((numResidencias) => {
      //conta vagas
      Quarto.find().then((quartos) => {
        var vagas = 0;
        for (var i = 0; i < quartos.length; i++) {
          vagas += quartos[i].capacidade - quartos[i].membros
        }
        res.render("servidor/home", {numResidentes: numResidentes, numResidencias: numResidencias, vagas: vagas})
      })
    })
  })
})

/* Gerencia de residencias */
const ger_residencias = require("./ger_residencias")
router.use("/residencias", ger_residencias)

/* Gerencia de residentes */
const ger_residentes = require("./ger_residentes")
router.use("/residentes", ger_residentes)

/* Gerencia de servidores */
const ger_servidores = require("./ger_servidores")
router.use("/servidores", ger_servidores)

/* Gerencia de solicitacoes */

module.exports = router
