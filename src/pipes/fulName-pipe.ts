import { Pipe, PipeTransform } from '@angular/core';
import {DashboardTableData} from '../interfaces/dashboard-table-data';

@Pipe({
  name: 'fullName'
})
export class FulNamePipe implements PipeTransform {

  transform(value: DashboardTableData, ...args: unknown[]): string {
    return [value.firstName, value.lastName].join(' ');
  }

}
