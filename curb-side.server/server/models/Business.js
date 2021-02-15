import mongoose from 'mongoose'
const Schema = mongoose.Schema
const pointSchema = new Schema({
      type: {type: String, enum: ['Point'], required: true, default: 'Point' },
      coordinates: {type: [Number], required:true, index: true}
})
const Business = new Schema(
  {
    creatorId: { type: String, required: true },
    logo: { type: String, default: 'https://thiscatdoesnotexist.com' },
    name: { type: String, required: true },
    tags: { type: Array },
    address: { type: String, required: true },
    location: {type: pointSchema}
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
Business.index({ location : "2dsphere" })

Business.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Business
