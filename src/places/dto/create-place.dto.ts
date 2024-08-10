import { Optional } from '@nestjs/common';
import {
  IsArray,
  IsString,
  Length,
  IsObject,
  ArrayMinSize,
  ArrayMaxSize,
  IsNumber,
  IsOptional,
  IsBoolean,
  Min,
  Max,
} from 'class-validator';

class ThirdPartyDto {
  @Optional()
  @IsString()
  google_maps_link?: string;

  @Optional()
  @IsString()
  osm?: string;

  @Optional()
  @IsString()
  osm_id?: string;
}

class GeoDto {
  @IsOptional()
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  coordinates?: [number, number];

  @IsNumber()
  lat: number;
  @IsNumber()
  long: number;

  @IsString()
  country: string;

  @Optional()
  @IsString()
  @Length(2)
  country_code?: string;

  @Optional()
  @IsString()
  city?: string;
  @Optional()
  @IsString()
  region?: string;

  @Optional()
  @IsString()
  state?: string;

  @Optional()
  @IsString()
  state_code?: string;

  @Optional()
  @IsString()
  suburb?: string;

  @Optional()
  @IsString()
  street?: string;

  @IsString()
  full_address: string;

  @Optional()
  @IsString()
  address_line1?: string;

  @Optional()
  @IsString()
  address_line2?: string;

  @Optional()
  @IsString()
  address_line3?: string;

  @Optional()
  @IsNumber()
  postcode?: number;

  @IsOptional()
  @IsObject()
  third_party?: ThirdPartyDto;
}

class OpenHoursDto {
  @IsNumber()
  @Min(0)
  @Max(24)
  from: number;

  @IsNumber()
  @Min(0)
  @Max(24)
  to: number;
}
class PlaceDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  full_name?: string;

  @IsOptional()
  @IsString()
  old_name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  is_heritage?: boolean;

  @IsOptional()
  @IsBoolean()
  is_guarded?: boolean;

  @IsOptional()
  @IsBoolean()
  authorized_personeel_only?: boolean;

  @IsOptional()
  @IsBoolean()
  is_goverment_property?: boolean;

  @IsOptional()
  @IsString()
  founded_by?: string;

  @IsOptional()
  @IsString()
  builded_at?: string;

  @IsOptional()
  @IsString()
  construction_started_at?: string;

  @IsOptional()
  @IsString()
  builded_by?: string;

  @IsOptional()
  @IsObject()
  open_hours?: OpenHoursDto;

  @IsOptional()
  @IsBoolean()
  is_always_open?: boolean;

  @IsOptional()
  @IsNumber()
  @Max(21)
  @Min(0)
  // from 18, 16, 12, etc
  age_from?: number;

  @IsOptional()
  @IsArray()
  facilities?: string[];

  @IsOptional()
  @IsString()
  wikipedia?: string;

  @IsOptional()
  @IsArray()
  images?: string[];
}
class ContactsDto {
  @IsOptional()
  @IsString()
  website?: string;

  @IsOptional()
  @IsArray()
  websites?: string[];

  @IsOptional()
  @IsString()
  phone_number?: string;

  @IsOptional()
  @IsArray()
  phone_numbers?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsArray()
  emails?: string[];

  @IsOptional()
  @IsArray()
  links?: string[];
}
class LawDto {
  @IsOptional()
  @IsString()
  owner?: string;

  @IsOptional()
  @IsString()
  owner_law_address?: string;

  @IsOptional()
  @IsString()
  owner_phisycal_address?: string;

  @IsOptional()
  @IsString()
  license?: string;

  @IsOptional()
  @IsString()
  corp?: string;
  
}
class AuthorDto {
  @IsOptional()
  @IsString()
  author_email?: string;

  @IsOptional()
  @IsString()
  author_country?: string;

  @IsOptional()
  @IsString()
  author_ipv4_address?: string;

  @IsOptional()
  @IsString()
  author_user_agent?: string;
}
export class CreatePlaceDto {
  @IsString()
  @Length(2, 30)
  category: string;

  @IsArray()
  subcategories: string;

  @IsArray()
  datasources: string[];

  @IsObject()
  geo: GeoDto;

  @IsObject()
  place: PlaceDto;

  @IsOptional()
  @IsObject()
  contacts?: ContactsDto;

  @IsOptional()
  @IsObject()
  law?: LawDto;

}
