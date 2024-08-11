import { Logger } from '@nestjs/common';

export default () => {
  const logger = new Logger(`HTTP`);
  return {
    mongodbUrl: 'mongodb://localhost:27017/PlacesAPI',
    masterKeys: ['sGJIPOSJGkgsodkgsoPKGoPSKGodpskgoDKGopskgodskgopdsk'],
    jwtSecret: 'dsafasfadfadsfdsafdsfdsfdssdfdsfdsf',
    jwtExpiration: '24h',
    log() {
      logger.log(
        `Loaded with config\nMONGO CONNECTION: ${this.mongodbUrl}\nJWT EXPIRATION: ${this.jwtExpiration}`,
      );
    },
  };
};
