import { Injectable, inject } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, firstValueFrom, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpClient = inject(HttpClient);

  constructor() { }

  async createUser(data: any) {
    return new Promise<any>((resolve, reject) => {
        console.log(data);
        return this.httpClient
            .post<any>(
                `${environment.API}/users`,
                data
            )
            .subscribe((response) => {
                resolve(response);
            });
    });
  }

  // login(email: string, password: string): Observable<any> {
  //   const obj = { email, password };
  //   console.log(obj);

  //   return this.httpClient
  //     .post<any>(
  //       `${environment.API}/users/login`,
  //       obj,
  //       { observe: 'response' } // Esto hace que obtengas la respuesta HTTP completa
  //     )
  //     .pipe(
  //       map((response: HttpResponse<any>) => {
  //         return {
  //           status: response.status,
  //           body: response.body
  //         };
  //       }),
  //       catchError((error) => {
  //         return from(Promise.resolve({
  //           status: error.status,
  //           error: error.error
  //         }));
  //       })
  //     );
  // }

  async login(email: string, password: string): Promise<any> {
    const obj = { email, password };
    console.log(obj);

    try {
      const response = await firstValueFrom(
        this.httpClient
          .post<any>(
            `${environment.API}/users/login`,
            obj,
            { observe: 'response' } // Esto hace que obtengas la respuesta HTTP completa
          )
          .pipe(
            map((response: HttpResponse<any>) => {
              return {
                status: response.status,
                body: response.body
              };
            })
          )
      );

      return response;

    } catch (error: any) {
      return {
        status: error.status,
        error: error.error
      };
    }
  }

}
