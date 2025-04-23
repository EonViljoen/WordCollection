import { environment } from "../../../environments/environment.development"

const baseUrl: string = environment.apiBaseUrl + environment.wordEnpoint

export const ApiEndpoints = {
    Word: {
        GET_Words: `${baseUrl}/GET_Words`,
        GET_Word: (id: number) => `${baseUrl}/GET_Word/${id}`,
        POST_Word: `${baseUrl}/POST_Word` ,
        DELETE_Word: (id: number) => `${baseUrl}/DELETE_Word/${id}`,
        PUT_Word: (id: number) => `${baseUrl}/PUT_Word/${id}`
    }
}