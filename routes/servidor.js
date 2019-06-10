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
  Residencia.find().sort({criacao: "desc"}).then((residencias) => {
    res.render("servidor/residencias", {residencias: residencias})
  }).catch((err) => {
    req.flash("error_msg", "Erro ao tentar listar as residencias: " + err)
    res.redirect("/servidor")
  })
})

/* abre formulario de cadastro */
router.get("/residencias/adicionar", (req, res) => {
  res.render("servidor/addresidencia")
})

/* cadastra a residencia no banco */
router.post("/residencias/adicionar", (req, res) => {
  var erros = []

  if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
    erros.push({texto: "Nome invalido"})
  }

  if(!req.body.endereco || typeof req.body.endereco == undefined || req.body.endereco == null) {
    erros.push({texto: "Endereço invalido"})
  }

  if(erros.length > 0) {
    res.render("servidor/addresidencia", {erros: erros})
  } else {
    const novaResidencia = {
      nome: req.body.nome,
      endereco: req.body.endereco
    }

    new Residencia(novaResidencia).save().then(() => {
      req.flash("success_msg", "Residência adicionada com sucesso")
      res.redirect("/servidor/residencias")
    }).catch((err) => {
      req.flash("error_msg", "Erro ao tentar adicionar residencia: " + err)
      res.redirect("/servidor/residencias")
    })
  }
})

/* abre formulario de edicao */
router.get("/residencias/editar/:id", (req, res) => {
    Residencia.findOne({_id: req.params.id}).then((residencia) => {
    res.render("servidor/editresidencia", {residencia: residencia})
  }).catch((err) => {
    req.flash("error_msg", "Erro ao tentar encontrar residencia: " + err)
    res.redirect("/servidor/residencias")
  })
})

/* edita a residencia no banco */
router.post("/residencias/editar", (req, res) => {
  var erros = []

  if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
    erros.push({texto: "Nome invalido"})
  }

  if(!req.body.endereco || typeof req.body.endereco == undefined || req.body.endereco == null) {
    erros.push({texto: "Endereço invalido"})
  }

  if(erros.length > 0) {
    res.render("servidor/addresidencia", {erros: erros})
  } else {
    Residencia.findOne({_id: req.body.id}).then((residencia) => {
      residencia.nome = req.body.nome,
      residencia.endereco = req.body.endereco,
      residencia.atualizacao = Date.now()

      residencia.save().then(() => {
        req.flash("success_msg", "Residência editada com sucesso")
        res.redirect("/servidor/residencias")
      }).catch((err) => {
        req.flash("error_msg", "Erro ao tentar salvar a edição da residência: " + err)
        res.redirect("/servidor/residencias")
      })
    }).catch((err) => {
      req.flash("error_msg", "Erro ao tentar editar residencia: " + err)
      res.redirect("/servidor/residencias")
    })
  }
})

router.get("/residencias/deletar/:id", (req, res) => {
    Residencia.remove({_id: req.params.id}).then((residencia) => {
    req.flash("success_msg", "Residência deletada com sucesso")
    res.redirect("/servidor/residencias")
  }).catch((err) => {
    req.flash("error_msg", "Erro ao tentar encontrar residencia: " + err)
    res.redirect("/servidor/residencias")
  })
})

module.exports = router
