var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ChapterSchema = new Schema(
  {
      name: {type: String, lowercase: true},
      topics: [{type: Schema.Types.ObjectId}]
  }
);

ChapterSchema
.virtual('url')
.get(function () {
  return this.name.toLowerCase().split(' ').join('-');
});

//Export model
module.exports = mongoose.model('Chapter', ChapterSchema);