import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Pokemon } from './pokemon';
import { PokedexDataService } from './pokedex-data.service';

@Component({
    moduleId: module.id,
    selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
    pokemons: Pokemon[];
    error: any;

    constructor(
        private router: Router,
        private pokedexDataService: PokedexDataService) { }

    getPokemons(): void {
        this.pokedexDataService
            .getPokemons()
            .then(pokemons => this.pokemons = pokemons)
            .catch(error => this.error = error);
    }
    ngOnInit(): void {
        this.getPokemons();
    }
}
