const pool = require('../config/db');

const settle = async (req, res) => {
    try {

        // Balance logika iz kontrolera
        const result = await pool.query(
            `SELECT *
             FROM expenses
             WHERE status = $1`, ['pending']
        );

        const platio = {2: 0, 3: 0};
        const trebaoPlatiti = {2: 0, 3: 0};

        for (const trosak of result.rows) {
            platio[trosak.paid_by] += Number(trosak.amount);
            trebaoPlatiti[2] += Number(trosak.amount) / 2;
            trebaoPlatiti[3] += Number(trosak.amount) / 2;
        }

        const otacBalance = platio[2] - trebaoPlatiti[2];

        // Racunica za "ko kome duguje"
        const fromUser = otacBalance > 0 ? 3 : 2;
        const toUser = otacBalance > 0 ? 2 : 3;
        const amount = Math.abs(otacBalance);

        // Upisivanje u tabelu "settlements
        await pool.query(
            `INSERT INTO settlements (from_user, to_user, amount)
             VALUES ($1, $2, $3)`,
            [fromUser, toUser, amount]
        );

        // Updateovanje statusa u tabeli expenses iz pending u settled
        await pool.query(
            `UPDATE expenses
             SET status = 'settled'
             WHERE status = 'pending'`
        );
        res.json({message: 'Zadatak završen!', fromUser, toUser, amount});

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { settle };