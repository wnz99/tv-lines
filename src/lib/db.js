const md5 = require('md5');

module.exports = {
  db: new Map(),
  add: function add(data, style, tvLine) {
    const { id } = data;
    this.db.set(md5(id), { data, style, tvLine });
    return true;
  },
  del: function del(id) {
    return this.db.delete(md5(id));
  },
  get: function get(id) {
    const order = this.db.get(md5(id));

    return order ? { ...order } : order;
  },
};
