import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../pages/models/user.model';
import { Observable } from 'rxjs/internal/Observable';
import { HttpResult } from '../pages/models/http.result';
import { UpdateUserCommand } from '../commands/user/update.user';
import { CreateUserCommand } from '../commands/user/create.user';

@Injectable({
    providedIn: 'root'
})


export class DataService {
    public url = 'https://localhost:44331/';

    constructor(private http: HttpClient) { }

    public composeHeaders(){
        return {
            headers: new HttpHeaders({'Content-Type': 'application/json'}).set('Authorization', `bearer  ""`).set('observe', 'response')
          };
    }

    updateUser(updateCommand: UpdateUserCommand, id : string | null) {

        updateCommand.id = Number(id);
        return this.http.put(`${this.url}User/UpdateUser`, JSON.stringify(updateCommand), this.composeHeaders());
    }

    createUser(user: CreateUserCommand) : Observable<HttpResult<User>>{

        return this.http.post<HttpResult<User>>(`${this.url}User/CreateUser`, JSON.stringify(user), this.composeHeaders());
    }

    getUserByEmail(email : string) : Observable<HttpResult<User>>{

        return this.http.get<HttpResult<User>>(`${this.url}User/GetByEmail`, { params: new HttpParams().set("email", JSON.stringify(email).split('"')[3])});
    }

    getUserById(id : string | null) : Observable<HttpResult<User>>{

        return this.http.get<HttpResult<User>>(`${this.url}User/GetById?id=${id}`);

    }

    deleteUser(id : string | null){

        return this.http.delete(`${this.url}User/Delete?id=${id}`, {observe: 'response'});
    }
}
