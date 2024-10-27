export const HandleGenericError = (error: unknown) => {
  return error instanceof Error ? error.message : `Unknown Error - ${error}`;
};
