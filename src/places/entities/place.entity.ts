import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  collection: 'Places',
})
export class Place {
  @Prop()
  category: string;

  @Prop()
  subcategories: string[];

  @Prop()
  datasources: string[];

  @Prop({ type: Object })
  geo: {
    coordinates?: [number, number];
    lat: number;
    long: number;

    country: string;
    country_code?: string;

    city?: string;
    region?: string;

    state?: string;
    state_code?: string;

    suburb?: string;
    street?: string;

    full_address: string;
    address_line1?: string;
    address_line2?: string;
    address_line3?: string;
    postcode?: number;

    third_party?: {
      google_maps_link?: string;
      osm?: string;
      osm_id?: string;
    };
  };

  @Prop({ type: Object })
  place: {
    name: string;
    full_name?: string;
    old_name?: string;

    description?: string;

    is_heritage?: boolean;
    is_guarded?: boolean;
    authorized_personeel_only?: boolean;
    is_goverment_property?: boolean;

    founded_by?: string;
    builded_at?: Date;
    construction_started_at?: Date;
    builded_by?: string;

    open_hours?: {
      from: number;
      to: number;
    };
    is_always_open?: boolean;

    // from 18, 16, 12, etc
    age_from?: number;

    facilities?: string[];

    wikipedia?: string;
    images?: string[];
  };

  @Prop({ type: Object })
  contacts?: {
    website?: string;
    websites?: string[];

    phone_number?: string;
    phone_numbers?: string;

    email?: string;
    emails?: string[];

    links?: string[];
  };

  @Prop({ type: Object })
  law?: {
    owner?: string;
    owner_law_address?: string;
    owner_phisycal_address?: string;
    license?: string;
    corp?: string;
  };
}
export const PlaceSchema = SchemaFactory.createForClass(Place);
