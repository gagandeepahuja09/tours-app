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

#96 Making The API Better: Sorting
	let query = tour.find(queryObj)
	* We keep this in a variable, so that we can chain it later.
	* query = query.sort(req.query.sort)
	* Sorting in Descending Order --> ?sort=-price --> Mongo will sort this in descending order.
	* http://localhost:4199/api/V1/tours?sort=price,-ratingsAverage, -ratingsQuantity
	* query.sort(price ratingsAverage ratingsQuantity)

#97 Making The API Better: Limiting Fields	
	* Hiding properties in schema => set select as false in properties.
	* Selecing(Projection): query.select('name') 
	* Excluding properties: query.select('-age')

#98 Making The API Better: Pagination
	* We can use skip and limit in MongoDB to implement pagination.
	* If skip size > number of documents: throw an error => it will go to catch block.

#99 Making The API Better: Aliasing
	* Chaining a middleware by specifying the request query 

# 100 Refactoring API Features By Creating A Class
	* Adding a class in utils folder with all these features

#101 Aggregation Pipeline

#104 Virtual Properties: Used mostly with conversions possible from one form to another(one property can be calculated 
	from a given property).


#105 Document Middleware: Mongoose Middleware: Pre or post hooks: Allow an event to occur, before or after a 
	certain event like saving a document to the database.
	4 Types Of Middlewares:
		1) Document	2) Query 3) Aggregate 4) Model middleware

#111 Handling Unhandled Routes: If we place it at the end of all routes, then none of the handled routes, 
	will reach here beacause it will be already handled by the existing routes.

#112 Error Handling In Express: Overview
	Two Types Of Errors:
	1) Operational Errors(Inevitable)
		* Problems that we can predict will happen at some point in time, so we just need to handle them in advance.
		* Eg: i) Invalid Path Accessed	
			  ii) Invalid User Input
			  iii) Failed to connect to server/db or Request timeout, etc
	2) Programming Errors(Bugs)
		* Reading properties on undefined.
		* Passing a number where an obj is expected
		* Using await w/o async, using req.query instead or req.body, etc

	* We can throw all the possible operational errors in a global error handling middleware.
	* This will allow a nice separation of error handling and business logic.

#113 Implementing A Global Error Handling Middleware: 
	If we use 4 parameters --> (err, req, res, next) then express automatically knows that it is an error
	handling middleware

	* next(err) --> Express assumes that whenever we pass something into the next function, then it is an error.
	* it will skip all the middlewares and directly go to the error catching middleware

#114 Error Stack Strace: err.stack => it will return a stack of from where the error originated to where it 
	went. We also want to make sure that this class is not added to the stack trace(AppError class). That is
	done by Error.captureStackTrace(this, this.constructor)
	We don't need to do this.message = message. Because that will already be done by its parent, Error class.

#115 Catching Errors In Async Functions 
	* routes, expect a function, so catchAsync should return a function
	* We are using try catch in every controller -> this is not very focused and clean
	* So, we will create a function which will handle all of that, and wrap it into that function.
	* The parameter for catchAsync will also be a function.
	* Now, we will need next for all these functions, so that we can pass it to the global error handler 
		middleware
	* Example: createTour should be a function and not the result of calling a function.
	* Therefore, catchAsync should be a function, which is then assigned to createTour
	* ES6, catch(err => next(err)) -> We only need to specify the function name and it will automatically
	* call it with the parameters that it receives. So, we can change catch(err => next(err)) to catch(next)
	* .catch(next) ==> the catch method is available on all promises
	* Flow => catchAsync => Next => Global Error Handler Middleware

