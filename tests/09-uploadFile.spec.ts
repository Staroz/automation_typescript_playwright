import { test, expect } from '@playwright/test';
import UserPage from "./page/user.page";
import BoardPage from "./page/board.page";
import Api from "./API/api";
import CardPage from './page/card.page';
import variables from "./utils/variables";
import url from "./utils/url";

let userPage : UserPage, 
    api:Api,
    boardPage:BoardPage,
    cardPage:CardPage;

test.beforeEach(async({ page, request })=>{
    userPage = new UserPage(page);
    api = new Api(request);
    boardPage = new BoardPage(page);
    cardPage = new CardPage(page);
    
    const response = await api.createCardsApi(
                        variables.workspaceName, variables.boardName, variables.listNameArray, variables.cardsNameArray);
    expect(response.status()).toBe(200);
});

test.describe('Upload a file from local', ()=>{

    test( 'Upload a Pdf file', async ({page}) => {
        await page.goto(url.boards);
        await userPage.openBoard(variables.boardName);
        await boardPage.openCard(variables.cardsNameArray[0]);
        await cardPage.uploadFile(variables.pdfFilePath)
        await expect(cardPage.attachmentSection).toContainText(variables.pdfFileName);
    });

    test.afterEach(async ()=>{
        // delete board and Workspace
        const response = await api.deleteWorkspaceApi(variables.workspaceName, variables.boardName);
        expect(response.status()).toBe(200);
    })   
});



