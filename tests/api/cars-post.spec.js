import { expect, test } from "@playwright/test"
import { USERS } from "../../src/data/dict/users"
import { VALID_BRANDS_RESPONSE_BODY } from "../../src/data/dict/brands"
import { VALID_BRAND_MODELS } from "../../src/data/dict/models"
import {VALID_POST_CARS_RESPONSE_BODY} from "./fixtures/cars.fixtures.js"
import APIClient from "../../src/client/APIClient.js"


test.describe("POST requests", () => {
    let client
    let clientNotAuthorized

    const brandId = VALID_BRANDS_RESPONSE_BODY.data[1].id
        const modelId = VALID_BRAND_MODELS[brandId].data[2].id
        const requestBody = {
            "carBrandId": brandId,
            "carModelId": modelId,
            "mileage": 155
        }

    test.beforeAll(async () => {
        client = await APIClient.authenticate({
            "email": USERS.DEN_LOGIN.email,
            "password": USERS.DEN_LOGIN.password,
            "remember": false
        })

        clientNotAuthorized = new APIClient()
    })

    test('Should create a new car', async() => {
        const response = await client.cars.createNewCar(requestBody)
        const body = response.data

        expect(response.status, "Status code should be 201").toEqual(201)
        expect(body.status).toBe("ok")
        expect(body, "Car should created").toEqual(VALID_POST_CARS_RESPONSE_BODY)
    })

    test("Should return an error missing authorized client", async () => {
        const response = await clientNotAuthorized.cars.createNewCar(requestBody)
        const body = response.data
    
        expect(response.status, "Status code should be 401").toEqual(401)
        expect(body.message, "Error message should be returned").toEqual("Not authenticated")
      })
})