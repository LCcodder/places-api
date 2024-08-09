import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PlacesModule } from './places/places.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GeoModule } from './geo/geo.module';
import configuration from './config/configuration';

@Module({
  imports: [
    PlacesModule,
    AuthModule,
    MongooseModule.forRoot(configuration().mongodbUrl),
    GeoModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
