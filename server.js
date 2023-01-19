// const server = require("http").createServer();
const mongoose = require("mongoose");
const { Player } = require("./models/player");

// const options = {
//   cors: true,
// };

// const io = require("socket.io")(server, options);

// io.on("connection", async function (socket) {
//   console.log('DATA');
//   //db connection on socket initialization
//   mongoose.set("strictQuery", false);
//   mongoose
//     .connect(
//       "mongodb+srv://hunain:1234@testcluster1.v1h6c.mongodb.net/?retryWrites=true&w=majority",
//       {
//         dbName: "test",
//       }
//     )
//     .then(() => {
//       console.log("database connected");
//     })
//     .catch(() => {
//       console.log("database not connected");
//     });

//   socket.emit("open");
//   let thisPlayerID;

//   //events
//   socket.on("create", function () {
//     thisPlayerID = socket.id;
//     socket.emit("register", { id: thisPlayerID });
//   });

//   socket.on("spawn", async function (data) {
//     const playerID = data.id;
//     const player = Player({
//       username: data.name,
//       spawned: true,
//       room: "test",
//       id: playerID,
//       modelId: data.modelId,
//     });
//     try {
//       const savedPlayer = await player.save();
//       console.log('DATA', savedPlayer);
//       socket.emit("spawn", savedPlayer);
//       socket.broadcast.emit("spawn", savedPlayer);
//     } catch (error) {
//       console.log("ERROR", error);
//     }
//   });

//   socket.on("spawnOther", async function () {
//     const players = await Player.find({});
//     players?.forEach((p) => {
//       if (p.id !== "testetstetd") {
//         socket.emit("spawn", p);
//       }
//     });
//   });

//   socket.on("anim", function (data) {
//     socket.broadcast.emit("anim", {
//       id: data.id,
//       direction: data.direction,
//     });
//   });
//   socket.on("transform", function (data) {
//     const id = data.id;
//     const pos = data.pos;
//     const rot = data.rot;
//     socket.broadcast.emit("transform", {
//       id: id,
//       pos: pos,
//       rot: rot,
//     });
//   });
//   socket.on("changeFloor", function () {
//     if (thisPlayerID != undefined) {
//       delete players[thisPlayerID];
//       socket.broadcast.emit("disconnected", { id: thisPlayerID });
//     }
//   });
//   // socket.on("disconnect", function () {
//   //   if (thisPlayerID != undefined) {
//   //     delete players[thisPlayerID];
//   //     socket.broadcast.emit("disconnected", { id: thisPlayerID });
//   //   }
//   // });
// });

// console.log("Server started");
// server.listen(3000);


const handle_connection = async function (socket, io) {
  console.log('DATA');
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
      console.log('DATA', savedPlayer);
      socket.emit("spawn", savedPlayer);
      socket.broadcast.emit("spawn", savedPlayer);
    } catch (error) {
      console.log("ERROR", error);
    }
  });

  socket.on("spawnOther", async function () {
    const players = await Player.find({});
    players?.forEach((p) => {
      if (p.id !== "testetstetd") {
        socket.emit("spawn", p);
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
  socket.on("changeFloor", function () {
    if (thisPlayerID != undefined) {
      delete players[thisPlayerID];
      socket.broadcast.emit("disconnected", { id: thisPlayerID });
    }
  });
  // socket.on("disconnect", function () {
  //   if (thisPlayerID != undefined) {
  //     delete players[thisPlayerID];
  //     socket.broadcast.emit("disconnected", { id: thisPlayerID });
  //   }
  // });
}

module.exports = handle_connection;