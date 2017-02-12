import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Pokemon } from './pokemon';

@Injectable()
export class PokedexDataService {
    private pokemonsUrl = 'app/pokemons';  // URL to web api

    constructor(private http: Http) {}

    getPokemons(): Promise<Pokemon[]> {
        return this.http
            .get(this.pokemonsUrl)
            .toPromise()
            .then(response => {
              let obs=response.json().data;
              let pokemons=[];
              obs.forEach(function(o) {
                let p=new Pokemon();
                p.name=o.ename;
                p.id=o.id;
                p.flatName=o.flatName;
                // p.thm=o.id+(o.flatName?o.flatName:o.ename)+'.png';
                p.thm='<img src="/assets/images/thm/'+(o.id+(o.flatName?o.flatName:o.ename)+'.png')+'" alt="Smiley face" height="42" width="42">';
                pokemons.push(p);
              });
              return pokemons;
            })
    .catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
