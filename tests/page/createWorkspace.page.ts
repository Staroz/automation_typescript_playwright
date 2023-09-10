import { type Locator, type Page } from '@playwright/test';


export default class CreateWorkspace {
        readonly page: Page
        readonly workspaceNameInput: Locator
        readonly workspaceTypeSelect: Locator
        readonly workspaceType: Locator
        readonly workspaceContinueBtn: Locator
        readonly workspaceShowLaterBtn: Locator
    
    constructor (page:Page){
        this.page = page;
        this.workspaceNameInput = page.getByPlaceholder("Taco's Co.");
        this.workspaceTypeSelect = page.locator('.css-191o3mb');
        this.workspaceType = page.getByTestId('header-create-team-type-input-education').getByText('Education');
        this.workspaceContinueBtn = page.getByTestId('header-create-team-submit-button');
        this.workspaceShowLaterBtn = page.getByTestId('show-later-button'); //"I'll do this later" link;
        
    };

    async createWorkspace(workspaceName:string){
        await this.workspaceNameInput.fill(workspaceName);
        await this.workspaceTypeSelect.click();
        await this.workspaceType.click();
        await this.workspaceContinueBtn.click();
        await this.workspaceShowLaterBtn.click();
    };

}


