import mongoose from 'mongoose'
import ValueSchema from '../models/Value'
import AccountSchema from '../models/Account'
import BusinessSchema from '../models/Business'
import OrderSchema from '../models/Order'
import ProductSchema from '../models/Product'
import ChatSchema from '../models/Chat'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Businesses = mongoose.model('Business', BusinessSchema);
  Orders = mongoose.model('Order', OrderSchema);
  Products = mongoose.model('Product', ProductSchema);
  Chats = mongoose.model('Chat', ChatSchema);
  Account = mongoose.model('Account', AccountSchema);
}

export const dbContext = new DbContext()
