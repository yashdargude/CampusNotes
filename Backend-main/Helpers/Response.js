function responseMessage(res, status, success, message, data) {
  return res.status(status).json({ status, success, message, data })
}

module.exports = {
  responseMessage,
}