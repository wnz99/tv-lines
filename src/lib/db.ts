import { LineType, Line, LineStyle, TvLine } from '../types';

export type Db = typeof db;

export type DbLine = {
  data: Line['data'];
  style: LineStyle;
  tvLine: TvLine;
};

const makeId = (id: number | string, type: string) => {
  return `${String(id)}${type}`;
};

const db = {
  db: new Map<string, Line>(),

  add: function add(
    data: Line['data'],
    style: LineStyle,
    tvLine: TvLine,
    type: LineType
  ): DbLine {
    const { id } = data;

    this.db.set(makeId(id, type), { data, style, tvLine });

    return { data, style, tvLine };
  },

  del: function del(id: number | string, type: LineType) {
    return this.db.delete(makeId(id, type));
  },

  get: function get(id: number | string, type: LineType): DbLine | undefined {
    const line = this.db.get(makeId(id, type));

    return line ? { ...line } : line;
  },
};

export default db;
