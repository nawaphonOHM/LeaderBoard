import { InjectionToken } from '@angular/core';

export interface Configuration {
  flagUrl: string;
}

export const ConfigurationMain: Configuration = {
  flagUrl: 'https://flagsapi.com/__nationality__/flat/32.png',
};

export const CONFIGURATION = new InjectionToken<Configuration>('CONFIGURATION');
