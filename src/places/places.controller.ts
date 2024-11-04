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
import { RoleGuard } from 'src/shared/guards/auth.guard';
import { formatResponseContent } from 'src/shared/utils/formating/response-content.formatter';
import { formatPlacesQueryToDto } from 'src/shared/utils/formating/places-query.formatter';

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
    
    return this.placesService.create(createPlaceDto);
  }

  @Get()
  @UseGuards(RoleGuard('user'))
  async findAll(@Query() query, @Req() req: Request, @Res() res: Response) {
    const places = await this.placesService.findAll(formatPlacesQueryToDto(query), {
      limit: query.limit,
      offset: query.offset,
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
