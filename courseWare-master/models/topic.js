var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TopicSchema = new Schema(
  {
    name: { type: String, lowercase: true },
    notes: [{ type: String }],
    videos: [{ type: String }],
    summary: [{ type: String }]
  }
);

TopicSchema
  .virtual('url')
  .get(function () {
    return this.name.toLowerCase().split(' ').join('-');
  });

//Export model
module.exports = mongoose.model('Topic', TopicSchema);