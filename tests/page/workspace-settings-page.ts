import { type Locator, type Page } from '@playwright/test';


export default class WorkspaceSettings {
        readonly page: Page
        readonly workspaceName: Locator
        readonly deleteWorkspaceBtn: Locator
        readonly confirmWorkspaceNameInput: Locator
        readonly confirmDeleteWorkspaceBtn: Locator   

    constructor (page:Page){
        this.page = page;
        this.deleteWorkspaceBtn = page.getByTestId('delete-workspace-button');
        this.confirmWorkspaceNameInput = page.locator('#confirmWorkspaceName');
        this.confirmDeleteWorkspaceBtn = page.getByTestId('delete-workspace-confirm-button');
        // assertion locators
        this.workspaceName = page.locator('.SiP6d2d_8FAAkC');

    };

    async deleteWorkspace(workspaceName:string) {
        await this.deleteWorkspaceBtn.click();
        await this.confirmWorkspaceNameInput.fill(workspaceName);
        await this.confirmDeleteWorkspaceBtn.click();
    }
}


