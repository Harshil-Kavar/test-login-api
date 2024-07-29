export const customResponse = (success, message, data) => {
  return { success: success, message: message, ...data };
};

export const errorResponse = (message) => {
  return { success: false, message: message };
};
