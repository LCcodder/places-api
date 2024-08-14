import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PlacesModule } from './places/places.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GeoModule } from './geo/geo.module';
import configuration from './config/configuration';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    PlacesModule,
    AuthModule,
    MongooseModule.forRoot(configuration().mongodbUrl),
    GeoModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      playground: true,
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      context: ({ req }) => ({ headers: req.headers }),
      debug: true,
      definitions: {
        path: join(process.cwd(), 'src/graphql/graphql.anotation.ts'),
        outputAs: 'class',
      },
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
