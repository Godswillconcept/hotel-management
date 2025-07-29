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

    // Save temporary registration with OTP
    static async saveTempRegistration(guestData, otp) {
        const sql = `INSERT INTO temp_registrations 
                     (full_name, password, phone_number, email, address, id_document, otp_code, expires_at) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
        await this.query(sql, [
            guestData.full_name,
            guestData.password,
            guestData.phone_number,
            guestData.email,
            guestData.address,
            guestData.id_document,
            otp,
            expiresAt
        ]);
    }

    // Find temp registration by email and OTP
    static async findTempRegistration(email, otp) {
        const sql = "SELECT * FROM temp_registrations WHERE email = ? AND otp_code = ? AND expires_at > NOW()";
        const rows = await this.query(sql, [email, otp]);
        return rows.length > 0 ? rows[0] : null;
    }

    // Delete temp registration after successful verification
    static async deleteTempRegistration(email) {
        const sql = "DELETE FROM temp_registrations WHERE email = ?";
        await this.query(sql, [email]);
    }

    // Check if email already exists in main guests table
    static async emailExists(email) {
        const sql = "SELECT id FROM guests WHERE email = ?";
        const rows = await this.query(sql, [email]);
        return rows.length > 0;
    }

    // Cleanup expired temp registrations (call this periodically)
    static async cleanupExpiredRegistrations() {
        const sql = "DELETE FROM temp_registrations WHERE expires_at < NOW()";
        await this.query(sql);
    }
}

module.exports = Guest;