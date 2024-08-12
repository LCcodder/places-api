import { Logger } from '@nestjs/common';
require('dotenv').config()

export default () => {
  const logger = new Logger(`HTTP`);
  return {
    mongodbUrl: process.env.MONGODB_URL,
    masterKeys: process.env.MASTER_KEYS.split(', '),
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiration: process.env.JWT_EXPIRATION,
    port: parseInt(process.env.APP_PORT),
    log() {
      logger.log(
        `Loaded with config\nMONGO CONNECTION: ${this.mongodbUrl}\nJWT EXPIRATION: ${this.jwtExpiration}`,
      );
    },
  };
};
