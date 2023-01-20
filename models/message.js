const mongoose = require("mongoose");

const messageschema = new mongoose.Schema({
  // ids: [
  //   {
  //     type: String,
  //     require: true,
  //   },
  // ],
  messages: [
    {
      senderID: {
        type: String,
        require: true,
      },
      // receiver: {
      //   type: String,
      //   require: true,
      // },
      message: {
        type: String,
        require: true,
      },
    },
  ],
});

messageschema.virtual("messageID").get(function () {
  return this._id.toHexString();
});

messageschema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret.id;
  },
});

exports.Message = mongoose.model("messages", messageschema);
exports.messageschema = messageschema;
