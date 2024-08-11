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
    <summary>Body</summary>

    ```JSON
    {
        "email": "mr_robot@ecorp.com"
    }
    ```
    </details>
    
    <details>
    <summary>Response</summary>
        
    ```JSON
    {
        "token": "<YOUR_TOKEN>",
        "expiresIn": "24h"
    }
    ```
    </details>
---
2. `POST:/places` **(admin route)** - creates place with provided fields and returns created place with generated `_id` and timestamps 
    
    <details>
    <summary>Body</summary>
    
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
    </details>

    <details>
    <summary>Response</summary>

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
    </details>
---
3. `PATCH:/places` **(admin route)** - updates place with provided fields and returns updated place

    <details>
    <summary>Body</summary>

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
    </details>


    <details>
    <summary>Response</summary>

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
    </details>
---
4. `DELETE:/places/:id`  **(admin route)** - deletes place by `_id`

    <details>
    <summary>Response</summary>

    ```JSON
    {
        "success": true
    }
    ```
    </details>
---
5. `GET:/places/:id` **(user route)** - returns found place by `_id`

+ Supports XML format, if you need given data to be in XML use `Content-Type`header with `application/xml`

    <details>
    <summary>Response</summary>

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
    </details>

---
   

6. `GET:/places` **(user route)** - returns places by provided options

+ Supports XML format, if you need given data to be in XML use `Content-Type`header with `application/xml`
    

    <details>
    <summary>Options</summary>
    
    | Querystring        | Description                                                      | Example value                |
    |--------------------|------------------------------------------------------------------|------------------------------|
    | **category**       | _Filters place by category_                                      | `shops`                      |
    | **subcategories**  | _Adds additional categories, that can be divided by "."_         | `groceries.vegan`            |
    | **city**           | _Filters place by city (case is necessary)_                      | `Moscow`                     |
    | **country**        | _Filters place by country (case is necessary)_                   | `Russia`                     |
    | **state**          | _Filters place by state (case is necessary)_                     | `Arizona`                    |
    | **state_code**     | _Filters place by shortened state_                               | `AZ`                         |
    | **region**         | _Filters place by state region (case is necessary)_              | `Glendale`                   |
    | **postcode**       | _Filters place by postcode (must be number)_                     | `123133`                     |
    | **builded_by**     | _Filters place by creator/builder_                               | `Stanford Professor`         |
    | **open_from**      | _Filters by place opening hours (24h format)_                    | `10`                         |
    | **open_to**        | _Filters by place closing hours (24h format)_                    | `23`                         |
    | **is_always_open** | _Filters only always-open places (boolean)_                      | `true`                       |
    | **age_from**       | _Filters by place minimal allowed age to enter (must be number)_ | `18`                         |
    | **facilities**     | _Filters by place facilities such as parking (string array)_     | `parking` `disabled_support` |
    | **owner**          | _Filters by place owner_                                         | `Donald Trump`               |
    | **license**        | _Filters by place license (or any law document)_                 | `gambling_license`           |
    | **corp**           | _Filters place by owning corp_                                   | `Apple`                      |

    </details>

    <details>
    <summary>Response</summary>

    ```JSON
    [
        {
            "_id": ...,

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
            "createdAt": ...,
            "updatedAt": ...,
            "__v": 0
        },
        {
            "_id": ...,

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
            "createdAt": ...,
            "updatedAt": ...,
            "__v": 0
        }
    ]
    ```
    </details>



# Launch

1. Copy this repo
```shell
git clone https://github.com/LCcodder/places-api
```
2. Install packages
```shell
npm i
```
3. Configure environment variables in `.env` file
4. Make sure you running `Mongodb`
5. Run app
```shell
npm start
```

---
### Made by [LCcodder](https://github.com/LCcodder)