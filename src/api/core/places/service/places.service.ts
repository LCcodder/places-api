import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePlaceDto } from '../dto/create-place.dto';
import { UpdatePlaceDto } from '../dto/update-place.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Place } from '../entities/place.entity';
import * as mongoose from 'mongoose';
import { GeoService } from 'src/api/core/geo/service/geo.service';
import { FindAllQuery } from '../dto/find-places.dto';
import { resolveMongoId } from 'src/api/shared/utils/mongodb/mongo-id.resolver';
import { literateMongoQuery } from 'src/api/shared/utils/mongodb/mongo-query.literator';
import { IPlacesService } from './places.service.interface';
import { removeWasteFields } from 'src/api/shared/utils/mongodb/waste-fields.remover';

type CoordsQuery = {
  latField: { $gt: number; $lt: number } | undefined;
  longField: { $gt: number; $lt: number } | undefined;
};

@Injectable()
export class PlacesService implements IPlacesService {
  private static checkRadiusValidity(query: FindAllQuery): void {
    if (!query?.radius_in_meters)
      throw new HttpException(
        'Radius must be provided',
        HttpStatus.BAD_REQUEST,
      );
  }

  private static isCoordsProvided(query: FindAllQuery): boolean {
    return Boolean(query?.long) && Boolean(query?.lat);
  }

  private static formatCreatePlaceDtoDates(createPlaceDto: CreatePlaceDto): CreatePlaceDto {
    createPlaceDto.place.construction_started_at = new Date(
      createPlaceDto.place.construction_started_at,
    );
    createPlaceDto.place.builded_at = new Date(createPlaceDto.place.builded_at);
    return createPlaceDto
  }

  constructor(
    @InjectModel(Place.name)
    private readonly placesModel: mongoose.Model<Place>,
    private readonly geoService: GeoService,
  ) {}

  public async create(createPlaceDto: CreatePlaceDto) {
    createPlaceDto = PlacesService.formatCreatePlaceDtoDates(createPlaceDto)
    
    const place = await this.placesModel.create(createPlaceDto);
    return place;
  }

  private generateMongoFindOptions(query: FindAllQuery, coords: CoordsQuery): mongoose.FilterQuery<Place> {
    let findOptions: mongoose.FilterQuery<Place> = {
      category: query.category,
      subcategories: { $all: query.subcategories },
      geo: {
        lat: coords.latField,
        long: coords.longField,
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

    findOptions = removeWasteFields(findOptions)

    return findOptions;
  }

  private getCordsDeltaQuery(query: FindAllQuery): CoordsQuery {
    if (!PlacesService.isCoordsProvided(query))
      return {
        latField: undefined,
        longField: undefined,
      };
    

    PlacesService.checkRadiusValidity(query);

    const coordsAround = this.geoService.calculateAround({
      lat: query.lat,
      long: query.long,
      radiusInMeters: query.radius_in_meters,
    });

    return {
      latField: {
        $gt: query.lat - coordsAround.latAround,
        $lt: query.lat + coordsAround.latAround,
      },
      longField: {
        $gt: query.long - coordsAround.longAround,
        $lt: query.long + coordsAround.longAround,
      },
    };
  }

  public async findAll(
    query: FindAllQuery,
    options?: { limit: number; offset: number },
  ) {
    const coords = this.getCordsDeltaQuery(query);

    const findOptions = this.generateMongoFindOptions(query, coords);

    const foundPlaces = await this.placesModel
      .find(literateMongoQuery(findOptions))
      .sort(
        query.sort_by_build_date
          ? { 'place.builded_at': query.sort_by_build_date }
          : undefined,
      )
      .limit(options?.limit)
      .skip(options?.offset);

    return foundPlaces;
  }

  public async findOne(id: string) {
    const _id = resolveMongoId(id);

    const foundPlace = await this.placesModel.findById(_id);
    if (!foundPlace) {
      throw new HttpException('Place can not be found', HttpStatus.NOT_FOUND);
    }

    return foundPlace;
  }

  public async update(id: string, updatePlaceDto: UpdatePlaceDto) {
    const _id = resolveMongoId(id);

    const state = await this.placesModel.findByIdAndUpdate(_id, updatePlaceDto);
    if (!state) {
      throw new HttpException('Place can not be found', HttpStatus.NOT_FOUND);
    }

    return { ...(state as any)._doc, ...updatePlaceDto };
  }

  public async remove(id: string) {
    const _id = resolveMongoId(id);

    const foundPlace = await this.placesModel.findById(_id);
    if (!foundPlace) {
      throw new HttpException('Place can not be found', HttpStatus.NOT_FOUND);
    }

    await this.placesModel.findByIdAndDelete(_id);

    return { success: true as true };
  }
}
