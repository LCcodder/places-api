import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Place } from './entities/place.entity';
import * as mongoose from 'mongoose';
import { GeoService } from 'src/geo/geo.service';
import { FindAllQuery } from './types/types';
import { isFQDN } from 'class-validator';

@Injectable()
export class PlacesService {
  private static resolveMongoId(id: string): mongoose.Types.ObjectId {
    try {
      return new mongoose.Types.ObjectId(id);
    } catch (error) {
      throw new HttpException('Place can not be found', HttpStatus.NOT_FOUND);
    }
  }

  private static removeUndefined(source: Record<string, any>) {
    for (const key in source) {
      if (
        typeof source[key] === 'object' &&
        source[key] !== null &&
        !Array.isArray(source[key])
      ) {
        if (!Object.keys(source[key]).length) {
          delete source[key];
          continue;
        } else {
          PlacesService.removeUndefined(source[key]);
        }
      }
      if (source[key] === undefined) delete source[key];
    }
    return source;
  }

  private static readonly MONGO_QUERY_OPERANDS: string[] = [
    '$gt',
    '$lt',
    '$all',
  ];

  private static parseToMongoQuery(obj: Record<string, any>) {
    const f = (v, p = []) =>
      typeof v === 'object' &&
      !Object.keys(v).some((r) =>
        PlacesService.MONGO_QUERY_OPERANDS.includes(r),
      )
        ? Object.entries(v).flatMap(([k, v]) => f(v, [...p, k]))
        : [[p.join('.'), v]];
        
    return Object.fromEntries(f(obj));
  }

  constructor(
    @InjectModel(Place.name)
    private readonly placesModel: mongoose.Model<Place>,
    private readonly geoService: GeoService,
  ) {}

  async create(createPlaceDto: CreatePlaceDto) {
    const place = await this.placesModel.create(createPlaceDto);
    return place;
  }

  async findAll(query: FindAllQuery) {
    let latField = undefined;
    let longField = undefined;

    if (query?.long && query?.lat) {
      if (!query.radius_in_meters)
        throw new HttpException(
          'Radius must be provided',
          HttpStatus.BAD_REQUEST,
        );

      const coordsAround = this.geoService.calculateAround({
        lat: query.lat,
        long: query.long,
        radiusInMeters: query.radius_in_meters,
      });

      latField = {
        $gt: query.lat - coordsAround.latAround,
        $lt: query.lat + coordsAround.latAround,
      };
      longField = {
        $gt: query.long - coordsAround.longAround,
        $lt: query.long + coordsAround.longAround,
      };
    }

    let findOptions: Parameters<typeof this.placesModel.findOne>[0] = {
      category: query.category,
      subcategories: { $all: query.subcategories },
      geo: {
        lat: latField,
        long: longField,
        city: query.city,
        country: query.country,
        state: query.state,
        state_code: query.state_code,
        region: query.region,
        postcode: query.postcode,
        builded_by: query.builded_by,
      },
      place: {
        open_hours: {
          from: query.open_from,
          to: query.open_to,
        },
        is_always_open: query.is_always_open,
        age_from: query.age_from,
        facilities: { $all: query.facilities },
      },
      law: {
        owner: query.owner,
        license: query.license,
        corp: query.corp,
      },
    };
    findOptions = PlacesService.removeUndefined(findOptions);
    findOptions = PlacesService.removeUndefined(findOptions);
    findOptions = PlacesService.removeUndefined(findOptions);
    console.log(PlacesService.parseToMongoQuery(findOptions));
    const foundPlaces = await this.placesModel.find(
      PlacesService.parseToMongoQuery(findOptions),
    );

    return foundPlaces;
  }

  async findOne(id: string) {
    const _id = PlacesService.resolveMongoId(id);

    const foundPlace = await this.placesModel.findById(_id);
    if (!foundPlace) {
      throw new HttpException('Place can not be found', HttpStatus.NOT_FOUND);
    }

    return foundPlace;
  }

  async update(id: string, updatePlaceDto: UpdatePlaceDto) {
    const _id = PlacesService.resolveMongoId(id);

    const state = await this.placesModel.findByIdAndUpdate(_id, updatePlaceDto);
    if (!state) {
      throw new HttpException('Place can not be found', HttpStatus.NOT_FOUND);
    }

    return { ...(state as any)._doc, ...updatePlaceDto };
  }

  async remove(id: string) {
    const _id = PlacesService.resolveMongoId(id);

    const foundPlace = await this.placesModel.findById(_id);
    if (!foundPlace) {
      throw new HttpException('Place can not be found', HttpStatus.NOT_FOUND);
    }

    await this.placesModel.findByIdAndDelete(_id);

    return { success: true };
  }
}
