const md5 = require('md5');

module.exports = {
  db: new Map(),
  add: function add(data, style, tvLine, type) {
    const { id } = data;
    this.db.set(md5(id + type), { data, style, tvLine });
    return true;
  },
  del: function del(id, type) {
    return this.db.delete(md5(id + type));
  },
  get: function get(id, type) {
    const order = this.db.get(md5(id + type));

    return order ? { ...order } : order;
  },
};
