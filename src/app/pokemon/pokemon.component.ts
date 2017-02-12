import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Pokemon} from './pokemon';
import {PokedexDataService} from './pokedex-data.service';

@Component({
  moduleId: module.id,
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  pokemon: Pokemon=new Pokemon;
  private pokemons: Pokemon[];
  error: any;
  public rows: Array<any> = [];
  public columns: Array<any> = [
    {title: 'Name', name: 'name', sort: 'asc', filtering: {filterString: '', placeholder: 'Filter by Name'}},
    {title: 'ID.', name: 'id', sort: '',filtering: {filterString: '', placeholder: 'Filter by ID'}},
    {title: 'Theme', name: 'thm', sort: ''}
  ];
  public page: number = 1;
  public itemsPerPage: number = 10;
  public maxSize: number = 5;
  public numPages: number = 1;
  public length: number = 0;

  public config: any = {
    paging: false,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered']
  };


  constructor(private router: Router, private pokedexDataService: PokedexDataService) {
  }

  getPokemons(): void {
    this.pokedexDataService
      .getPokemons()
      .then((pokemons) => {
        console.log(pokemons.length); // 456
        this.pokemons = pokemons;
        this.length = pokemons.length;
        this.onChangeTable(this.config);
        this.pokemon=pokemons[0];
      })
      .catch(error => this.error = error);
  }

  ngOnInit(): void {
    this.getPokemons();
  }

  public changePage(page: any, pokemons: Array<any> = this.pokemons): Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : pokemons.length;
    return pokemons.slice(start, end);
  }

  public changeSort(pokemons: any, config: any): any {
    if (!config.sorting) {
      return pokemons;
    }

    let columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return pokemons;
    }

    // simple sorting
    return pokemons.sort((previous: any, current: any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(pokemons: any, config: any): any {
    let filteredData: Array<any> = pokemons;
    this.columns.forEach((column: any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item: any) => {
          return item[column.name].toLowerCase().match(column.filtering.filterString.toLowerCase());
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item: any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    let tempArray: Array<any> = [];
    filteredData.forEach((item: any) => {
      let flag = false;
      this.columns.forEach((column: any) => {
        if (item[column.name].toString().toLowerCase().match(this.config.filtering.filterString.toLowerCase())) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config: any, page: any = {page: this.page, itemsPerPage: this.itemsPerPage}): any {
    try {
      if (config.filtering) {
        Object.assign(this.config.filtering, config.filtering);
      }

      if (config.sorting) {
        Object.assign(this.config.sorting, config.sorting);
      }

      let filteredData = this.changeFilter(this.pokemons, this.config);
      let sortedData = this.changeSort(filteredData, this.config);
      this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
      this.length = sortedData.length;
    }
    catch(err) {
      console.dir(err);
    }
  }
}
