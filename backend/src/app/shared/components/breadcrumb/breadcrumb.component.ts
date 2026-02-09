import { Component, Input } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import { RouterLink } from '@angular/router';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
export interface IBreadCrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  standalone: true,
  imports: [RouterLink, FeatherModule],
})

export class BreadcrumbComponent {
  public breadcrumbs!: IBreadCrumb[];


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    //constructor
    this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged(),
    ).subscribe(() => {
      this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
    });
  //console.log('breadcrumbs:', this.breadcrumbs)
  }

  buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: IBreadCrumb[] = []): IBreadCrumb[] {

    let label = route.routeConfig && route.routeConfig.data ? route.routeConfig.data['breadcrumb'] : '';

    let path = route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';

    const nextUrl = path ? `${url}/${path}` : url;

    const breadcrumb: IBreadCrumb = {
      label: label,
      url: nextUrl,
    };
    const newBreadcrumbs = breadcrumb.label ? [...breadcrumbs, breadcrumb] : [...breadcrumbs];
    if (route.firstChild) {
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }

}
