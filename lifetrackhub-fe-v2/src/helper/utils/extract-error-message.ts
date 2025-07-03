export const extractErrorMessage = (error: unknown): string | null => {
  if (
    error &&
    typeof error === 'object' &&
    'data' in error &&
    error.data &&
    typeof error.data === 'object' &&
    'message' in error.data
  ) {
    return (error as any).data.message;
  }
  return null;
};
