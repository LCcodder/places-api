import { Place } from '../entities/place.entity';
import { CreatePlaceDto } from '../dto/create-place.dto';
import { FindAllQuery } from '../dto/find-places.dto';
import { UpdatePlaceDto } from '../dto/update-place.dto';

export interface IPlacesService {
  create(createPlaceDto: CreatePlaceDto): Promise<Place>

  findAll(
    query: FindAllQuery,
    options?: { limit: number; offset: number },
  ): Promise<Place[]>

  findOne(id: string): Promise<Place>

  update(id: string, updatePlaceDto: UpdatePlaceDto): Promise<Place>

  remove(id: string): Promise<{ success: true }>
}
