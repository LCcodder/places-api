import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Request } from 'express';
import { RoleGuard } from 'src/auth/auth.guard';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Post()
  @UseGuards(RoleGuard('admin'))
  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  @UsePipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
      transform: true,
    }),
  )
  create(
    @Body() createPlaceDto: Omit<CreatePlaceDto, 'author'>,
    @Req() req: Request,
  ) {
    return this.placesService.create(createPlaceDto);
  }

  @Get()
  @UseGuards(RoleGuard('user'))
  findAll(@Query() query) {
    return this.placesService.findAll({
      category: query.category,
      subcategories: query.subcategories
        ? !Array.isArray(query.subcategories)
          ? query.subcategories.split('.')
          : undefined
        : undefined,
      lat: parseFloat(query.lat),
      long: parseFloat(query.long),
      radius_in_meters: parseFloat(query.radius),
      city: query.city,
      country: query.country,
      state: query.state,
      state_code: query.state_code,
      region: query.region,
      postcode: query.postcode,
      builded_by: query.builded_by,
      open_from: query.open_from,
      open_to: query.open_to,
      is_always_open: query.is_always_open,
      age_from: query.age_from,
      facilities: Array.isArray(query.facilities)
        ? [...query.facilities]
        : query.facilities
          ? [query.facilities]
          : undefined,
      owner: query.owner,
      license: query.license,
      corp: query.corp,
    });
  }

  @Get(':id')
  @UseGuards(RoleGuard('user'))
  findOne(@Param('id') id: string) {
    return this.placesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RoleGuard('admin'))
  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  @UsePipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
      transform: true,
    }),
  )
  update(@Param('id') id: string, @Body() updatePlaceDto: UpdatePlaceDto) {
    return this.placesService.update(id, updatePlaceDto);
  }

  @Delete(':id')
  @UseGuards(RoleGuard('admin'))
  remove(@Param('id') id: string) {
    return this.placesService.remove(id);
  }
}
