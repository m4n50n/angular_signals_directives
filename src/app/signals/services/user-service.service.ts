import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { SingleUserReponse, User } from '../interfaces/user-request.interface';

@Injectable({
    providedIn: 'root'
})
export class UsersServiceService {
    // Inyectar las dependencias de esta forma también hace que podamos diferenciar mejor qué es una dependencia (aunque termina siendo una propiedad igualmente) y qué una propiedad, ya que en el constructor se pueden mezclar las dos
    private http = inject(HttpClient);
    private baseUrl = 'https://reqres.in/api/users';

    getUserById(id: number): Observable<User> {
        return this.http.get<SingleUserReponse>(`${this.baseUrl}/${id}`)
            .pipe(
                map(response => response.data),
                tap(console.log),
            );
    }
}
