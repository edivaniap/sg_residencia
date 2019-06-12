const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Residente = new Schema({
  renda: {
    type: Number,
    required: true
  },
  integralizacao: {
    type: Number,
    required: true
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "usuarios",
    required: true
  }
})

mongoose.model("residentes", Residente)
