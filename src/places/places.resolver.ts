import { Args, Resolver, Query } from '@nestjs/graphql';
import { PlacesService } from './places.service';
import { Place } from './entities/place.entity';
import { UseGuards } from '@nestjs/common';
import { RoleGuard } from 'src/shared/guards/auth.guard';
import { formatPlacesQueryToDto } from 'src/shared/utils/formating/places-query.formatter';

@Resolver((_of) => Place)
export class PlacesResolver {
  constructor(private readonly placesService: PlacesService) {}

  @Query()
  @UseGuards(RoleGuard('user'))
  place(@Args('id') id: string) {
    return this.placesService.findOne(id);
  }

  @Query()
  @UseGuards(RoleGuard('user'))
  places(@Args() args: any) {
    return this.placesService.findAll(formatPlacesQueryToDto(args), {
      limit: args.limit,
      offset: args.offset,
    });
  }
}
