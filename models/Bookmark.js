const Model = require('./Model');

class Bookmark extends Model {
  static get table() {
    return 'bookmarks';
  }

  static get fillable() {
    return ['hotel_id', 'guest_id'];
  }

  // Add delete method if not inherited from Model
  static async delete(id) {
    try {
      const query = `DELETE FROM ${this.table} WHERE id = ?`;
      const result = await this.query(query, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error deleting bookmark:', error);
      return false;
    }
  }
}

module.exports = Bookmark;