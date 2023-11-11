import BasePage from "../pageObjects/BasePage.js";
import {expect} from "@playwright/test";
import SignUpPopup from "../components/SignUpPopup.js";


export class WelcomePage extends BasePage {
    constructor(page) {
        super(page, '/', page.locator('button', {hasText: 'Guest log in'}));
        this.signUpButton = this._page.locator('button:text("Sign up")');
    }

    async openSignupPopup(){
        await this.signUpButton.click();
        return new SignUpPopup(this._page)
    }
}