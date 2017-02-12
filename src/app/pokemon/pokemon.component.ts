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
    public rows:Array<any> = [];
    public columns:Array<any> = [
        {title: 'Name', name: 'ename', sort: 'asc'},
        {title: 'Id.', name: 'id', sort: ''}
    ];
  public page:number = 1;
  public itemsPerPage:number = 10;
  public maxSize:number = 5;
  public numPages:number = 1;
  public length:number = 0;

    public config:any = {
        paging: false,
        sorting: {columns: this.columns},
        filtering: {filterString: '', columnName: 'ename'}
    };

  private data:Array<any>;

    constructor(private router: Router, private pokedexDataService: PokedexDataService) {
    }

    getPokemons(): void {
        this.pokedexDataService
            .getPokemons()
            .then((pokemons) => {
                console.log(pokemons.length); // 456
                this.pokemons = pokemons;
                this.data = this.pokemons;
                this.length = this.pokemons.length;
                this.onChangeTable(this.config);
            } )
            .catch(error => this.error = error);
    }
    ngOnInit(): void {
        this.getPokemons();
    }
    public changePage(page:any, data:Array<any> = this.data):Array<any> {
        console.log(page);
        let start = (page.page - 1) * page.itemsPerPage;
        let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        return data.slice(start, end);
    }

    public changeSort(data:any, config:any):any {
        if (!config.sorting) {
            return data;
        }

        let columns = this.config.sorting.columns || [];
        let columnName:string = void 0;
        let sort:string = void 0;

        for (let i = 0; i < columns.length; i++) {
            if (columns[i].sort !== '') {
                columnName = columns[i].name;
                sort = columns[i].sort;
            }
        }

        if (!columnName) {
            return data;
        }

        // simple sorting
        return data.sort((previous:any, current:any) => {
            if (previous[columnName] > current[columnName]) {
                return sort === 'desc' ? -1 : 1;
            } else if (previous[columnName] < current[columnName]) {
                return sort === 'asc' ? -1 : 1;
            }
            return 0;
        });
    }

    public changeFilter(data:any, config:any):any {
        if (!config.filtering) {
            return data;
        }

        let filteredData:Array<any> = data.filter((item:any) =>
            item[config.filtering.columnName].match(this.config.filtering.filterString));

        return filteredData;
    }

    public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
        console.log(this.data.length+'onChangeTable');
        try {
            if (config.filtering) {
                Object.assign(this.config.filtering, config.filtering);
            }
            if (config.sorting) {
                Object.assign(this.config.sorting, config.sorting);
            }

            let filteredData = this.changeFilter(this.data, this.config);
            console.log(filteredData.length+'filteredData');

            let sortedData = this.changeSort(filteredData, this.config);
            console.log(sortedData.length+'sortedData');

            this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
            this.length = sortedData.length;
        }
        catch (e){
            console.log(e+'out of range');
        }

    }
}
