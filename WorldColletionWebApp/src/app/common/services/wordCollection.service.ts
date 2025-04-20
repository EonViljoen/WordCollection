import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { ApiEndpoints } from "../endpointDefinition/apiEndpoints";
import { IWord } from "../interfaces/word";

@Injectable({
    providedIn: 'root'
})

export class WordCollectionService{
    

    wordApi = ApiEndpoints.Word
    
    constructor(private http: HttpClient){}

    GET_Words(){
        this.http.get(this.wordApi.GET_Words).subscribe( res => {
            console.log(res)
        },
        (error) => {
            console.log('error : ' + error)
        })
    }

    GET_Word(id: number){
        this.http.get(this.wordApi.GET_Word(id)).subscribe( res => {
            console.log(res)
        },
        (error) => {
            console.log('error : ' + error)
        })
    }

    POST_Word(word: IWord){
        this.http.post(this.wordApi.POST_Word, word).subscribe( res => {
            console.log(res)
        },
        (error) => {
            console.log('error : ' + error)
        })
    }

    DELETE_Word(id: number){
        this.http.delete(this.wordApi.DELETE_Word(id)).subscribe( res => {
            console.log(res)
        },
        (error) => {
            console.log('error : ' + error)
        })
    }

    PUT_Word(id: number, word: IWord){
        this.http.put(this.wordApi.PUT_Word(id), word).subscribe( res => {
            console.log(res)
        },
        (error) => {
            console.log('error : ' + error)
        })
    }
}