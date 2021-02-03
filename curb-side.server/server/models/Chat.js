import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ContentSchema = new Schema({
  senderId: { type: String, required: true },
  message: { type: String, required: true }
})
const Chat = new Schema({
  orderId: { type: String, required: true },
  customerId: { type: String, required: true },
  businessId: { type: String, required: true },
  content: [ContentSchema]
},
{ timestamps: true }
)
export default Chat
