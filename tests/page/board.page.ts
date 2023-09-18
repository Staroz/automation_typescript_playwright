import { type Page, Locator } from "@playwright/test";
import nameButtons from "../utils/nameButtons";

export default class BoardPage {
    readonly page:Page
    readonly listBlock:Locator
    readonly addCardBtn:Locator
    readonly boardBtn:Locator
    readonly cardBtn: any
    readonly menuBoardBtn:Locator
    readonly optionMenuBtn:any
    readonly inputBackground:Locator
    readonly backgroundIcon: Locator
    
    constructor(page:Page) {
        this.page = page;
        this.listBlock = page.locator('div.list.js-list-content');
        this.addCardBtn = page.locator('[data-testid="list-add-card-button"]')
        this.boardBtn = page.getByTestId("view-switcher-button-text");
        this.cardBtn = (value:string) => page.getByTestId('trello-card').filter({hasText: value});
        this.menuBoardBtn = page.locator('[aria-label="Show menu"]');
        this.optionMenuBtn = (value:string) => page.getByText(value);
        this.inputBackground = page.locator('input.upload-background');
        // assertions
        this.backgroundIcon = page.locator('.background-box');
    }

    async moveList(listName1:string, listName2:string) {
        const list1 = this.listBlock.filter({hasText: listName1})
        const list2 = this.listBlock.filter({hasText: listName2})
        await this.boardBtn.waitFor();
        await list1.dragTo(list2,{timeout: 5000, targetPosition:{x:150, y:50}})
    }

    async openCard(cardName:string) {
        await this.cardBtn(cardName).first().click();
    }

    async changeBackground (filePath:string) {
        await this.menuBoardBtn.click();
        await this.optionMenuBtn(nameButtons.menuBoardBtn).click();
        await this.inputBackground.setInputFiles(filePath);
        await this.backgroundIcon.first().waitFor();
    }

}