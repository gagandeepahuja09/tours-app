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
*/