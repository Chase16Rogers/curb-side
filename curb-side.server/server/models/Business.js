import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Business = new Schema(
  {
    creatorId: { type: String, required: true },
    logo: { type: String },
    name: { type: String, required: true },
    tags: { type: Array },
    location: { type: String, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Business.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Business
