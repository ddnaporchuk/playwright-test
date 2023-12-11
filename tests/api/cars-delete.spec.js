import { expect, test } from "@playwright/test"
import { USERS } from "../../src/data/dict/users"
import { EXAMPLE_CARS } from "./fixtures/cars.fixtures.js"
import APIClient from "../../src/client/APIClient.js"

test.describe("DELETE requests", () => {
    let client
    let unauthorizedClient
    let cars
    let carId

    test.beforeAll(async () => {
        client = await APIClient.authenticate({
            "email": USERS.DEN_LOGIN.email,
            "password": USERS.DEN_LOGIN.password,
            "remember": false
        })

        unauthorizedClient = new APIClient()

        cars = await client.cars.getUserCars()
    })

    test("Should delete car", async () => {
        const carDelete = cars.data.data[0]
        const response = await client.cars.deleteCar(carDelete.id)
        const body = response.data

        expect(response.status, "Status code should be 200").toEqual(200)
        expect(body.status).toBe("ok")
        expect(body.data.carId, "Car should be delete").toEqual(carDelete.id)
    })

    test("Should return error car not found", async () => {
        const response = await client.cars.deleteCar(200)
        const body = response.data

        expect(response.status, "Status code should be 404").toEqual(404)
        expect(body.message, "should throw error message").toEqual("Car not found")
      })

    test("Should return an error missing authorized client", async () => {
        const testCar = cars.data.data[1]
        const response = await unauthorizedClient.cars.deleteCar(testCar[1])
        const body = response.data

        expect(response.status, "Status code should be 401").toEqual(401)
        expect(body.message, "Should return error message").toEqual("Not authenticated")
    })
})