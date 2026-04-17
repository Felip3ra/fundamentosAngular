import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'statusClass'})

export class StatusClassPipe implements PipeTransform{
    transform(status: number) : string {
       switch(status){
        case 1:
            return 'active';
        case 2:
            return 'partial';
        case 3:
            return 'blocked';
        default:
            return '';
       }
    }

}