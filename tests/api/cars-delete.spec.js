import { expect, test } from "@playwright/test"
import { USERS } from "../../src/data/dict/users"
import APIClient from "../../src/client/APIClient.js"
import { VALID_BRANDS_RESPONSE_BODY } from "../../src/data/dict/brands.js"
import { VALID_BRAND_MODELS } from "../../src/data/dict/models.js"

test.describe("DELETE requests", () => {
    let client
    let carId
    let carsDelete = []

    test.beforeAll(async () => {
        client = await APIClient.authenticate({
            "email": USERS.DEN_LOGIN.email,
            "password": USERS.DEN_LOGIN.password,
            "remember": false
        })
    })

    test.beforeEach(async () => {
        const brandId = VALID_BRANDS_RESPONSE_BODY.data[0].id
        const modelId = VALID_BRAND_MODELS[brandId].data[1].id
        const requestBody = {
            "carBrandId": brandId,
            "carModelId": modelId,
            "mileage": 155
        }
        
        const newCar = await client.cars.createNewCar(requestBody)
        carId = newCar.data.data.id
    })

    test("Should delete car", async () => {
        const response = await client.cars.deleteCar(carId)
        const body = response.data

        expect(response.status, "Status code should be 200").toEqual(200)
        expect(body.status).toBe("ok")
    })

    test('Should return error message for car with invalid carId', async ()=>{
        const invalidCar = 0
        const response = await client.cars.deleteCar(invalidCar)
        const body = response.data

        expect(response.status, "Status code should be 404").toEqual(404)
        expect(body.message, "Error message for car with invalid carModelId should be returned").toEqual('Car not found')
        carsDelete.push(carId)
    })

    test.afterAll(async () => {
        for (const id of carsDelete) {
            await client.cars.deleteCar(id)
        }
    })
})
