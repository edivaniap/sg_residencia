const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Usuario = new Schema({
  nome: {
    type: String,
    required: true
  },
  cpf: {
    type: String,
    required: true
  },
  matricula: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true
  },
  endereco: {
    type: String,
    required: true
  },
  criacao: {
    type: Date,
    default: Date.now()
  },
  atualizacao: {
    type: Date,
    default: Date.now()
  }
})

mongoose.model("usuarios", Usuario)