#126 Managing Passwords
	* Never ever store, plain passwords in the database
	* Managing Passwords is a perfect example of using Mongoose Middleware, specifically the pre-save middleware
	* We want the password to be encrypted between the time we receive the data and the time it is persisted 
	* in the database.
	* Salt ==> Adding an additional string before encrypting
	* Two options in bcrypt, 1) Add a salt string 
							 2) Add a cost parameter, denoting how CPU intensive, the encryption will be
	* There is sync version also available of hash, but that will block the event loop and prevent the users
	* from using the application
	* Power of salting the password before hashing it --> if two users have same password, then also their
	their hashed pwd will be different
	
#127 How Authentication With JWT Works	
	* JWT --> They are a stateless solution to authentication
	* There is no need to store any session state on the server --> Perfect for RESTful APIs
	* Because RESTful APIs should always be stateless.
	* Alternative is Session, storing user's login state --> Doesn't follow principle that RESTful APIs 
		* should be stateless
	* Statelesness ==> Server never relies on information from previous requests. If some info out of it was 
	* important, the client would have sent it again in the request.
	* All the authentication must happen over https

	* Login STEPS
		1) POST /login { email, password } (Client to Server)
		2) If user and password, create unique JWT (On Server)
		3) Send JWT to client (Server to Client)
		4) Store the JWT on client in cookie or local storage (Client)

	* Checking For Access STEPS
		1) GET /someProtectedRouted (Client to Server)
		2) Server checks if JWT provided by client is valid (Server)
		3) Provides access depending on whether valid -> Sends protected data if valid (Server to Client)
		
	* Internal Working Of JWT --> Signing Algorithm
		Header --> Metadata like algo and type
		Payload --> Any info need like id, email, mobile, etc

		1) Header + Payload + Secret = Signature
		2) Header + Payload + Signature = JWT

	* Verification
		* Test Signature is created from Header + Payload + Secret and it is compared with the original signature
		* Equal ==> Data has not been modified --> Authenticated
		* Else ==> Not Authenticated

#128 Signing Up Users
	* We can't directly do User.create(req.body) ==> Because the user can change the req body and make himself
	* as ADMIN
	* Hence, we should pass all the required properties needed in User object
	
	* When the user signs up, then he is automatically logged in, so we need to implement that.
	* jwt.sign(payload, secretKey, [options, callback]) --> This creates a new JW
	* jwt.verify(token, secretKey, [options, callback])

	* While signing up user, we now need to create a new JWT --> jwt.sign
		* We also need to pass this in token in response
	// 404 --> Not Found
	// 400 --> Bad Request
	// 401 --> Unauthorized
	// 403 --> Forbidden

#129 Logging In Users
	* Only issue the token when it matches the email and password 
	* .methods in mongoose ==> available to all documents
	* Eg user.correctPassword
	* If the credentials match, then we send the token back to the user, in the response

#130 Protecting Tour Routes
	// 1. Getting token and checking if it's there
    // 2. Token Verification
    // 3. Check if user still exists
    // 4. Check if user changed password after the token was issued
	* Step 1: We check if token is sent or not in req.headers
		* Standard: We should always use a header with name of Authorization
		* Key: Authorization
		* Value: `Bearer {token}`
	

#131 Protecting Tour Routes 2
	* Step 2: Token Verification
		* We will verify using jwt.verify(token, secretKey, callback)
		* We can promisify it by using util library which is built-in in Node
	* Step 3: Check If User Still Exists. What if the user is deleted after this process? Then, we shouldn't 
		allow login
	* Step 4: If user changed his password after login, then it should not be allowed to signin
		* We can save the time at which password was changed, in the DB.
		* The promise of jwt.verify, returns iat, which is issued at timestamp
		* We can compare both and then decide if password was changed after issuing the token.

#132 Advanced Postman Setup
	* This will helps us in setting and using variables
	* 1. When we login or signup, we want to set the Authorization header in all of our protected routes
		* pm.environment.set("jwt", pm.response.json().token); ==> Setting token in test section of Postman
		* Now in Authorization section of protected routes, we can use this as {{ jwt }}.

