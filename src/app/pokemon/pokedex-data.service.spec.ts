/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PokedexDataService } from './pokedex-data.service';

describe('PokedexDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PokedexDataService]
    });
  });

  it('should ...', inject([PokedexDataService], (service: PokedexDataService) => {
    expect(service).toBeTruthy();
  }));
});
