import { type Page, type Locator } from "@playwright/test";

export default class UserPage {
    readonly page: Page
    readonly createBtn: Locator
    readonly createWorkspaceBtn: Locator
    readonly workspaceSection: Locator
    readonly boardIcon: Locator
    readonly memberIconBtn: Locator
    readonly logOutBtn: Locator
    readonly confirmLogOutBtn: Locator
    readonly actionAlert: Locator

    constructor (page: Page) {
        this.page = page;
        this.createBtn = page.getByTestId('header-create-menu-button');
        this.createWorkspaceBtn = page.getByTestId('header-create-team-button');
        this.workspaceSection = page.locator('.boards-page-board-section-header');
        this.boardIcon = page.locator('.board-tile')

        // logout
        this.memberIconBtn = page.getByTestId('header-member-menu-button');
        this.logOutBtn = page.getByTestId('account-menu-logout');
        this.confirmLogOutBtn = page.locator('#logout-submit');
        // assertions
        this.actionAlert = page.locator('.YEctMXs9uZbttS');
    }

    async openCreateWorkspace() {
        await this.createBtn.click();
        await this.createWorkspaceBtn.click();
    }

    async openSettingsWorkspace(workspaceName: string) {
        await this.workspaceSection.filter({has: this.page.getByText(workspaceName)}).first().getByText('Settings').click();
    }

    async openBoard(boardName:string) {
        await this.boardIcon.getByText(boardName).first().click()
    }

    async logout() {
        await this.memberIconBtn.click();
        await this.logOutBtn.click();
        await this.confirmLogOutBtn.waitFor();
        await this.confirmLogOutBtn.click();
    }

}