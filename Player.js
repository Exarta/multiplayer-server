module.exports = class Player {
    constructor(spawned, room, username, position, rotation, modeId) {
      this.spawned = spawned;
      this.room = room;
      this.username = username;
      this.id = "";
      this.position = position;
      this.rotation = rotation;
      this.modelId = modeId;
    }
  };
  