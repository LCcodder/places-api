# Places API written in `Node.js`

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

### This is places REST API service like `geoapify` or another similar geographic API with querying and finding places in radius.

+ This API works with *role-based* auth, so if you want to create/update/delete places you must provide one of the *master keys* in `token` querystring

# Endpoints:
1. `POST:/auth` - returns API token with expiration time

    <details>
        <summary>Body:</summary>

        ```JSON
        {
            "email": "mr_robot@ecorp.com"
        }
        ```
    </details>
    
    Response:
    ```JSON
    {
        "token": "<YOUR_TOKEN>",
        "expiresIn": "24h"
    }
    ```
2. `POST:/places` **(admin route)** - creates place with provided fields and returns created place with generated `_id` and timestamps 
    
    Body:
    ```JSON
    {
        // required
        "category": "goverment",
        
        // required
        "subcategories": ["services", "police"],

        // required
        "datasources": ["OSM", "google maps"],

        "geo": {
            "coordinates": [34.312321, 62.12476456],
            
            // required
            "lat": 34.312321,
            //required
            "long": 62.12476456,

            // required
            "country": "Russia",
            "country_code": "RU",

            "city": "Moscow",
            "region": "Khimki",

            "state": "SZAO",
            "state_code": "sz",

            "suburb": "Leninski prospect",
            "street": "Pushkinskaya",

            // required
            "full_address": "Moscow, Khimki, Pushkina 12/23",

            "address_line1": "string",
            "address_line2": "string",
            "address_line3": "string",
            "postcode": 123457,
            
            "third_party": {
                "google_maps_link": "<GM link>",
                "osm": "<osm link>",
                "osm_id": "asdada1231231"
            }
        },

        "place": {
            // required
            "name": "Police department of Khimki",
            
            "full_name": "GU MVD of Khimki, Moscow Oblast",
            "old_name": "Deputy of Khimki",

            "description": "Police department, located near west road",

            "is_heritage": false,
            "is_guarded": true,
            "authorized_personeel_only": true,
            "is_goverment_property": true,

            "founded_by": "Department of Justice of Moscow",
            "builded_at": "2024-08-11T15:48:00.852Z",
            "construction_started_at": "2024-08-11T15:48:00.852Z",
            "builded_by": "REDACTED",

            "open_hours": {
                "from": 0,
                "to": 24
            },

            "is_always_open": true,
            "age_from": 21,

            "facilities": ["parking"],

            "wikipedia": "<wiki link>",
            "images": "http://images.com/police-department/1"
        },

        "contacts": {
            "website": "http://khpd.ru",
            "websites": ["http://khpd.ru"],

            "phone_number": "911",
            "phone_numbers": ["911"],

            "email": "khpd@p.ru",
            "emails": ["khpd@p.ru"],

            "links": ["http://khpd.ru"]
        },

        "law": {
            "owner": "Department Of Justice",
            "owner_law_address": "ae12424",
            "owner_phisycal_address": "Kremlyn",
            "license": "gov12313",
            "corp": "S.T.A.R.S."
        }
    }
    ```

    Response:
    ```JSON
    {
        "_id": "66b744dbde0cb7ff86d627ad",
        "category": ...,
        
        "subcategories": ...,

        "datasources": ...,

        "geo": {
            ...
        },

        "place": {
            ...
        },

        "contacts": {
            ...
        },

        "law": {
            ...
        },
        "createdAt": "2024-08-10T10:45:47.522Z",
        "updatedAt": "2024-08-10T10:45:47.522Z",
        "__v": 0
    }
    ```

3. `PATCH:/places` **(admin route)** - updates place with provided fields and returns updated place

    Body:
    ```JSON
    {
        "law": {
        "owner": "Department Of Justice",
        "owner_law_address": "[REDACTED]",
        "owner_phisycal_address": "[REDACTED]",
        "license": "[REDACTED]",
        "corp": "S.T.A.R.S."
    }
    }
    ```

    Response: 
    ```JSON
    {
        "_id": "66b744dbde0cb7ff86d627ad",

        "category": ...,
        
        "subcategories": ...,

        "datasources": ...,

        "geo": {
            ...
        },

        "place": {
            ...
        },

        "contacts": {
            ...
        },
        "law": {
            "owner": "Department Of Justice",
            "owner_law_address": "[REDACTED]",
            "owner_phisycal_address": "[REDACTED]",
            "license": "[REDACTED]",
            "corp": "S.T.A.R.S."
        },
        "createdAt": "2024-08-10T10:45:47.522Z",
        "updatedAt": "2024-08-10T10:45:47.522Z",
        "__v": 0
    }
    ```

4. `DELETE:/places/:id`  **(admin route)** - deletes place by `_id`
    Response:
    ```JSON
    {
        "success": true
    }
    ```

5. `GET:/places/:id` **(user route)** - returns found place by `_id`

    Response: 
    ```JSON
    {
        "_id": "66b744dbde0cb7ff86d627ad",

        "category": ...,
        
        "subcategories": ...,

        "datasources": ...,

        "geo": {
            ...
        },

        "place": {
            ...
        },

        "contacts": {
            ...
        },
        "law": {
            ...
        },
        "createdAt": "2024-08-10T10:45:47.522Z",
        "updatedAt": "2024-08-10T10:45:47.522Z",
        "__v": 0
    }
    ```

    + Supports XML format, if you need given data to be in XML use `Content-Type` header with `application/xml`

6. `GET:/places **(user route)** - returns places by provided options
    
    Options:
