module.exports = {
  db: new Map(),
  add: function add(data, style, tvLine, type) {
    const { id } = data;
    this.db.set(id + type, { data, style, tvLine });
    return true;
  },
  del: function del(id, type) {
    return this.db.delete(id + type);
  },
  get: function get(id, type) {
    const order = this.db.get(id + type);

    return order ? { ...order } : order;
  },
};
