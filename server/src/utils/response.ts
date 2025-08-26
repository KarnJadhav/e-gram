export const success = (data: any, meta?: any) => ({ success: true, data, meta });
export const fail = (message: string, code = 400) => ({ success: false, error: message, code });
