import { DeepOptional } from 'typing-assets';

export type FindAllQuery = DeepOptional<{
  category: string;
  subcategories: string[];
  lat: number;
  long: number;
  radius_in_meters: number;
  city: string;
  country: string;
  state: string;
  state_code: string;
  region: string;
  postcode: number;
  builded_by: string;
  open_from: number;
  open_to: number;
  is_always_open: boolean;
  age_from: number;
  facilities: string[];
  owner: string;
  license: string;
  corp: string;
}>;
