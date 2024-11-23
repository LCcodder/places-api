import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PlacesService } from './service/places.service';
import { PlacesController } from './places.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Place, PlaceSchema } from './entities/place.entity';
import { JwtModule } from '@nestjs/jwt';
import configuration from 'src/api/shared/config/configuration';
import { GeoModule } from 'src/api/core/geo/geo.module';
import { LoggerMiddleware } from 'src/api/logger/logger.middleware';
import { PlacesResolver } from './places.resolver';

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
    GeoModule,
  ],
  controllers: [PlacesController],
  providers: [PlacesService, PlacesResolver],
})
export class PlacesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
