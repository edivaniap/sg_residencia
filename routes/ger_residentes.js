const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

/* CARREGANDO MODELS */
require("../models/Residente")
const Residente = mongoose.model("residentes")
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")
require("../models/Residencia")
const Residencia = mongoose.model("residencias")
require("../models/Quarto")
const Quarto = mongoose.model("quartos")


/* ROTAS */

/* Gerencia de residentes */
router.get("/", (req, res) => {
  Residente.find().populate("usuario").sort({criacao: "desc"}).then((residentes) => {
    res.render("servidor/residentes", {residentes: residentes})
  }).catch((err) => {
    req.flash("error_msg", "Erro ao tentar listar as residentes: " + err)
    res.redirect("/servidor")
  })
})

/* abre formulario de cadastro de residente */
router.get("/adicionar", (req, res) => {
  Residencia.find().populate({path: "quartos", model: Quarto}).sort({criacao: "desc"}).then((residencias) => {
    res.render("servidor/addresidente", {residencias: residencias})
  }).catch((err) => {
    req.flash("error_msg", "Erro ao tentar listar as residencias: " + err)
    res.redirect("/servidor")
  })
})

/* cadastra a residente no banco */
router.post("/adicionar", (req, res) => {
  var erros = []

  if(req.body.senha != req.body.confirmacao) {
    erros.push({texto: "A senha e confimação não conferem"})
  }


  if(erros.length > 0) {
    res.render("servidor/addresidente", {erros: erros})
  } else {
    const novoUsuario = {
      nome: req.body.nome,
      cpf: req.body.cpf,
      matricula: req.body.matricula,
      senha: req.body.senha,
      sexo: req.body.sexo,
      endereco: req.body.endereco
    }

    new Usuario(novoUsuario).save().then((lastUsuario) => {
      const novoResidente = {
        renda: req.body.renda,
        curso: req.body.curso,
        matricula: req.body.matricula,
        quarto: id_quarto,
        usuario: lastUsuario._id
      }

      new Residente(novoResidente).save.then(() => {
        /*editar numero de membros no quarto*/
        Quarto.findOne({_id: id_quarto}).then((quarto) => {
          quarto.membros = quarto.membros + 1,
          quarto.atualizacao = Date.now()

          quarto.save()
        })

        req.flash("success_msg", "Residente adicionado com sucesso")
        res.redirect("/servidor/residentes")
      }).catch((err) => {
        req.flash("error_msg", "Erro ao tentar adicionar residente: " + err)
        res.redirect("/servidor/residentes")
      })


    }).catch((err) => {
      req.flash("error_msg", "Erro ao tentar adicionar residente: " + err)
      res.redirect("/servidor/residentes")
    })
  }
})


module.exports = router
