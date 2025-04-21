import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { HttpMethod } from '../enum/httpMethods';
import { Observable } from 'rxjs';

type WordApiAction =
  | string
  | ((...args: any[]) => string);

@Injectable({
    providedIn: 'root'
})

export class ApiService{

    private http = inject(HttpClient)
    
    httpSubmit<T>({
            apiAction,
            method,
            body,
            params
        }:  {
            apiAction: WordApiAction;
            method: HttpMethod;
            body?: any;
            params?: any;
        }) : Observable<T> {
        
        let url : string;

        if (typeof apiAction === 'function'){
            url = apiAction(...(params ? [params] : []))
        }else {
            url = apiAction
        }

        switch (method) {
            case 'GET' :
                return this.http.get<T>(url);
            case 'POST' :
                return this.http.post<T>(url, body);
            case 'DELETE' :
                return this.http.delete<T>(url);
            case 'PUT' :
                return this.http.put<T>(url, body);
            default :
                throw new Error('Unsupported HTTP Method');
        }
    }
}