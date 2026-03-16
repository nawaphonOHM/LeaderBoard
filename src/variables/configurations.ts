import {InjectionToken} from '@angular/core';


export interface Configuration {
  flagUrl: string
}

export const CONFIGURATION = new InjectionToken<Configuration>('CONFIGURATION', {
  providedIn: 'root',
  factory: () => ({
    flagUrl: 'https://flagsapi.com/__nationality__/flat/32.png'
  })
})
