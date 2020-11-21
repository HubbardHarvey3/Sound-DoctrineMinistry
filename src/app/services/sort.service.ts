import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortService {
  arrayIn: any = [1, 2, 3, 5, 4, 6, 88]
  arrayOut: any = []
  constructor() { }

  arraySort(arrayIn, arrayOut) {
    arrayOut = arrayIn.sort()
    console.log(arrayOut)
  }


}
