import { FindAllQuery } from 'src/places/dto/find-places.dto';

export const formatPlacesQueryToDto = (query: any): FindAllQuery => {
  return {
    category: query.category,
    subcategories: query.subcategories
      ? !Array.isArray(query.subcategories)
        ? query.subcategories.split('.')
        : undefined
      : undefined,
    lat: query.lat ? parseFloat(query.lat) : undefined,
    long: query.long ? parseFloat(query.long) : undefined,
    radius_in_meters: query.radius ? parseFloat(query.radius) : undefined,
    city: query.city,
    country: query.country,
    state: query.state,
    state_code: query.state_code,
    region: query.region,
    postcode: query.postcode ? parseInt(query.postcode) : undefined,
    builded_by: query.builded_by,
    open_from: query.open_from ? parseInt(query.open_from) : undefined,
    open_to: query.open_to ? parseInt(query.open_to) : undefined,
    is_always_open:
      query.is_always_open >= 0 ? Boolean(query.is_always_open) : undefined,
    age_from: query.age_from ? parseInt(query.age_from) : undefined,
    facilities: Array.isArray(query.facilities)
      ? [...query.facilities]
      : query.facilities
        ? [query.facilities]
        : undefined,
    owner: query.owner,
    license: query.license,
    corp: query.corp,
    sort_by_build_date: parseInt(query.sort) >= 1 ? 1 : -1,
  };
};
