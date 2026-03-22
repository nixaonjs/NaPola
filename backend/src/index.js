require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});
pool.connect()
    .then(() => console.log("✅ Konekcija sa bazom je uspješna!"))
    .catch((err) => console.error("❌ Greška pri konekciji sa bazom:", err.message));

app.locals.db = pool;

app.get('/', (req, res) => {
    res.json({ message: 'Server radi!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server radi na http://localhost:${PORT}`);
});