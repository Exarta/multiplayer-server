const mongoose = require("mongoose");

const playerschema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  spawned: {
    type: Boolean,
    require: false,
    default: false,
  },
  room: {
    type: String,
    require: false,
    default: "",
  },
  id: {
    type: String,
    require: false,
    default: 0,
  },
  // position: {
  //   type: { x: Number, y: Number, z: Number },
  //   require: false,
  //   default: 0,
  // },
  // rotation: {
  //   type: { x: Number, y: Number, z: Number },
  //   require: false,
  //   default: 0,
  // },
  modelId: {
    type: Number,
    require: false,
  },
});

playerschema.virtual("playerID").get(function () {
  return this._id.toHexString();
});

playerschema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret.id;
  },
});

exports.Player = mongoose.model("players", playerschema);
exports.playerschema = playerschema;
