require('dotenv').config(); // Load environment variables
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const connectDB = require('./config/db'); // Import connectDB function
const ejsLayouts = require('express-ejs-layouts');
const app = express();

// Connect to the database
connectDB();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

app.use('/uploads', express.static('uploads'));
app.use(ejsLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET, // Ensure this variable is defined
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI, // Check this is correct
        collectionName: 'sessions',
    }),
}));

app.use('/', require('./routes/authRoutes'));

const port = process.env.PORT || 3000; // Ensure to set the port
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
