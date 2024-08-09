import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes, Req, HttpException, UseGuards } from '@nestjs/common';
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
  @UsePipes(new ValidationPipe({skipMissingProperties: true}))
  @UsePipes(new ValidationPipe({forbidNonWhitelisted: true, whitelist: true, transform: true}))
  create(@Body() createPlaceDto: Omit<CreatePlaceDto, "author">, @Req() req: Request) {
    return this.placesService.create(createPlaceDto);
  }

  @Get()
  findAll() {
    return this.placesService.findAll();
  }

  @Get(':id')
  @UseGuards(RoleGuard('user'))
  findOne(@Param('id') id: string) {
    return this.placesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RoleGuard('admin'))
  @UsePipes(new ValidationPipe({skipMissingProperties: true}))
  @UsePipes(new ValidationPipe({forbidNonWhitelisted: true, whitelist: true, transform: true}))
  update(@Param('id') id: string, @Body() updatePlaceDto: UpdatePlaceDto) {
    return this.placesService.update(id, updatePlaceDto);
  }

  @Delete(':id')
  @UseGuards(RoleGuard('admin'))
  remove(@Param('id') id: string) {
    return this.placesService.remove(id);
  }
}
