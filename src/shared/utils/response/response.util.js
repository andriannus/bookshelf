const responseSuccess = (h, { code, ...data }) => {
  const response = h
    .response({
      status: "success",
      ...data,
    })
    .code(code);

  return response;
};

const responseError = (h, { code, message }) => {
  const response = h
    .response({
      status: "fail",
      message,
    })
    .code(code);

  return response;
};

module.exports = {
  responseSuccess,
  responseError,
};
