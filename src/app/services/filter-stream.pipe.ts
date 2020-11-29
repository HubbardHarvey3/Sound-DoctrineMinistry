import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filterStream'
})
export class FilterStreamPipe implements PipeTransform {

  //Practicing / learning about customer pipes
  transform(input: any[], inputB: string) {
    // check
    console.log(inputB)
  }

}
