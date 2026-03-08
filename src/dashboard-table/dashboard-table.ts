import {Component, effect, ViewChild} from '@angular/core';
import {DashboardTableData} from '../interfaces/dashboard-table-data';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {FulNamePipe} from '../pipes/fulName-pipe';
import {NgOptimizedImage} from '@angular/common';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {TimeMinSecondMilliSecondPipe} from '../pipes/time-min-second-milli-second-pipe';
import {
  DashBoardAddNewRunnerCoordinatorRadioTower
} from '../services/dash-board-add-new-runner-coordinator-radio-tower';

@Component({
  selector: 'app-dashboard-table',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    FulNamePipe,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    NgOptimizedImage,
    MatSortHeader,
    MatSort,
    TimeMinSecondMilliSecondPipe,
    MatNoDataRow
  ],
  templateUrl: './dashboard-table.html',
  styleUrl: './dashboard-table.scss'
})
export class DashboardTable {

  protected readonly columnDefs = ['no', 'fullName', 'nationality', 'timeUsedInMillisecond'];

  protected readonly data: DashboardTableData[] = [];

  protected readonly sortedData = new MatTableDataSource(this.data);

  constructor(
    readonly dashBoardAddNewRunnerCoordinatorRadioTower: DashBoardAddNewRunnerCoordinatorRadioTower) {

    effect(() => {
      const signal = dashBoardAddNewRunnerCoordinatorRadioTower.requestNewObservable();

      const dataFromSignal = signal();

      if (dataFromSignal?.state !== 'SEND_REQUEST') {
        return;
      }

      this.data.push(dataFromSignal.data as DashboardTableData);

      this.sortedData.data = this.data;
    });
  }

  @ViewChild(MatSort)
  set matSort(sort: MatSort | null) {
    if (sort === undefined || sort === null) {
      return;
    }

    this.sortedData.sort = sort;

    sort.sort({
      id: 'timeUsedInMillisecond',
      start: 'asc',
      disableClear: true
    });
  }
}
