import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from '../models/post';
import { IUserAccount } from '../models/useraccount';
import { IUpdateAccount } from '../models/updateaccount';

// Hardcode friend-list for now
export interface IFriendList{
  id: number;
  fName: string;
  lName: string;
  username: string;
}

export interface testingUser{
  username: string;
  password: string;
}

export interface INewPost{
  userID: number;
  body: string;
  img: string;
  likes: [];
}

@Injectable({
  providedIn: 'root'
})

export class AjaxService {
  user: IUserAccount = { 
    'username': '',
    'firstName': '',
    'lastName': '',
    'email': '',
    'password': '',
    'userID': 0,
    'image':''
  }

  newUser: testingUser;

  constructor(private myHttpCli: HttpClient) { }

  //////User Componment
  
  /*Getting all user*/
    getAllUser(): Observable<IUserAccount[]> {
      return this.myHttpCli.get<IUserAccount[]>('http://localhost:8080/api/userController/getAllUsers', {withCredentials: true});
    }

  /* Getting current User when Log in */
  infoRequest(): Observable<HttpResponse<IUserAccount>> {
    return this.myHttpCli.get<HttpResponse<IUserAccount>>('http://localhost:8080/api/userController/getName',
    {withCredentials: true}
      );
  }

  // Searching other user to see other user profile
  // parameter IUserInfo need to replaced after connect to back-end
   userInfoRequest(myVar: string): Observable<IUserAccount>{
    return this.myHttpCli.get<IUserAccount>(`http://localhost:8080/api/userController/getThatUser/?username=${myVar}`) ;
  } 
  
  /*  Log out method */
  logoutRequest(): Observable<HttpResponse<string>> {
    return this.myHttpCli.get<HttpResponse<string>>('http://localhost:8080/api/userController/logout', 
    {withCredentials: true});
  }

  /* Log in Method */
  testLogin(username,password):Observable<HttpResponse<string>>{
     return this.myHttpCli.post<HttpResponse<string>>('http://localhost:8080/api/userController/login',{
       username,
       password
     }, {withCredentials: true});
     
  } 

  /* Like a Post method*/
  likeAPost(post: IPost): Observable<HttpResponse<string>>{
    return this.myHttpCli.put<HttpResponse<string>>('http://localhost:8080/api/postController/likeAPost', 
    post, {withCredentials: true});
  }

    /*  Get all Post Method */
  getAllPostRequest(): Observable<IPost> {
    return this.myHttpCli.get<IPost>('http://localhost:8080/api/postController/getAllPosts', {withCredentials: true});
  }


    /* Get user Post method */
  getMyProfilePostsRequest(): Observable<IPost> {
    return this.myHttpCli.get<IPost>('http://localhost:8080/api/postController/getMyPosts',
    {withCredentials: true});
  }

    /* Get specific post */
  getUserPost(id: number): Observable<IPost>{
    return this.myHttpCli.get<IPost>(`http://localhost:8080/api/postController/getThatPostUser/?id=${id}`) ;
  } 

    /*   Create new Post   */
  createPost(myVar: IPost): Observable<string>{
    const httpPost = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.myHttpCli.post<string>('http://localhost:8080/api/postController/newPost', myVar, {withCredentials: true});
  }

  updateUserInfo(user: IUpdateAccount): Observable<IUpdateAccount>{
    const httpPost = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.myHttpCli.put<IUpdateAccount>('http://localhost:8080/api/userController/updateUser', 
    user, {withCredentials: true});
  }
      
  retrieveEmail(myVar: string): Observable<IUserAccount>{
    console.log("in retrieve email function");
    let params = new HttpParams();
    params = params.append('email', myVar);
    return this.myHttpCli.get<IUserAccount>('http://localhost:8080/api/userController/getEmail?'+params, {withCredentials: true})
  }

  resetPassword(myVar: string): Observable<IUserAccount>{
    console.log("in reset password function");
    let params = new HttpParams();
    params = params.append('password', myVar);
    return this.myHttpCli.put<IUserAccount>('http://localhost:8080/api/userController/resetPassword', myVar, {withCredentials: true})
  }

  setNewPasswordUri(): Observable<string>{
    return this.myHttpCli.get<string>('http://localhost:8080/api/userController/getEncodedUri', {withCredentials: true})
  }

  uploadProfileImg(file: File): Observable<File>{
    console.log("in ajax")
    return this.myHttpCli.post<File>('http://localhost:8080/api/userController/umploadImg', file, {withCredentials: true});
  }
}
