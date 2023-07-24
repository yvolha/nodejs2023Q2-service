export const ERR_MSGS = {
  INVALID_UUID: (userId: string) => `UserID "${userId}" is not a valid UUID.`,
  NOT_FOUND: (entity: string, id: string) =>
    `${entity} with ID "${id}" does not exist.`,
  WRONG_PASS: () => 'The provided old password is incorrect.',
};

export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  DELETED: 204,
  INVALID: 400,
  WRONG_PASS: 403,
  NOT_FOUND: 404,
  FAV_NOT_FOUND: 422,
};
