import { Injectable,signal  } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }
 searchTerm = signal<string>('');

  setSearchTerm(value: string) {
    this.searchTerm.set(value);
  }

  getSearchTerm() {
    return this.searchTerm;
  }

}
