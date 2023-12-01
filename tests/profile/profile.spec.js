import { USER_PROFILE_RESPONSE_BODY } from "./profile.fixtures.js"
import { expect } from "@playwright/test"
import { test } from "../../src/fixtures/test.fixture.js";
import { STORAGE_STATE_USER_PATH } from "../../src/data/storageState.js"
import ProfilePage from "../../src/profilePage/ProfilePage.js"

test.describe("Profile page", () => {
  let page

  test.beforeEach(async ({ browser }) => {
    const ctx = await browser.newContext({
      storageState: STORAGE_STATE_USER_PATH
    })
    page = await ctx.newPage()
  })

  test("frontend should use profile user returned in response", async () => {
    await page.route("/api/users/profile", (route) => {
      route.fulfill({ body: JSON.stringify(USER_PROFILE_RESPONSE_BODY) })
    })

    const profilePage = new ProfilePage(page)
    await profilePage.navigate()

    await expect(profilePage.userInfo).toHaveText(`${USER_PROFILE_RESPONSE_BODY.data.name} ${USER_PROFILE_RESPONSE_BODY.data.lastName}`)
  })
})      