#133 Authorization: User Roles And Permissions
	* Some actions can only be performed by certain users, even if they are logged in.
	* Eg. Only admins can delete a tour
	* So, for delete tour, it will first pass through the protect middleware
	* Then we will create a new middleware and specify, which all users can use this
	* authController.restrictTo('admin')
	* restrictTo can have variable number of parameters
	* A middleware cannot have any parameters, so we will create a function, that will return a middleware
	* In the protect middleware, we store information about the current user in req.user
	* So, we can check if req.user.role has any element from the roles 
		array(which are the params of restrictTo function)

#134 Password Reset Functionality: Reset Token
	* User has option of resetting password, if he has forgotten the password
	* He will receive an email where he can reset the password
	* 2 APIs --> /forgotPassword req body => email
			 --> /resetPassword req body => new password, new token
	* We will create 2 
	* Forgot Password Steps:
		1) Get user based on email
		2) Generate random reset token
		3) Send it to user on the email provided
	* We will save password reset token in db in encrypted form and send the unecrypted one on email
	* We won't use bcrypt here. We will use crypto library random bytes here 
	* This will have very less expiry time ~ 10 mins. We will store this time also in the db

#135 Sending mails with Nodemailer
	* We will use a dev service that fakes to send emails, but in reality traps them in a dev inbox --> mailtrap.io
	* We will set the reset URL, which is /reset-password/:token on email

#136 Password Reset Functionality
	// 1. Get user based on token
    // 2. If user exists and the token has not expired, then reset password
    // 3. Update the changedPasswordAfter property
	// 4. Log the user in, send JWT
	* Rather than using update, we are using .save() ==> Because
		1) We will be needing pre save hooks for password encryption
		2) update does not take care of schema validations but save does 

#140 Security Best Practices
	Compromised Databases
		* Strongly encrypted passwords with salt and hash(bcrypt)
		* Strongly encrypted password reset tokens(SHA 256)
	
	Brute Force Attacks
		* Use bcrypt(to make login requests slow)
		* Implement rate limiting(express-rate-limit)
		* Implement maximum login limits
	
	Cross-Site Scripting(XSS) Attacks
		* Hacker tries to inject script and run our code. So, he can also try to get the Jwt secret key
		* Solution: We can store JWT in HTTP only cookies
		* Sanitize user input
		* Set special HTTP headers(helmet package)

	Denial Of Service(DOS) Attacks
		* Implement rate limiting(express-rate-limit)
		* Limit body payload(in body-parser)
		* Avoid evil regular expression --> Those which are very slow for invalid inputs

	NoSQL Query Injection
		* Use Mongoose for MongoDB(because of Schema Types)
		* Sanitize User Input Data

	Other Best Practices
		* Always use HTTPS
		* Create random password reset tokens with expiry dates
		* Deny access to JWT after password change
		* Don't commit sensitive config data to Git
		* Don't send error details to clients
		* Prevent parameter pollution causing Uncaught Exceptions
		* Implement two factor authentication(OTP)
		* Keep user logged in with refresh tokens
		* Confirm email address after first creating account
		* Implement a blacklist of untrusted JWT
		* Require re-authentication before a high-value action
		* Prevent cross-site request forgery(csurf package) 

#140 Sending JWT Via Cookie
	* Currently we are sending JWT only as a response.
	* This will allow the browser to save it in a more secure way.
	* Cookie: Small piece of text that the server sends to the client.
	* We will set secure to true. This will allow the cookie to be sent only from HTTPS encrypted connection.
	* httpOnly will be true. So that JWT cookie cannot be modified in any way by the browser.
	
#144 Data Sanitization
	* NoSQL query injection: We can specify queries in JSON like 
	{
		"email": { "$gt": "" }, 
		"password": "password"
	}
	This will allow anyone to easily login
	* If he just keeps on putting passwords -> Package with middleware => express-mongo-sanitize
	* For preventing malicious HTML code from being injected, we can use xss-clean
	* validator package also has many functions for proctecting against xss
*/