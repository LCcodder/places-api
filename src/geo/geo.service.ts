import { Injectable } from '@nestjs/common';
import { CalculateDeltaDto } from './dto/calculate-delta.dto';

@Injectable()
export class GeoService {
  private readonly earthRadius = 6371210;

  private static degToRad(deg: number): number {
    return (deg * Math.PI) / 180;
  }

  private computeDeltaForSingleCoord(deg: number): number {
    return (
      (Math.PI / 180) * this.earthRadius * Math.cos(GeoService.degToRad(deg))
    );
  }

  calculateAround(calculateDeltaDto: CalculateDeltaDto): {
    latAround: number;
    longAround: number;
  } {
    return {
      latAround:
        calculateDeltaDto.radiusInMeters /
        this.computeDeltaForSingleCoord(calculateDeltaDto.lat),
      longAround:
        calculateDeltaDto.radiusInMeters /
        this.computeDeltaForSingleCoord(calculateDeltaDto.long),
    };
  }
}
