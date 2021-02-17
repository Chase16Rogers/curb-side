# Welcome to Curb-Side

## In a world gripped by the "worst" pandemic any one alive has seen, many countries found it necessary to enforce strict quarantine policies. These policies not only made small businesses struggle to stay afloat, thousands found themselves no longer able to break even and were forced to close. If only there was an application that could "host" these businesses allowing them to make sales to customers over the internet, then finish the transaction at their curb.

## That's exactly what we set out to achieve. Over a little less than two weeks, a group of four students from Boise CodeWorks (Shiwani Rana, Parker Burkett, Ryan Davis, and Chase Rogers) were forced to challenge and expand our understanding of programming while constantly pair programming, working in an Agile environment based around SCRUM principles.

## We created our front-end using Vue, our back-end was developed using Node.js, Express, MongoDb, and Restful convention. We were able to incorporate, at least in a small way, the Google Maps Api, Mongoose geolocation, and even used local storage to increase the persistance of our shopping cart.

## We used the figma platform to design our UI, lucidchart to plan out our data relationships, and Google Docs to keep track of our routes.

## Api Routes
## Api Navigation
## Businesses
### Get
#### /api/businesses
#### Gets all businesses
#### No auth
#### /api/businesses/:id
#### Gets one business that has id from params
#### No auth
### Post
#### /api/businesses
#### Required
#### Name
#### Location
#### Optional
#### Tags [“ ”, “ ”]
#### Logo “String” defaults to cat does not exist
#### auth
### Put
#### /api/businesses/:id
#### Edits business that has id from params
#### Auth
#### Delete
#### api/businesses/:id
#### Deletes business that has id from params
#### Auth
#### Product
#### Get
#### /api/businesses/:id/products
#### No auth
#### Gets all products that belong to a business
#### /api/products/:id
#### No auth
#### Gets product that has Id from params
#### Post
#### /api/products
#### Auth
#### Required
#### Name
#### Description
#### Price
#### businessId
#### Optional
#### Img: “string” - defaults cat does not exist
#### Put
#### /api/products/:id
#### Auth
#### Edits product by param id
#### Delete
#### /api/products/:id
#### auth

Orders
Get
/api/businesses/:id/orders
Auth
Gets all orders that belong to the business with params id
/account/:id/orders
Auth
Gets all orders that belong to the user with the params id
Post
/api/orders
Auth
Required
Business Id
Optional (but recommended)
contents: [ { productId: “” , quantity: Number, metaData: Object}]
Status: enum [pending, cancelledByCustomer, cancelledByBusiness, completed]
subTotal - defaults 0
Put
/api/orders/:id
Auth
Edits order with id from params
Delete
/api/orders/:id
Auth
Deletes order with id from params
Chat
Get
/api/orders/:id/chats
Auth
Gets all chats that have the order id from params
/api/chats/:id
Auth
Gets chat that has Id from params
Post
Chat is created when the order is created. We don’t make.

Put - NEEDED TO SEND MESSAGES
api/chats/:id
Auth
Needed - Pass the entire array when putting a new message, just sending a new message will wipe away everything but the new one because subdocuments.
Contents: [{senderId: “string”, message: “string”}]
Delete
api/chats/:id
Auth
Deletes chat with id from params
