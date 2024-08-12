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
  Res,
} from '@nestjs/common';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Request, Response } from 'express';
import { RoleGuard } from 'src/auth/auth.guard';
import { json2xml } from 'xml-js';
import { formatResponseContent } from 'src/utils/formating/response.content.formatter';

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
  create(@Body() createPlaceDto: CreatePlaceDto) {
    createPlaceDto.place.construction_started_at = new Date(
      createPlaceDto.place.construction_started_at,
    );
    createPlaceDto.place.builded_at = new Date(createPlaceDto.place.builded_at);
    return this.placesService.create(createPlaceDto);
  }

  @Get()
  @UseGuards(RoleGuard('user'))
  async findAll(@Query() query, @Req() req: Request, @Res() res: Response) {
    const places = await this.placesService.findAll({
      category: query.category,
      subcategories: query.subcategories
        ? !Array.isArray(query.subcategories)
          ? query.subcategories.split('.')
          : undefined
        : undefined,
      lat: query.lat ? parseFloat(query.lat) : undefined,
      long: query.long ? parseFloat(query.long) : undefined,
      radius_in_meters: query.radius ? parseFloat(query.radius) : undefined,
      city: query.city,
      country: query.country,
      state: query.state,
      state_code: query.state_code,
      region: query.region,
      postcode: query.postcode ? parseInt(query.postcode) : undefined,
      builded_by: query.builded_by,
      open_from: query.open_from ? parseInt(query.open_from) : undefined,
      open_to: query.open_to ? parseInt(query.open_to) : undefined,
      is_always_open:
        query.is_always_open >= 0 ? Boolean(query.is_always_open) : undefined,
      age_from: query.age_from ? parseInt(query.age_from) : undefined,
      facilities: Array.isArray(query.facilities)
        ? [...query.facilities]
        : query.facilities
          ? [query.facilities]
          : undefined,
      owner: query.owner,
      license: query.license,
      corp: query.corp,
      sort_by_build_date: parseInt(query.sort) >= 1 ? 1 : -1,
    });

    return formatResponseContent(req, res, places);
  }

  @Get(':id')
  @UseGuards(RoleGuard('user'))
  async findOne(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const place = await this.placesService.findOne(id);

    return formatResponseContent(req, res, place);
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
