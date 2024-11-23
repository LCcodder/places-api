import { Args, Resolver, Query } from '@nestjs/graphql';
import { PlacesService } from './service/places.service';
import { Place } from './entities/place.entity';
import { UseGuards } from '@nestjs/common';
import { RoleGuard } from 'src/api/shared/guards/auth.guard';
import { formatPlacesQueryToDto } from 'src/api/shared/utils/formating/places-query.formatter';

@Resolver((_of) => Place)
export class PlacesResolver {
  constructor(private readonly placesService: PlacesService) {}

  @Query()
  @UseGuards(RoleGuard('user'))
  public async place(@Args('id') id: string) {
    return await this.placesService.findOne(id);
  }

  @Query()
  @UseGuards(RoleGuard('user'))
  public async places(@Args() args: any) {
    return await this.placesService.findAll(formatPlacesQueryToDto(args), {
      limit: args.limit,
      offset: args.offset,
    });
  }
}
