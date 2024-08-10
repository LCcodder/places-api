const MONGO_QUERY_OPERANDS: string[] = ['$gt', '$lt', '$all'];

export const literateMongoQuery = (obj: Record<string, any>) => {
  const f = (v, p = []) =>
    typeof v === 'object' &&
    !Object.keys(v).some((r) => MONGO_QUERY_OPERANDS.includes(r))
      ? Object.entries(v).flatMap(([k, v]) => f(v, [...p, k]))
      : [[p.join('.'), v]];

  return Object.fromEntries(f(obj));
};
