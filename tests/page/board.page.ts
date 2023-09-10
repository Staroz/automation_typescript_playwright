import { type Page, Locator } from "@playwright/test";

export default class Board {
    readonly page:Page
    readonly listBlock:any
    readonly addCardBtn:Locator
    readonly boardBtn:Locator
    
    constructor(page:Page) {
        this.page = page;
        this.listBlock = page.locator('div.list.js-list-content');
        this.addCardBtn = page.locator('[data-testid="list-add-card-button"]')
        this.boardBtn = page.getByTestId("view-switcher-button-text");

    }

    async moveList(listName1:string, listName2:string) {

        const list1 = this.listBlock.filter({hasText: listName1})
        const list2 = this.listBlock.filter({hasText: listName2})
        await this.boardBtn.waitFor();
        await list1.dragTo(list2,{timeout: 5000, targetPosition:{x:150, y:50}})
    }

}