import { Request, Response } from "express";
import { json2xml } from "xml-js";

export const formatResponseContent = <T>(req: Request, res: Response, content: T): Response => {
    const contentType = req.headers['content-type']

    if (contentType === 'application/xml') {
      const resultJSON = JSON.stringify(content)
      const resultXML = json2xml(resultJSON, { compact: true, spaces: 4 })

      return res.set('Content-Type', 'application/xml').send(resultXML)
    }

    return res.json(content)
}