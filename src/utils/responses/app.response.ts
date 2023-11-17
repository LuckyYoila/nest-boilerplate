export const successResponse = (message: string, results: any) => {
  const { data, ...metadata } = results;

  if (results?.metadata)
    return {
      status: true,
      message,
      ...metadata,
      data: data,
    };

  return {
    status: true,
    message,
    data: results,
  };
};

export const errorResponse = (message: string) => {
  return {
    status: false,
    message,
    data: null,
  };
};
