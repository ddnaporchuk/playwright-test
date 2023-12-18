import { expect, test } from "@playwright/test"
import { VALID_BRANDS_RESPONSE_BODY } from "../../src/data/dict/brands.js"
import { VALID_GET_MODELS } from "../../src/data/dict/models.js"
import { VALID_USER_CARS_RESPONSE_BODY } from "./fixtures/cars.fixtures.js"
import APIClient from "../../src/client/APIClient.js"
import { USERS } from "../../src/data/dict/users.js"

test.describe('GET requests', () => { 
    let client
    let clientNotAuthorized
    
    test.beforeAll(async () => {
        client = await APIClient.authenticate(undefined, {
            "email": USERS.DEN_LOGIN.email,
            "password": USERS.DEN_LOGIN.password,
            "remember": false
        })

        clientNotAuthorized = new APIClient()
    })

    test('should return a list of cars', async () => {
        const response = await client.cars.getUserCars();
        const body = response.data

        expect(response.status, "Status code should be 200").toEqual(200);
        expect(body, "should return a list of cars").toEqual(VALID_USER_CARS_RESPONSE_BODY.DEN_LOGIN);
    });

    test("should get current users cars by id", async () => {
        const cars = await client.cars.getUserCars()
        const response = await client.cars.getUserCarById(cars.data.data[0].id)
    
        expect(response.status, "Status code should be 200").toEqual(200)
        expect(response.data.data, "Valid car should be returned").toEqual(VALID_USER_CARS_RESPONSE_BODY.DEN_LOGIN.data[0])
      })
    
    test("should return cars brands", async () => {
        const response = await client.cars.getCarBrands()
        const body = response.data
        expect(response.status, "should return status code 200").toEqual(200)
        expect(body, "should return valid brands").toEqual(VALID_BRANDS_RESPONSE_BODY)
    })

    for(const brand of VALID_BRANDS_RESPONSE_BODY.data){
        test(`should return valid data for ${brand.title} brand`, async ({}) => {
            const brandId = brand.id
            const response = await client.cars.getCarBrandId(brandId)
            const body = response.data
            const expectedBrand = VALID_BRANDS_RESPONSE_BODY.data.find(data => data.id === brandId)

            expect(response.status, "Status code should be 200").toEqual(200)
            expect(body.data, "should be returned valid brands").toMatchObject(expectedBrand)
        })
    }

    test("Should return car models",async () =>{
        const response = await client.cars.getCarModels()

        expect(response.status, "Status code should be 200").toEqual(200)
        expect(response.data, "Valid brands should be returned").toEqual(VALID_GET_MODELS)
    })

    test("should return valid model data by id", async () => {
        const response = await client.cars.getModelById(12)
        const body = response.data
    
        expect(response.status, "Status code should be 200").toEqual(200)
        expect(body.data, "Valid brands should be returned").toEqual(VALID_GET_MODELS.data[11])
      })

      test("should return error usern not authenticated", async () => {
        const response = await clientNotAuthorized.cars.getUserCars()
        const body = response.data
    
        expect(response.status, "Status code should be 401").toEqual(401)
        expect(body.message, "Error message should be returned").toEqual("Not authenticated")
      })
})