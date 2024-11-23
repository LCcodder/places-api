import { Injectable } from '@nestjs/common';
import { CalculateDeltaDto } from '../dto/calculate-delta.dto';
import { IGeoService } from './geo.service.interface';

@Injectable()
export class GeoService implements IGeoService {
  private static readonly EARTH_RADIUS = 6371210;

  private static degToRad(deg: number): number {
    return (deg * Math.PI) / 180;
  }

  private static computeDeltaForSingleCoord(deg: number): number {
    return (
      (Math.PI / 180) *
      GeoService.EARTH_RADIUS *
      Math.cos(GeoService.degToRad(deg))
    );
  }

  public calculateAround(calculateDeltaDto: CalculateDeltaDto) {
    return {
      latAround:
        calculateDeltaDto.radiusInMeters /
        GeoService.computeDeltaForSingleCoord(calculateDeltaDto.lat),
      longAround:
        calculateDeltaDto.radiusInMeters /
        GeoService.computeDeltaForSingleCoord(calculateDeltaDto.long),
    };
  }
}
