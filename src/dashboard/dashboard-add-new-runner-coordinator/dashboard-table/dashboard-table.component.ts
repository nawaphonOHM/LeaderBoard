import { Component, effect, viewChild, inject } from '@angular/core';
import { DashboardTableData } from '../../../interfaces/dashboard-table-data';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { FullNamePipe } from '../../../pipes/full-name.pipe';
import { NgOptimizedImage } from '@angular/common';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { TimeMinSecondMilliSecondPipe } from '../../../pipes/time-min-second-milli-second.pipe';
import { DashBoardAddNewRunnerCoordinatorRadioTowerService } from '../../../services/dash-board-add-new-runner-coordinator-radio-tower.service';

@Component({
  selector: 'app-dashboard-table',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    FullNamePipe,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    NgOptimizedImage,
    MatSortHeader,
    MatSort,
    TimeMinSecondMilliSecondPipe,
    MatNoDataRow,
  ],
  templateUrl: './dashboard-table.component.html',
  styleUrl: './dashboard-table.component.scss',
})
export class DashboardTableComponent {
  protected readonly columnDefs = ['no', 'fullName', 'nationality', 'timeUsedInMillisecond'];

  protected readonly data: DashboardTableData[] = [];

  protected readonly sortedData = new MatTableDataSource(this.data);

  protected readonly matSortSignal = viewChild.required(MatSort);

  private readonly dashBoardAddNewRunnerCoordinatorRadioTower = inject(
    DashBoardAddNewRunnerCoordinatorRadioTowerService,
  );

  constructor() {
    effect(() => {
      const signal = this.dashBoardAddNewRunnerCoordinatorRadioTower.requestNewObservable();

      const dataFromSignal = signal();

      if (dataFromSignal?.state !== 'SEND_REQUEST') {
        return;
      }

      this.data.push(dataFromSignal.data as DashboardTableData);

      this.sortedData.data = this.data;
    });

    effect(() => {
      const matsort = this.matSortSignal();

      matsort.sort({
        id: 'timeUsedInMillisecond',
        start: 'asc',
        disableClear: true,
      });

      this.sortedData.sort = matsort;
    });
  }
}
