export const ERR_MSGS = {
  INVALID_UUID: (userId: string) => `UserID "${userId}" is not a valid UUID.`,
  NOT_FOUND: (entity: string, id: string) =>
    `${entity} with ID "${id}" does not exist.`,
  WRONG_PASS: () => 'The provided old password is incorrect.',
  INCORRECT_DATA: () => 'The provided data is incorrect or incomplete.',
  ALREADY_EXISTS: (entity: string) => `${entity} with this ID already exists.`,
};
