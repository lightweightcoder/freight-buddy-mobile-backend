import express from 'express';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import cors from 'cors';

// Initialise Express instance
const app = express();

// Set CORS headers to allow AJAX requests from remote origins
app.use(cors({
  // credentials true allow cookies to be sent over CORS
  credentials: true,
  // reflect the requested origin name in the CORS response
  // i.e. in the Access-Control-Allow-Origin header in the response
  origin: true,
}));
app.set('trust proxy', 1);

// Bind cookie parser middleware to parse cookies in requests
app.use(cookieParser());

// Bind Express middleware to parse request bodies for POST requests
app.use(express.urlencoded({ extended: false }));

// Bind Express middleware to parse JSON request bodies
app.use(express.json());

// Bind method override middleware to parse PUT and DELETE requests sent as POST requests
app.use(methodOverride('_method'));

// Expose the files stored in the public folder
app.use(express.static('public'));

// set the port to the environment PORT variable or 3004 if the former is falsy
const PORT = process.env.PORT || 3004;

// Set Express to listen on the given port
app.listen(PORT);
