const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const router = express.Router();

// Database connection
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'VIVEKpawar1411',
    database: 'nrt',
});

// Middleware
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));
app.use(bodyParser.json());

// Route handlers
const register = (req, res) => {
    const { name, password, gender, subjects, city } = req.body;
    
    if (!name || !password || !gender || !subjects || !city) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const query = "INSERT INTO login (name, password, gender, subjects, city) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [name, password, gender, subjects, city], (err, result) => {
        if (err) {
            console.error('Error registering user:', err);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "User registered successfully" });
    });
};

const getAllUsers = (req, res) => {
    const query = "SELECT * FROM login";  
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ users: results });
    });
};

// Routes
app.use('/', router);
router.post('/register', register);
router.get('/getall', getAllUsers);


// Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
