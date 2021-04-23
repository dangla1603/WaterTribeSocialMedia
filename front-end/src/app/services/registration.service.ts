import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class newUser{
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  constructor(private myHttpCli: HttpClient) { }

  createUser(myVar: newUser): Observable<string>{
    const httpPost = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.myHttpCli.post<string>('http://localhost:8080/api/userController/newUser', myVar, {withCredentials: true});
  }
}