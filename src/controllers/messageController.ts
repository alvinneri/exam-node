import { Request, Response, NextFunction } from "express";
import { TableValueInterface, TableValues } from "../table";

interface PayloadMessage {
  conversation_id: string;
  message: string;
}

const postMessage = async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  const { conversation_id, message }: PayloadMessage = body;

  let response: string = "";

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

  TableValues.every((value: TableValueInterface) => {
    const messageRegex = new RegExp(message.toLowerCase(), "gi");
    const result: RegExpMatchArray | null = value.message
      .toLowerCase()
      .match(messageRegex);
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

export default {
  postMessage,
};
