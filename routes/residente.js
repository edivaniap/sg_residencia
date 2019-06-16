const express = require("express")
const mongoose = require("mongoose")
const bcryptjs = require('bcryptjs')
const router = express.Router()

/* CARREGANDO MODELS */
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")

/* ROTAS */

/* Home */
router.get("/", (req, res) => {
  res.render("residente/home")
})

router.get("/definir_senha/:id", (req, res) => {
  Usuario.findOne({_id: req.params.id}).then((usuario) => {
    res.render("residente/definirsenha", {usuario: usuario})
  }).catch((err) => {
    req.flash("error_msg", "Erro ao tentar encontrar usuário: " + err)
    res.redirect("/")
  })
})

router.post("/definir_senha", (req, res) => {
  var erros = []

  if(req.body.senha != req.body.confirmacao) {
    erros.push({texto: "As senhas estão diferentes"})
  }

  if(erros.length > 0) {
    Usuario.findOne({_id: req.body.id}).then((usuario) => {
      res.render("residente/definirsenha", {usuario: usuario, erros: erros})
    }).catch((err) => {
      req.flash("error_msg", "Erro ao tentar encontrar usuário: " + err)
      res.redirect("/")
    })
  } else {
    Usuario.findOne({_id: req.body.id}).then((usuario) => {
      usuario.senha = req.body.senha

      bcryptjs.genSalt(10, (erro, salt) => {
         bcryptjs.hash(usuario.senha, salt, (erro, hash) => {
           if(erro){
             req.flash("error_msg", "Houve um erro ao tentar adicionar hash na senha: " + err)
             res.redirect("/")
           }
           
           //se nao houver erro, salva a senha
           usuario.senha = hash

           usuario.save().then(() => {
             req.flash("success_msg", "Senha definida com sucesso. Agora você pode logar-se")
             res.redirect("/")
           }).catch((err) => {
             req.flash("error_msg", "Erro ao tentar salvar a senha: " + err)
             res.redirect("/")
           })
         })
      })

    }).catch((err) => {
      req.flash("error_msg", "Erro ao tentar buscar usuario para adicionar senha: " + err)
      res.redirect("/")
    })
  }
})


module.exports = router
