import { Locator, Page } from "@playwright/test"

export default class CardPage {
    readonly page: Page
    readonly attachmentBtn:Locator
    readonly uploadFileBtn:Locator
    readonly attachmentSection:Locator

    constructor(page:Page) {
        this.page = page;
        this.attachmentBtn = page.locator('button.Sc6pkrxVPpi79Q');
        this.uploadFileBtn = page.locator('label.D5LRBFV5A6xwhp');
        //assertions
        this.attachmentSection = page.locator('p.attachment-thumbnail-details');
    }

    async uploadFile(filePath:string) {
        await this.attachmentBtn.click();
        await this.uploadFileBtn.setInputFiles(filePath);
        await this.attachmentSection.waitFor();
    }

}