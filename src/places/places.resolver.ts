import { Args, Resolver, Query } from '@nestjs/graphql';
import { PlacesService } from './places.service';
import { Place } from './entities/place.entity';
import { UseGuards } from '@nestjs/common';
import { RoleGuard } from 'src/auth/auth.guard';

@Resolver(of => Place)
export class PlacesResolver {
    constructor(private readonly placesService: PlacesService) {}

    @Query()
    @UseGuards(RoleGuard('user'))
    place(@Args('id') id: string) {
        return this.placesService.findOne(id)
    }

    // @Query()
    // @UseGuards(RoleGuard('user'))
    // places() {
    //     return
    // }
}
