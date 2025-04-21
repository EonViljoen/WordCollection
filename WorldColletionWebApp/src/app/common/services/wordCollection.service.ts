import { inject, Injectable } from "@angular/core";
import { IWord } from "../interfaces/word";
import { ApiService } from "./api.service";
import { ApiEndpoints } from "../endpointDefinition/apiEndpoints";
import { HttpMethod } from "../enum/httpMethods";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class WordCollectionService{

    private apiService = inject(ApiService);

    // Get All Words
    GET_Words(): Observable<IWord[]> {
        return this.apiService.httpSubmit<IWord[]>({
          apiAction: ApiEndpoints.Word.GET_Words,
          method: HttpMethod.GET
        });
      }

    // Get Single Word
    GET_Word(id: number): Observable<IWord[]> {
        return this.apiService.httpSubmit<IWord[]>({
            apiAction: ApiEndpoints.Word.GET_Word,
            method: HttpMethod.GET,
            params : id
        });
    }

    // Create New Word
    POST_Word(word: IWord){
        this.apiService.httpSubmit({
            apiAction: ApiEndpoints.Word.POST_Word,
            method: HttpMethod.POST,
            body: word
        }).subscribe( res => {
            console.log(res);
        },
        (error) => {
            console.log('error : ' + error);
        });
    }

    // Delete Single Word
    DELETE_Word(id: number){
        this.apiService.httpSubmit({
            apiAction: ApiEndpoints.Word.DELETE_Word,
            method: HttpMethod.DELETE,
            params : id
        }).subscribe( res => {
            console.log(res);
        },
        (error) => {
            console.log('error : ' + error);
        });
    }

    // Update Single Word
    PUT_Word(id: number, word: IWord){
        this.apiService.httpSubmit({
            apiAction: ApiEndpoints.Word.PUT_Word,
            method: HttpMethod.PUT,
            params : id,
            body: word
        }).subscribe( res => {
            console.log(res);
        },
        (error) => {
            console.log('error : ' + error);
        });
    }
}