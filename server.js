const express = require('express');
const connectDB = require('./backend/config/db.js');
const cors = require('cors');
const postsRouter = require('./backend/routes/posts.js');
const authRouter = require('./backend/routes/auth');  

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', authRouter);  
app.use('/api/posts', postsRouter); 

app.get("/", (req, res) => {
    res.send("API server is running..");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
