import { expect, test } from "@playwright/test"
import APIClient from "../../src/client/APIClient.js"
import {USERS} from "../../src/data/dict/users.js"
import { VALID_PUT_CARS_RESPONSE_BODY } from "./fixtures/cars.fixtures.js"
import { EXAMPLE_CARS } from "./fixtures/cars.fixtures.js"

test.describe("PUT requests", () => {
    let client
    let unathorizedClient
    let cars
    let carId
    let updateData

    test.beforeAll(async () => {
        client = await APIClient.authenticate(undefined, {
            "email": USERS.DEN_LOGIN.email,
            "password": USERS.DEN_LOGIN.password,
            "remember": false
    })

    unathorizedClient = new APIClient()
    await client.cars.createNewCar(EXAMPLE_CARS[0])

    updateData = {
        "carBrandId": 2,
        "carModelId": 7,
        "mileage": 150
    }
    cars = await client.cars.getUserCars()
    carId = cars.data.data[0]
})

    test.afterAll(async () => {
        await client.cars.deleteCar(carId)
    })

    
    test("Should update a car", async () => {
        const response = await client.cars.updateUserCar(carId.id, updateData)

        expect(response.status, "Status code should be 200").toEqual(200)
        expect(response.data, "Update cars should be returned").toEqual(VALID_PUT_CARS_RESPONSE_BODY)
    })

    test("Should return error message not authenticated", async () => {
        const response = await unathorizedClient.cars.updateUserCar(carId.id, updateData)
    
        expect(response.status, "Status code should be 401").toEqual(401)
        expect(response.data.message, "Error message should be returned").toEqual("Not authenticated")
    })
})