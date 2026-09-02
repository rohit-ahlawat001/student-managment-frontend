// src/app/app.config.ts
import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core'; // <-- Import Zoneless provider
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // 1. Explicitly enable Zoneless mode
    provideZonelessChangeDetection(), 
    
    // 2. Keep your routing and HTTP client
    provideRouter(routes),
    provideHttpClient(withFetch()) 
  ]
};