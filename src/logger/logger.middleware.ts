import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';


@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private static removeTokenFromURL(url: string): string {
    if (url.length < 3) return ""
    url = url.replace('/?', '')
    const querystrings = url.split('&')
    let newURL = "?"
    for (let i = 0; i < querystrings.length; i++) {
      if (querystrings[i].split('=')[0] !== 'token') {
        newURL += querystrings[i] + "&"
      }
    }
    newURL = newURL.slice(0, -1)
    return newURL
  }

  private logger = new Logger(`HTTP`);

  use(req: Request, _res: Response, next: NextFunction) {
    this.logger.log(
      `${req.method}:${req.baseUrl + LoggerMiddleware.removeTokenFromURL(req.url)}`,
    );
    next();
  }
}

