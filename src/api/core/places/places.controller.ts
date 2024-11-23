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
import { PlacesService } from './service/places.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Request, Response } from 'express';
import { RoleGuard } from 'src/api/shared/guards/auth.guard';
import { formatResponseContent } from 'src/api/shared/utils/formating/response-content.formatter';
import { formatPlacesQueryToDto } from 'src/api/shared/utils/formating/places-query.formatter';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Post()
  @UseGuards(RoleGuard('admin'))
  public async create(@Body() createPlaceDto: CreatePlaceDto) {
    return await this.placesService.create(createPlaceDto);
  }

  @Get()
  @UseGuards(RoleGuard('user'))
  public async findAll(@Query() query, @Req() req: Request, @Res() res: Response) {
    const places = await this.placesService.findAll(formatPlacesQueryToDto(query), {
      limit: query.limit,
      offset: query.offset,
    });

    return formatResponseContent(req, res, places);
  }

  @Get(':id')
  @UseGuards(RoleGuard('user'))
  public async findOne(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const place = await this.placesService.findOne(id);

    return formatResponseContent(req, res, place);
  }

  @Patch(':id')
  @UseGuards(RoleGuard('admin'))
  public async update(@Param('id') id: string, @Body() updatePlaceDto: UpdatePlaceDto) {
    return await this.placesService.update(id, updatePlaceDto);
  }

  @Delete(':id')
  @UseGuards(RoleGuard('admin'))
  public async remove(@Param('id') id: string) {
    return await this.placesService.remove(id);
  }
}
