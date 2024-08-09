import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Place, PlaceSchema } from './entities/place.entity';
import { JwtModule } from '@nestjs/jwt';
import configuration from 'src/config/configuration';
import { GeoModule } from 'src/geo/geo.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Place.name,
        schema: PlaceSchema,
      },
    ]),
    JwtModule.register({
      secret: configuration().jwtSecret,
      signOptions: { expiresIn: configuration().jwtExpiration },
    }),
    GeoModule
  ],
  controllers: [PlacesController],
  providers: [PlacesService],
})
export class PlacesModule {}
