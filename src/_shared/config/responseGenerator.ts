export const responseGenerator = (data: object | object[], meta?: any) => {
  return { data, meta: meta ? meta : undefined };
};
