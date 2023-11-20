import BasePage from "../pageObjects/BasePage.js";
import {expect} from "@playwright/test";
import SignUpPopup from "../components/SignUpPopup.js";
import SignInPopup from "../components/SignInPopup.js"


export class WelcomePage extends BasePage {
    constructor(page) {
        super(page, '/', page.locator('button', {hasText: 'Guest log in'}));
        this.signUpButton = this._page.locator('button:text("Sign up")');
        this.signInButton = this._page.locator('.header-signin');
    }

    async openSignInPopup(){
        await this.signInButton.click();
        return new SignInPopup(this._page)
    }

    async openSignupPopup(){
        await this.signUpButton.click();
        return new SignUpPopup(this._page)
    }
}