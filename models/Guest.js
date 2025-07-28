const Model = require('./Model');

class Guest extends Model {


    static async findByEmail(email) {
        const sql = "SELECT * FROM guests WHERE email = ?";
        const rows = await this.query(sql, [email]);
        if (rows.length === 0) {
            return null;
        }
        return this.fill(rows[0]);
    }
}

module.exports = Guest;