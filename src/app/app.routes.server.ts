import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    // Authentication lives in browser localStorage, which is unavailable while
    // pre-rendering. Let the browser evaluate the auth guard and render state.
    renderMode: RenderMode.Client
  }
];
