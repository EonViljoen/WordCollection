import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { HttpMethod } from '../enum/httpMethods';

type WordApiAction =
  | string
  | ((...args: any[]) => string);

@Injectable({
    providedIn: 'root'
})

export class ApiService{

    private http = inject(HttpClient)
    
    httpSubmit({
            apiAction,
            method,
            body,
            params
        }:  {
            apiAction: WordApiAction;
            method: HttpMethod;
            body?: any;
            params?: any;
        })  {
        
        let url : string;

        if (typeof apiAction === 'function'){
            url = apiAction(...(params ? [params] : []))
        }else {
            url = apiAction
        }

        switch (method) {
            case 'GET' :
                return this.http.get(url);
            case 'POST' :
                return this.http.post(url, body);
            case 'DELETE' :
                return this.http.delete(url);
            case 'PUT' :
                return this.http.put(url, body);
            default :
                throw new Error('Unsupported HTTP Method');
        }
    }
}