/* Udemy Natours Project

V1 => Specify version so that if we make some change, code does not break for existing users.

(Req, res) => this is called a route handler

Success / Fail(Client) / Error(Server)

#52 Handling GET Requests

	JSON.parse() => String becomes JS object

	var obj = JSON.parse('{ "name":"John", "age":30, "city":"New York"}')

#53 Handling POST Requests

	Middleware => As name suggest, it stands b/w request and response => It can modify incoming request data 
	Out of the box, express does not put that data in request body => To have that We have to use middleware => app.use(express.json())
	Res.send() => We always need to send something to finish the request response cycle
	In JSON, every key should be in double quotes
	Always use async code inside callbacks(Non blocking)

	JSON.parse() => JS object to string

#54 Handling PATCH Requests

	Only send the data, which has to be updated. In PUT, we send the entire object 

#58 Middleware & The Request Response Cycle: 

	Middleware: Function that is called in between or receiving the request and sending the response.
	* We can say that in Express, everything is a middleware(Even routers)
		eg. express.json => body parser
	* The req and res objects go through each middleware, step by step.
	* We can think of it, like a pipeline.(Actually it is middleware stack)
	* The entire process of receiving an incoming request, going through all the middlewares and then sending the
	response back to the client is called, the request response cycle.

#59 Creating Our Own Middleware 
	If use app.use() => It will be tied to each and every request
	We need to call the next inside, because otherwise, the request response cycle will be stuck at that point.
	res.send() => Will end the req res cycle. Any middlewares after it, will be ignored.	

#60 Using 3rd Party Middleware
	Eg. Morgan => Logging the API

#62 Creating And Mounting Multiple Routers

#64 Param Middlewares
	* Middleware stack order depends on the order in which the code is written.
	* return statement ends the request-response cycle.
	* next() helps to move to next element in the middleware stack.
	* Use-case: When we want a combination of similar routes to go through a middleware. eg. a validator to 
	check if the given id is valid.

#65 Chaining Multiple Middlewares
	* We do this, so that the route handler can focus on its task and not on common tasks like validation & 
	authentication, etc.
#70 MongoDB Intro
	Database => Table -> Collections
				Rows  -> Documents
	Features Of Mongo:
		* It is document based => feild, value pair data structures,
			{

			}
		* Scalable: Very easy to distribute data across multiple machines as our users and amount of data grows.
		* Flexible: No document data schema, so each document can have different number and types of fields.
		* Performant: Embedded data models, sharding, indexing, flexible documents, native duplication, etc.
	
	* Document structure used: BSON(Like JSON but typed)
	* Fields are equivalent to column
	* Another advantage of Mongo DB: We can easily use array or object as our value, which is not directly 
	possible in SQL, so we need to find workarounds => generally using joins.
	* We can also use embedded documents in mongo. Example: embedding comments document in posts document.

#73 Creating A Local Database
	* use natours-test => Create a new db and move to it(Only move if already exists)
	* show collections
	* db.tours.insertOne() => Will create a tours collection if does not already exist.
	* db.tours.insertOne({ name: "The Forest Hiker", price: 297, rating: 4.7 }) => Creates a collection and 
	inserts a document.

#74 CRUD: Creating Documents
	* db.tours.insertMany([{}, {}])

#75 CRUD: Querying(Reading) Documents
	* db.tours.insertMany([{}, {}])
	* db.tours.find({ class: "below-avg" })
	* AND Condition: db.tours.find({ price: { $lte: 200 }, rating: { $gt: 4 } })		
	* OR Condition(Can be used more often): db.tours.find({ $or: [{ price: { $lte: 200 } }, { rating: { $gt: 4.5 } }] })
	* Choosing specific attributes: In the second parameter of find
			db.tours.find({ $or: [{ price: { $lte: 200 } }, { rating: { $gt: 4.5 } }] }, { name: 1, rating: 2 })
	
#76: CRUD: Updating Documents
	* db.tours.updateMany({ price: { $gt:300 }, rating: { $gte: 4.5 }  }, { $set: { premium: true } })

#77 CRUD: Deleting Documents
	* db.tours.deleteMany({ }) => condn just like find
#78 Compass GUI for Mongo
#79 Hosted DB With Atlas
#80 Connecting To Our Hosted DB
#82 Connecting Our DB With The Express App
	Cluster: An instance of a database
	* Using mongoose.connect() and specifying DB in .env file.
#83 What is Mongoose
	* Mongoose is an ODM(Object Data Modelling) library for MongoDB and Node.js.
	* It is a layer of abstraction over MongoDB, just like Express is for Node.js.
	* We can write JS code, which will then interact with the database.
	* Features:
		* Schemas to model data & relationships.
		* Easy data validation
		* Simple Query API
		* Middlewares
	* Mongoose Schema: Where we model our data: by providing structure of data, default values and validation.
	* Mongoose Model: A wrapper for the schema, providing an interface to the database for CRUD operations.
	* Schema is like a structure, and model like a class. 

#84 Creating a Simple Tour Model	
#86 MVC Architecture
	Model --> Business Logic
		* Concerned about the business problem, we are actually trying to solve.
		* Directly related to business rules, how the business works.
		eg: * Creating new tours in DB
			* Checking user pwd.
			* Validating user input.
			* Ensuring only users who bought the tour can review it.
	Controller  --> Application Logic
		* Concerned about request and response
#88 Creating Documents
	const newTour = await Tour.create(req.body)
	async-await: Should definitely use try-catch
#94 Making The API Better: Filtering
	const queryObj = req.query
	* We cannot directly use queryObj like this because it will be a hard copy.
	* Shallow copy => const queryObj = { ...req.query }
*/