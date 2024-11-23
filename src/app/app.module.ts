import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PlacesModule } from '../api/core/places/places.module';
import { TokensModule } from '../api/core/tokens/tokens.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GeoModule } from '../api/core/geo/geo.module';
import configuration from '../api/shared/config/configuration';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    PlacesModule,
    TokensModule,
    MongooseModule.forRoot(configuration().mongodbUrl),
    GeoModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      playground: true,
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      context: ({ req }) => ({ headers: req.headers }),
      debug: true,
      definitions: {
        path: join(process.cwd(), 'src/api/graphql/graphql.anotation.ts'),
        outputAs: 'class',
      },
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
