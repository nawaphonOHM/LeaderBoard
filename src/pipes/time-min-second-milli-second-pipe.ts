import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'timeMinSecondMilliSecond'
})
export class TimeMinSecondMilliSecondPipe implements PipeTransform {

  private readonly MILLISECONDS_IN_SECOND = 1000;
  private readonly SECOND_IN_MINUTE = 60;

  transform(value: number, ...args: unknown[]): string {

    const minutes = Math.floor(value / (this.MILLISECONDS_IN_SECOND * this.SECOND_IN_MINUTE));
    const seconds = Math.floor(value / this.MILLISECONDS_IN_SECOND);
    const milliseconds = value % this.MILLISECONDS_IN_SECOND;

    return `${minutes}.${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;
  }

}
