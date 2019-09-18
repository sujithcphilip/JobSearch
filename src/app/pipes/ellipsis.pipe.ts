import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let val = value;
    let maxLen = (args.length > 0)? args[0] : 40;
    let suffix = (args.length > 1)? args[1] : "...";
    val = val.slice(0,maxLen).trim();
    if(value.length > maxLen) {
      val += suffix
    }
    //console.log(val)
    return val;
  }

}
