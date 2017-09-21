# Server side

### Server side for this project can be written in any language you'd like and backed by any database.

## routes

GET /api/networks --> returns an array of all networks

GET /api/networks/:networkId --> returns an array of all stations belonging to a network

GET /api/stations/:stationId --> returns details of a specific stationId

GET /api/stations/:stationId/reviews --> returns all reviews in an array for that station

PUT /api/stations/:stationId --> returns the details of a specific station with an updated empty_slots field
  - accepts json
    -
    ```
    {
        emptySlots: Number,
        closed: Bool,
        safe: Bool
      }
      ```
POST /api/reviews/:networkId/:stationId
  - accepts json
    - ```
    {
      text: String,
      userName: String,
      stars: Number 1-5 or throws an error
    }
    ```


#### Tasks

1) Design the schema for the database
2) Provide an API to list the networks
3) Provide an API to get details on a specific network
4) Provide an API to update the available slots in a specific location
5) Provide an API to update that a location is closed
6) Provide an API to update that a location is not safe for use
7) Provide an API to allow users to share reviews on a specific location (no sign in needed).

You should be using the initial citibike API for seeding your data, you should not use it in any other way. In real time, the API should query your database and not communicate with the citybike API.

This means, you will need to create a seeding script that will consume the citibike API and fill your database with initial data in dev.
