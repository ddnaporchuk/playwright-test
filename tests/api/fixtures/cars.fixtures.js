import { expect } from "@playwright/test"

export const VALID_POST_CARS_RESPONSE_BODY = {
    "status": "ok",
    "data": {
        "id": expect.any(Number),
        "carBrandId": 2,
        "carModelId": 8,
        "initialMileage": 155,
        "carCreatedAt": expect.any(String),
        "updatedMileageAt": expect.any(String),
        "mileage": 155,
        "brand": "BMW",
        "model": "X5",
        "logo": "bmw.png"
    }
}

export const VALID_USER_CARS_RESPONSE_BODY = {
    DEN_LOGIN: {
        "status": "ok",
        "data": [
            {
                "id": 77778,
                "carBrandId": 2,
                "carModelId": 6,
                "initialMileage": 57,
                "updatedMileageAt": "2023-12-17T04:04:05.000Z",
                "carCreatedAt": "2023-12-09T00:00:00.000Z",
                "mileage": 57,
                "brand": "BMW",
                "model": "3",
                "logo": "bmw.png"
            },
            {
                "id": 77777,
                "carBrandId": 4,
                "carModelId": 17,
                "initialMileage": 541,
                "updatedMileageAt": "2023-12-17T04:03:50.000Z",
                "carCreatedAt": "2023-12-09T00:00:00.000Z",
                "mileage": 541,
                "brand": "Porsche",
                "model": "Cayenne",
                "logo": "porsche.png"
            },
            {
                "id": 77776,
                "carBrandId": 1,
                "carModelId": 1,
                "initialMileage": 122,
                "updatedMileageAt": "2023-12-17T04:03:37.000Z",
                "carCreatedAt": "2023-12-09T00:00:00.000Z",
                "mileage": 122,
                "brand": "Audi",
                "model": "TT",
                "logo": "audi.png"
            }
        ]
    }
}

export const VALID_PUT_CARS_RESPONSE_BODY = {
    "status": "ok",
    "data": {
        "id": expect.any(Number),
        "carBrandId": 2,
        "carModelId": 7,
        "initialMileage": 122,
        "updatedMileageAt": expect.any(String),
        "carCreatedAt": expect.any(String),
        "mileage": 150,
        "brand": "BMW",
        "model": "5",
        "logo": "bmw.png"
  }
}

export const EXAMPLE_CARS = [
    {
        "carBrandId": 5,
        "carModelId": 21,
        "mileage": 122
    },
    {
        "carBrandId": 3,
        "carModelId": 12,
        "mileage": 99
    }
]