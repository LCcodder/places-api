import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Place } from './entities/place.entity';
import * as mongoose from 'mongoose';
import { GeoService } from 'src/geo/geo.service';

@Injectable()
export class PlacesService {
  private static resolveMongoId(id: string): mongoose.Types.ObjectId {
    try {
      return new mongoose.Types.ObjectId(id)
    } catch (error) {
      throw new HttpException('Place can not be found', HttpStatus.NOT_FOUND);
    }
  }

  constructor(
    @InjectModel(Place.name)
    private readonly placesModel: mongoose.Model<Place>,
    private readonly geoService: GeoService
  ) {}

  async create(createPlaceDto: CreatePlaceDto) {
    const place = await this.placesModel.create(createPlaceDto);
    return place;
  }

  async findAll() {
    return `This action returns all places`;
  }

  async findOne(id: string) {
    const _id = PlacesService.resolveMongoId(id)
    
    const foundPlace = await this.placesModel.findById(_id);
    if (!foundPlace) {
      throw new HttpException('Place can not be found', HttpStatus.NOT_FOUND);
    }

    return foundPlace;
  }

  async update(id: string, updatePlaceDto: UpdatePlaceDto) {
    const _id = PlacesService.resolveMongoId(id)

    const state = await this.placesModel.findByIdAndUpdate(_id, updatePlaceDto)
    if (!state) {
      throw new HttpException('Place can not be found', HttpStatus.NOT_FOUND);
    }

    return {...(state as any)._doc, ...updatePlaceDto}

  }

  async remove(id: string) {
    const _id = PlacesService.resolveMongoId(id)

    const foundPlace = await this.placesModel.findById(_id)
    if (!foundPlace) {
      throw new HttpException('Place can not be found', HttpStatus.NOT_FOUND);
    }

    await this.placesModel.findByIdAndDelete(_id)

    return { success: true }
  }
}
