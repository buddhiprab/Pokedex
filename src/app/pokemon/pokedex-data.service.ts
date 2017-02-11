import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Pokemon } from './pokemon';

@Injectable()
export class PokedexDataService {
    private heroesUrl = 'app/heroes';  // URL to web api

    constructor(private http: Http) {}

    getPokemons(): Promise<Pokemon[]> {
        return this.http
            .get(this.heroesUrl)
            .toPromise()
            .then(response => response.json().data as Pokemon[])
    .catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
