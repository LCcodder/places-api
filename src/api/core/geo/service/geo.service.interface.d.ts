import { CalculateDeltaDto } from "../dto/calculate-delta.dto"

export interface IGeoService {
  calculateAround(calculateDeltaDto: CalculateDeltaDto): {
    latAround: number
    longAround: number
  }
}