import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId
const contentSchema = new Schema(
  {
    productId: { type: ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    metaData: { type: Object }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

const Order = new Schema(
  {
    businessId: { type: String, required: true },
    creatorId: { type: String, required: true },
    customerId: { type: String, required: true },
    here: { type: Boolean, required: true, default: false },
    status: { type: String, required: true, enum: ['pending', 'cancelledByCustomer', 'cancelledByBusiness', 'completed'], default: 'pending' },
    subTotal: { type: Number, required: true, default: 0 },
    contents: [contentSchema]
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Order.virtual('creator', {
  localField: 'customerId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
contentSchema.virtual('product', {
  localField: 'productId',
  ref: 'Product',
  foreignField: '_id',
  justOne: true
})
export default Order
