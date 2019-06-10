const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Residencia = new Schema({
  nome: {
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

mongoose.model("residencias", Residencia)
