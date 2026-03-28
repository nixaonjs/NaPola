const pool = require('../config/db');

const getBalance = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT * FROM expenses WHERE status = $1` ,
            ['pending']
        );
        const platio = {2: 0, 3: 0};
        const trebaoPlatiti = {2: 0, 3: 0};

        for (const trosak of result.rows) {
           platio[trosak.paid_by] += Number(trosak.amount);

           trebaoPlatiti[2] += Number(trosak.amount) / 2;
           trebaoPlatiti[3] += Number(trosak.amount) / 2;
        }

        const balance = {
            otac: platio[2] - trebaoPlatiti[2],
            majka: platio[3] - trebaoPlatiti[3],
        };

        res.json(balance);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getBalance };
