import {test} from "../../src/fixtures/test.fixture.js"
import {expect} from "@playwright/test";

test.describe('Garage page', ()=> {
    test('User can opened Garage page via storage state', async ({userGaragePage}) => {
        await expect(userGaragePage.addCarButton, "Button should be visible").toBeVisible()
        await expect(userGaragePage.addCarButton, "Button should have correct title").toHaveText("Add car")
    })
})
