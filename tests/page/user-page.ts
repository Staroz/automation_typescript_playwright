import { type Page, type Locator } from "@playwright/test";

export default class UserPage {
    readonly page: Page
    readonly createWorkspaceIcon: Locator
    readonly workspaceSection: Locator
    readonly memberIconBtn: Locator
    readonly logOutBtn: Locator
    readonly confirmLogOutBtn: Locator
    readonly actionAlert: Locator

    constructor (page: Page) {
        this.page = page;
        this.createWorkspaceIcon = page.getByTestId('home-navigation-create-team-button');
        this.workspaceSection = page.locator('.boards-page-board-section-header');
        // logout
        this.memberIconBtn = page.getByTestId('header-member-menu-button');
        this.logOutBtn = page.getByTestId('account-menu-logout');
        this.confirmLogOutBtn = page.locator('#logout-submit');
        // assertions
        this.actionAlert = page.locator('.YEctMXs9uZbttS');
    }

    async openCreateWorkspace() {
        await this.createWorkspaceIcon.click();
    }

    async openSettingsWorkspace(workspaceName: string) {
        await this.workspaceSection.filter({has: this.page.getByText(workspaceName)}).first().getByText('Settings').click();
    }

    async logout() {
        await this.memberIconBtn.click();
        await this.logOutBtn.click();
        await this.confirmLogOutBtn.waitFor();
        await this.confirmLogOutBtn.click();
    }

}