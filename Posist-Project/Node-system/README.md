Login-Authenticate-demo

Clone this Repository

$npm install

Middleware packages will be installed :- "bcrypt": "^2.0.1", "bcryptjs": "^2.4.3", "body-parser": "^1.18.3", "connect-flash": "^0.1.1", "ejs": "^2.6.1", "express": "^4.16.3", "express-handlebars": "^3.0.0", "express-messages": "^1.0.1", "express-session": "^1.15.6", "express-validator": "^5.2.0", "mongodb": "^3.1.0", "mongoose": "^5.1.7", "passport": "^0.4.0", "passport-http": "^0.3.0", "passport-local": "^1.0.0"

$npm start

I used MongoDb database for this project

Open bin folder of the MongoDb and run $mongo and $mongod

About the code :-

=> app.js

Main file for the project

1.Firstly imported all the packages, then connection with mongoose using mongoose.connect('mongodb://localhost/posist'); var db = mongoose.connection;

2.Then, created objects for specifying routes i.e routes, users

3.Initialize app using: var app = express();

4.Joined view engine with views directory and set-up handlebar view engine with default Layout at layout.handlebars

5.Used bodyParser middleware for parsing json objects

6.Set static folder to public directory

7.Express session initialized

8.Passport middleware initialized for authentication

9.Express validator used for validating errors ike namespace by using errorFormatter

10.Flash is used formessage defaulting the type to info.

11.Global variables passed

12.Set up route endpoints and localhost at 3000