import { Injectable, signal } from '@angular/core';
import { InConfiguration } from '../core/models/config.interface';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public configData!: InConfiguration;
  private http: HttpClient;
  configuration = signal<AppConfig | undefined>(undefined);


  constructor(private readonly httpHandler: HttpBackend) {
    this.http = new HttpClient(this.httpHandler);
    this.setConfigData();
  }

  setConfig() {
    return this.http.get<AppConfig>('assets/data/app-config.json').pipe(tap(config => this.configuration.set(config)));
  }

  setConfigData() {
    this.configData = {
      layout: {
        rtl: false, // options:  true & false
        variant: 'light', // options:  light & dark
        theme_color: 'white', // options:  white, black, purple, blue, cyan, green, orange
        logo_bg_color: 'white', // options:  white, black, purple, blue, cyan, green, orange
        sidebar: {
          collapsed: false, // options:  true & false
          backgroundColor: 'light', // options:  light & dark
        },
      },
    };
  }
}

export interface AppConfig {
  API_URL: string;
  FRONT: string;
  TEST_MODE: boolean;
  CBC_LOGIN: string;
  CBC_MENUS: string;
  CBC_ADMIN_LOGS: string;
  EXHIBITS_IMG: string;
}

