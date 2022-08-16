const { TableValues } = require("../table");

exports.postMessage = async (req, res, next) => {
  const { body } = req;
  const { conversation_id, message } = body;

  let response = "";

  if (typeof conversation_id === "undefined") {
    return res.status(400).json({
      error: `Invalid request data. conversation_id is ${typeof conversation_id} `,
    });
  }

  if (typeof message === "undefined") {
    return res.status(400).json({
      error: `Invalid request data.  message is ${typeof message}`,
    });
  }

  if (!message) {
    return res.status(201).json({
      response_id: conversation_id,
      response: "Sorry, I don’t understand.",
    });
  }

  TableValues.every((value) => {
    const messageRegex = new RegExp(message, "gi");
    const result = value.message.match(messageRegex);
    if (result && result.length) {
      response = value.response;
      return false;
    }
    return true;
  });

  if (!response) {
    return res.status(201).json({
      response_id: conversation_id,
      response: "Sorry, I don’t understand.",
    });
  }

  return res.status(201).json({
    response_id: conversation_id,
    response: response,
  });
};
