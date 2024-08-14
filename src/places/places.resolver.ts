import { Args, Resolver, Query } from '@nestjs/graphql';
import { PlacesService } from './places.service';
import { Place } from './entities/place.entity';
import { UseGuards } from '@nestjs/common';
import { RoleGuard } from 'src/auth/auth.guard';
import { formatQueryToDto } from 'src/utils/formating/format.find-places.dto';

@Resolver((of) => Place)
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
    return this.placesService.findAll(formatQueryToDto(args), {
      limit: args.limit,
      offset: args.offset,
    });
  }
}
