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
*/