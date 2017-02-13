import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Pokemon } from './pokemon';
import {PokemonSkill} from './pokemon-skill';

@Injectable()
export class PokedexDataService {
    private pokemonsUrl = 'app/pokemons';  // URL to web api
    private skillsUrl = 'app/pokemon_skills';  // URL to web api

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
                p.imgN=(o.id+(o.flatName?o.flatName:o.ename)+'.png');
                // p.thm=o.id+(o.flatName?o.flatName:o.ename)+'.png';
                p.thm='<img src="/assets/images/thm/'+(o.id+(o.flatName?o.flatName:o.ename)+'.png')+'" alt="Smiley face" height="42" width="42">';
                let bArr=[];
                bArr.push({n:"Attack",v:o.base.Attack});
                bArr.push({n:"Defense",v:o.base.Defense});
                bArr.push({n:"HP",v:o.base.HP});
                bArr.push({n:"Sp.Atk",v:o.base["Sp.Atk"]});
                bArr.push({n:"Sp.Def",v:o.base["Sp.Def"]});
                bArr.push({n:"Speed",v:o.base["Speed"]});
                p.base=bArr;
                p.types=o.type;
                p.typesConcat=o.type.join();
                p.skills=o.skills;
                pokemons.push(p);
              });
              return pokemons;
            })
    .catch(this.handleError);
    }
  getSkills(): Promise<PokemonSkill[]> {
    return this.http
      .get(this.skillsUrl)
      .toPromise()
      .then(response => {
        let obs=response.json().data;
        let skills=[];
        obs.forEach(function(o) {
          let p=new PokemonSkill();
          p.ename=o.ename;
          p.id=o.id;
          p.type=o.type;
          p.accuracy=o.accuracy;
          p.pp=o.pp;
          p.power=o.power;
          skills.push(p);
        });
        return skills;
      })
      .catch(this.handleError);
  }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
