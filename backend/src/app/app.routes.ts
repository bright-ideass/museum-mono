import { Route } from '@angular/router';
import { MainLayoutComponent } from './layout/app-layout/main-layout/main-layout.component';
import { AuthGuard } from '@core/guard/auth.guard';
import { AuthLayoutComponent } from './layout/app-layout/auth-layout/auth-layout.component';
import { Page404Component } from './authentication/page404/page404.component';
import { BannerComponent } from './pages/banner/banner.component';
import { BannerTabComponent } from './pages/banner/banner-tab/banner-tab.component';
import { NewsTabComponent } from './pages/news/news-tab/news-tab.component';
import { FaqTabComponent } from './pages/faq/faq-tab/faq-tab.component';
import { LinkListComponent } from './pages/link/link-list/link-list.component';
import { LawTabComponent } from './pages/law/law-tab/law-tab.component';
import { BookListComponent } from './pages/book/book-list/book-list.component';
import { DownloadTabComponent } from './pages/download/download-tab/download-tab.component';
import { QaGameTabComponent } from './pages/game/qa-game-tab/qa-game-tab.component';
import { ExhibitListComponent } from './pages/exhibit/exhibit-list/exhibit-list.component';
import { NavigationListComponent } from './pages/navigation/navigation-list/navigation-list.component';
import { AdminLogComponent } from './pages/log/admin-log/admin-log.component';

export const APP_ROUTE: Route[] = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/authentication/signin', pathMatch: 'full' },

      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTE),
      }, {
        path: 'banner',
        component: BannerTabComponent,
        data: { breadcrumb: '首頁Banner管理' },
      }, {
        path: 'news',
        component: NewsTabComponent,
        data: { breadcrumb: '訊息公告管理' },
      }, {
        path: 'faq',
        component: FaqTabComponent,
        data: { breadcrumb: '常見問答管理' },
      }, {
        path: 'link',
        component: LinkListComponent,
        data: { breadcrumb: '網網相連管理' },
      }, {
        path: 'law',
        component: LawTabComponent,
        data: { breadcrumb: '券幣法規管理' },
      }, {
        path: 'book',
        component: BookListComponent,
        data: { breadcrumb: '出版品資訊管理' },
      }, {
        path: 'download',
        component: DownloadTabComponent,
        data: { breadcrumb: '多媒體區管理' },
      }, {
        path: 'qa-game',
        component: QaGameTabComponent,
        data: { breadcrumb: '券幣知識王管理' },
      }, {
        path: 'exhibit',
        component: ExhibitListComponent,
        data: { breadcrumb: '典藏品管理' },
      },
      {
        path: 'navigation',
        component: NavigationListComponent,
        data: { breadcrumb: '虛擬展覽管理' },
      },
      {
        path: 'logs',
        component: AdminLogComponent,
        data: { breadcrumb: 'LOG操作紀錄' },
      },
    ],
  },
  {
    path: 'authentication',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./authentication/auth.routes').then((m) => m.AUTH_ROUTE),
  },
  { path: '**', component: Page404Component },
];
