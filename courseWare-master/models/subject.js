var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SubjectSchema = new Schema(
  {
    name: { type: String, lowercase: true },
    category: { type: String, enum: ['programming-language', 'web-development'] },
    sub_category: { type: String, enum: ['c', 'c++'] },    
    chapters: [{ type: Schema.Types.ObjectId, ref: 'Chapter' }],
    references: [{
      name: { type: String, required: true },
      url: { type: String, required: true }
    }],
  }
);

SubjectSchema
.virtual('url')
.get(function () {
  return this.name.toLowerCase().split(' ').join('-');
});

//Export model
module.exports = mongoose.model('Subject', SubjectSchema);