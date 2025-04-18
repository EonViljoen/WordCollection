import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class WordCollectionService{
    
    url: string = environment.apiBaseUrl + environment.wordEnpoint
    
    constructor(private http: HttpClient){}

    GETDefaultWord(){
        this.http.get(this.url).subscribe( 
            res => {
            console.log(res)},
        (error) => {
            console.log('error ', error)
        })
    }
}