const pool = require('../config/db');

const getAll = async (req, res) => {
    try {
        const { month, year } = req.query;
        const result = await pool.query(
            'SELECT e.*, u.name as paid_by_name FROM expenses e JOIN users u ON e.paid_by = u.id WHERE e.month = $1 AND e.year = $2 ORDER BY e.created_at DESC',
            [month, year]
        );
        res.json(result.rows);
    }   catch(err) {
        res.status(500).json({ message: err.message });
    }
};

const create = async (req, res) => {
    try {
        const { amount, description, category, paid_by, type, recurring, month, year, members } = req.body;
        const result = await pool.query(
            'INSERT INTO expenses (amount, description, category, paid_by, type, recurring, month, year) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [amount, description, category, paid_by, type, recurring, month, year]
         );
        const expenses = result.rows[0];

        for (const userId of members) {
            await pool.query(
                'INSERT INTO expense_members (expense_id, user_id) VALUES ($1, $2)',
                [expenses.id, userId]
            );
        }
        res.status(201).json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const remove = async (req, res) => {
    try {
        await pool.query('DELETE FROM expenses WHERE id = $1', [req.params.id]);
        res.json({ message: 'Trošak obrisan' });
    }   catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAll, create, remove };