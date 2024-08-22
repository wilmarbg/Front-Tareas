import { Injectable, inject } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  private httpClient = inject(HttpClient);
  token: any;
  headers: any;

  constructor() { }

  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  private getToken(): string {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.token || '';
  }

  async traerTareas() {
    const headers = this.getHeaders();
    return new Promise<any>((resolve, reject) => {
        return this.httpClient
            .get<any>(
                `${environment.API}/tareas`, { headers }
            )
            .subscribe((response) => {
                resolve(response);
            });
    });
  }

  async createTarea(data: any) {

    const headers = this.getHeaders();

    return new Promise<any>((resolve, reject) => {
        console.log(data);
        return this.httpClient
            .post<any>(
                `${environment.API}/tareas`,
                data, { headers }
            )
            .subscribe((response) => {
                resolve(response);
            });
    });
  }

  async changeTarea(data: any) {

    const headers = this.getHeaders();

    return new Promise<any>((resolve, reject) => {
        console.log(data);
        return this.httpClient
            .post<any>(
                `${environment.API}/tareas/completado`,
                data, { headers }
            )
            .subscribe((response) => {
                resolve(response);
            });
    });
  }

  async updateTarea(data: any) {

    const headers = this.getHeaders();

    return new Promise<any>((resolve, reject) => {
        console.log(data);
        return this.httpClient
            .patch<any>(
                `${environment.API}/tareas`,
                data, { headers }
            )
            .subscribe((response) => {
                resolve(response);
            });
    });
  }

  async changeEstadoTarea(data: any) {

    const headers = this.getHeaders();

    return new Promise<any>((resolve, reject) => {
        console.log(data);
        return this.httpClient
            .post<any>(
                `${environment.API}/tareas/estado`,
                data, { headers }
            )
            .subscribe((response) => {
                resolve(response);
            });
    });
  }

}
