export const badRequest = (entity: string) => {
  const badRequestError = new Error(`${entity} already registered`);
  badRequestError.name = "BadRequestError";
  throw badRequestError;
};
export const unauthorized = () => {
  const unauthorizedError = new Error("incorrect email or password");
  unauthorizedError.name = "UnauthorizedError";
  throw unauthorizedError;
};
