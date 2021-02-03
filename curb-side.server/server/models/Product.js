import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Product = new Schema(
  {
    businessId: { type: String, required: true },
    creatorId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: true, default: 'https://thiscatdoesnotexist.com' },
    metaData: { type: Object }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Product.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Product
