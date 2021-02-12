import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Business = new Schema(
  {
    creatorId: { type: String, required: true },
    logo: { type: String, default: 'https://thiscatdoesnotexist.com' },
    name: { type: String, required: true },
    tags: { type: Array },
    address: { type: String, required: true },
    location: { 
      type: 'Point',
      coordinates: {type: Array, default: [0, 0]}
    }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Business.index({ location: '2dsphere' })

Business.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Business
