const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let modelSchema = new Schema({
  name: String,
  collectionName: String,
  date: {
    type: Date,
    transform: v => (v) ? v.toISOString().split('T')[0] : v
  },
  model_schema: Schema.Types.Mixed
}, {
  collection: 'models'
})


module.exports = {
  model: mongoose.model('Model', modelSchema),
  createModel: function(model_json) {
    let newSchema = new Schema(model_json.schema, {collection: model_json.collectionName})
    return mongoose.model(model_json.name, newSchema)
  }
}