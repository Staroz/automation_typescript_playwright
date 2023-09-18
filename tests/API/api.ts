import  {type APIRequestContext}  from "@playwright/test";
import variables from "../utils/variables";
import url from "../utils/url";
import messages from "../utils/messages";

export default class Api {
    readonly request: APIRequestContext 
    constructor (request: APIRequestContext) {
        this.request = request;
    }
    async createWorkspaceApi (workspaceName: string) {
        return await this.request.post(`${url.api}/organizations/?displayName=${workspaceName}&key=${variables.key}&token=${variables.token}`);
    }

    async getWorkspaces(workspaceName:string) {
        const response =  await this.request.get(`${url.api}/members/me/organizations?key=${variables.key}&token=${variables.token}`)
        const body = await response.json();
        let workspaceId = messages.noWorkspace;
        if (body.filter(x=> x.displayName===workspaceName).length > 0) workspaceId = body.filter(x=> x.displayName===workspaceName)[0].id;
        return workspaceId;
    }
    async deleteWorkspaceApi (workspaceName:string, boardName:string) {
        const boardId = await this.getBoardId(boardName);
        if (boardId!==messages.noBoard) await this.deleteBoardApi(boardName);
        const workspaceId = await this.getWorkspaces(workspaceName);
        return await this.request.delete(`${url.api}/organizations/${workspaceId}?key=${variables.key}&token=${variables.token}`);
    }

    async createBoardApi (workspaceName:string, boardName: string) {
        await this.createWorkspaceApi(workspaceName);
        return await this.request.post(`${url.api}/boards/?name=${boardName}&key=${variables.key}&token=${variables.token}`, {data: {defaultLists: false}})
    }

    async getBoardId(boardName:string) {
        const response = await this.request.get(`${url.api}/members/me/boards?key=${variables.key}&token=${variables.token}`)
        const body = await response.json();
        let boardId = messages.noBoard;
        if (body.filter(b=> b.name == boardName).length >0) boardId = body.filter(b=> b.name == boardName)[0].id;
        return boardId;
    }

    async deleteBoardApi (boardName:string) {
        const boardId = await this.getBoardId(boardName);
        return await this.request.delete(`${url.api}/boards/${boardId}?key=${variables.key}&token=${variables.token}`)
    }
    async createListApi (workspaceName:string, boardName: string, listNameArray:string[]) {
        await this.createBoardApi(workspaceName, boardName);
        const boardId = await this.getBoardId(boardName);
        let response;
        for (let i = 0; i < listNameArray.length; i++) {
            response = await this.request.post(`${url.api}/lists?name=${listNameArray[i]}&idBoard=${boardId}&key=${variables.key}&token=${variables.token}`)
        }
        return response;
    }

    async getListId(boardName: string, listName:string) {
        const boardId = await this.getBoardId(boardName);
        const response = await this.request.get(`${url.api}/boards/${boardId}/lists?key=${variables.key}&token=${variables.token}`)
        const body = await response.json();
        let listId = messages.noList;
        if (body.filter(b=> b.name == listName).length >0) listId = body.filter(b=> b.name == listName)[0].id;
        return listId;
    }

    async createCardsApi (workspaceName:string, boardName: string, listNameArray:string[], cardsNameArray:string[]) {
        await this.createListApi(workspaceName, boardName, listNameArray);
        const listId = await this.getListId(boardName, listNameArray[2]);
        let response;
        for (let i = 0; i < cardsNameArray.length; i++) {
            response = await this.request.post(`${url.api}/cards?name=${cardsNameArray[i]}&idList=${listId}&key=${variables.key}&token=${variables.token}`)
        }
        return response;
    }
}