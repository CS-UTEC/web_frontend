import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';


@Injectable({
    providedIn: 'root',
})
export class AuthService {
    static headers() {
        const headerDict = {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Authorization': 'Bearer ' + localStorage.getItem('currentUser')
        };
        const requestOptions = {
          headers: new HttpHeaders(headerDict),
        };
        return  requestOptions;
    }

    public currentUserRol(): string {
        return localStorage.getItem('currentUserRol');
    }

    public currentUrl(): string {
        return localStorage.getItem('currentUrl');
    }

    constructor(private http: HttpClient, private router: Router) { }

    login(username: string, password: string) {
        return this.http.post<any>(environment.APIEndpoint + '/token/generate-token', { username: username, password: password })
            .pipe(
                map(user => {
                // login successful if there's a jwt token in the response
                if (user.result && user.result.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', user.result.token);
                    localStorage.setItem('currentUserRol', user.result.rol);
                    localStorage.setItem('currentUrl', user.result.url);
                }

                return user.result.token;
            }
        ));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentUserRol');
        localStorage.removeItem('currentUrl');
        this.router.navigate(['/']);
    }

    getTokenExpirationDate(token: string): Date {
        let decoded = {exp: undefined};

        decoded = jwt_decode(token);

        if (decoded.exp === undefined) return null;

        const date = new Date(0); 
        date.setUTCSeconds(decoded.exp);
        console.log(date);
        return date;
    }

    isTokenExpired(token?: string): boolean {
        if(!token) token = localStorage.getItem('currentUser');
        if(!token) return true;

        const date = this.getTokenExpirationDate(token);
        if(date === undefined) return false;
        return !(date.valueOf() > new Date().valueOf());
    }

    isSuperAdmin(): boolean {
        if (this.currentUserRol() == null) {
            return false;
        }
        return this.currentUserRol() == "SUPERADMIN";
    }
}