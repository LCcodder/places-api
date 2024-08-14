
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class GeoThirdParty {
    google_maps_link?: Nullable<string>;
    osm?: Nullable<string>;
    osm_id?: Nullable<string>;
}

export class Geo {
    coordinates?: Nullable<Nullable<number>[]>;
    lat: number;
    long: number;
    country: string;
    country_code?: Nullable<string>;
    city?: Nullable<string>;
    region?: Nullable<string>;
    state?: Nullable<string>;
    state_code?: Nullable<string>;
    suburb?: Nullable<string>;
    street?: Nullable<string>;
    full_address: string;
    address_line1?: Nullable<string>;
    address_line2?: Nullable<string>;
    address_line3?: Nullable<string>;
    postcode?: Nullable<number>;
    third_party?: Nullable<GeoThirdParty>;
}

export class PlaceOpenHours {
    from: number;
    to: number;
}

export class _Place {
    name: string;
    full_name?: Nullable<string>;
    old_name?: Nullable<string>;
    description?: Nullable<string>;
    is_heritage?: Nullable<boolean>;
    is_guarded?: Nullable<boolean>;
    authorized_personeel_only?: Nullable<boolean>;
    is_goverment_property?: Nullable<boolean>;
    founded_by?: Nullable<string>;
    builded_at?: Nullable<string>;
    construction_started_at?: Nullable<string>;
    builded_by?: Nullable<string>;
    open_hours: PlaceOpenHours;
    is_always_open?: Nullable<boolean>;
    age_from?: Nullable<number>;
    facilities?: Nullable<Nullable<string>[]>;
    wikipedia?: Nullable<string>;
    images?: Nullable<Nullable<string>[]>;
}

export class Contacts {
    website?: Nullable<string>;
    websites?: Nullable<Nullable<string>[]>;
    phone_number?: Nullable<string>;
    phone_numbers?: Nullable<string>;
    email?: Nullable<string>;
    emails?: Nullable<Nullable<string>[]>;
    links?: Nullable<Nullable<string>[]>;
}

export class Law {
    owner?: Nullable<string>;
    owner_law_address?: Nullable<string>;
    owner_phisycal_address?: Nullable<string>;
    license?: Nullable<string>;
    corp?: Nullable<string>;
}

export class Place {
    category: string;
    subcategories: Nullable<string>[];
    datasources: Nullable<string>[];
    geo: Geo;
    place: _Place;
    contacts?: Nullable<Contacts>;
    law?: Nullable<Law>;
    _id: string;
    createdAt: string;
    updatedAt: string;
}

export abstract class IQuery {
    abstract place(id: string): Place | Promise<Place>;

    abstract places(): Nullable<Place>[] | Promise<Nullable<Place>[]>;
}

type Nullable<T> = T | null;
