const mongoose = require("mongoose");
const { Player } = require("./models/player");
const { Message } = require("./models/message");

const handle_connection = async function (socket, io) {
  //db connection on socket initialization
  mongoose.set("strictQuery", false);
  mongoose
    .connect(
      "mongodb+srv://hunain:1234@testcluster1.v1h6c.mongodb.net/?retryWrites=true&w=majority",
      {
        dbName: "test",
      }
    )
    .then(() => {
      console.log("database connected");
    })
    .catch(() => {
      console.log("database not connected");
    });

  socket.emit("open");
  let thisPlayerID;

  //events
  socket.on("create", function () {
    thisPlayerID = socket.id;
    socket.emit("register", { id: thisPlayerID });
  });

  socket.on("spawn", async function (data) {
    const playerID = data.id;
    const player = Player({
      username: data.name,
      spawned: true,
      room: "test",
      id: playerID,
      modelId: data.modelId,
    });
    try {
      const savedPlayer = await player.save();
      socket.emit("spawn", savedPlayer._doc);
      socket.broadcast.emit("spawn", savedPlayer._doc);
    } catch (error) {
      console.log("ERROR", error);
    }
  });

  socket.on("spawnOther", async function () {
    const players = await Player.find({});
    players?.forEach((p) => {
      if (p._doc.id !== thisPlayerID) {
        socket.emit("spawn", p._doc);
      }
    });
  });

  socket.on("anim", function (data) {
    socket.broadcast.emit("anim", {
      id: data.id,
      direction: data.direction,
    });
  });

  socket.on("transform", function (data) {
    const id = data.id;
    const pos = data.pos;
    const rot = data.rot;
    socket.broadcast.emit("transform", {
      id: id,
      pos: pos,
      rot: rot,
    });
  });
  socket.on("allPlayersData", async function (data) {
    console.log(data);
  });
  socket.on("changeFloor", async function () {
    if (thisPlayerID != undefined) {
      await Player.deleteOne({ id: thisPlayerID });
      socket.broadcast.emit("disconnected", { id: thisPlayerID });
    }
  });
  socket.on("disconnect", async function () {
    if (thisPlayerID != undefined) {
      await Player.deleteOne({ id: thisPlayerID });
      socket.broadcast.emit("disconnected", { id: thisPlayerID });
    }
  });

  // MESSAGE SOCKETS
  socket.on("messageRecieved", async function (data) {
    const message = Message({
      id: data.id,
      message: data.message,
    });
    try {
      const savedMessage = await message.save();
      socket.emit("sendMessage", savedMessage._doc);
    } catch (error) {
      console.log("something went wrong", error);
    }
  });
};

module.exports = handle_connection;
