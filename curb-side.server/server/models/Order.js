import mongoose from 'mongoose'
const Schema = mongoose.Schema
const contentSchema = new Schema(
  {
    productId: { type: String, required: true },
    quantity: { type: String, required: true },
    metaData: { type: Object, required: true }
  }
)

const Order = new Schema(
  {
    businessId: { type: String, required: true },
    creatorId: { type: String, required: true },
    customerId: { type: String, required: true },
    status: { type: String, required: true, enum: ['pending', 'cancelledByCustomer', 'cancelledByBusiness', 'completed'], default: 'pending' },
    subTotal: { type: Number, required: true, default: 0 },
    contents: [contentSchema]
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Order.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Order
