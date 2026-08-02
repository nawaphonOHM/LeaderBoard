import { Pipe, PipeTransform } from '@angular/core';
import { DashboardTableData } from '../dashboard-table-data';

@Pipe({
  name: 'fullName',
})
/** Combines a runner's given and family names for table display. */
export class FullNamePipe implements PipeTransform {
  /**
   * Formats the runner's full name.
   *
   * @param value Runner data containing the name parts.
   * @returns The given name followed by the family name.
   */
  transform(value: DashboardTableData, ...args: unknown[]): string {
    return [value.firstName, value.lastName].join(' ');
  }
}
