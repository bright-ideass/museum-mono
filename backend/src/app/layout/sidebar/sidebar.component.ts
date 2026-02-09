import { Router, NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';
import { DOCUMENT, NgClass } from '@angular/common';
import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  Renderer2,
  HostListener,
  OnDestroy,
  SecurityContext,
} from '@angular/core';
import { AuthService } from '@core';
import { RouteInfo } from './sidebar.metadata';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { NgScrollbar } from 'ngx-scrollbar';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [
    NgScrollbar,
    MatButtonModule,
    RouterLink,
    MatTooltipModule,
    RouterLinkActive,
    NgClass,
  ],
})
export class SidebarComponent extends UnsubscribeOnDestroyAdapter implements OnInit, OnDestroy {
  public sidebarItems!: RouteInfo[];
  public innerHeight?: number;
  public bodyTag!: HTMLElement;
  listMaxHeight?: string;
  listMaxWidth?: string;
  userFullName?: string;
  userImg?: string;
  userType?: string;
  headerHeight = 60;
  currentRoute?: string;
  isLoading = false;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private authService: AuthService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    super();
    this.subs.sink = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // close sidebar on mobile screen after menu select
        this.renderer.removeClass(this.document.body, 'overlay-open');
      }
    });
  }
  @HostListener('window:resize', ['$event'])
  windowResizecall() {
    this.setMenuHeight();
    this.checkStatuForResize(false);
  }
  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.renderer.removeClass(this.document.body, 'overlay-open');
    }
  }

  callToggleMenu(event: Event, length: number) {
    if (length > 0) {
      const parentElement = (event.target as HTMLInputElement).closest('li');
      if (parentElement) {
        const sanitizedClassName: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(parentElement.className);
        const activeClass = sanitizedClassName.toString().includes('active');
        // const activeClass = parentElement.classList.contains('active'); Fix XSS
        if (activeClass) {
          const sanitizedActiveClass = this.sanitizer.sanitize(SecurityContext.NONE, 'active') || '';
          this.renderer.removeClass(parentElement, sanitizedActiveClass);

          // this.renderer.removeClass(parentElement, 'active');
        } else {
          if (activeClass) {
            const sanitizedActiveClass = this.sanitizer.sanitize(SecurityContext.NONE, 'active') || '';
            this.renderer.addClass(parentElement, sanitizedActiveClass);
            // this.renderer.addClass(parentElement, 'active');
          }
        }
      }
    }
  }

  ngOnInit() {
    /*
    if (this.authService.currentUserValue) {
      this.sidebarItems = ROUTES.filter((sidebarItem) => sidebarItem);
    }*/
    if (this.authService.isLoggedIn()) {
      console.log('己登入')
    } else {
      console.log('未登入')
      this.authService.logout();
    }

    const page: any[] = [];
    let admin = this.authService.currentAdminValue;

    this.authService.cbcGetMenus().subscribe(res => {

      res.forEach(element => {
        let a: any = {};
        a['path'] = element.Link;
        a['title'] = element.Name;
        a['moduleName'] = 'advance-table';
        a['iconType'] = 'material-icons-two-tone';
        a['icon'] = '';
        a['class'] = '';
        a['groupTitle'] = false;
        a['badge'] = '';
        a['badgeClass'] = '';
        a['submenu'] = [];
        page.push(a)
      });
      this.isLoading = true
      this.sidebarItems = page;
    })


    this.initLeftSidebar();
    this.bodyTag = this.document.body;
  }
  initLeftSidebar() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this;
    // Set menu height
    _this.setMenuHeight();
    _this.checkStatuForResize(true);
  }
  setMenuHeight() {
    this.innerHeight = window.innerHeight;
    const height = this.innerHeight - this.headerHeight;
    this.listMaxHeight = height + '';
    this.listMaxWidth = '500px';
  }
  isOpen() {
    return this.bodyTag.classList.contains('overlay-open');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  checkStatuForResize(firstTime: boolean) {
    if (window.innerWidth < 1025) {
      this.renderer.addClass(this.document.body, 'ls-closed');
    } else {
      this.renderer.removeClass(this.document.body, 'ls-closed');
    }
  }
  mouseHover() {
    const body = this.elementRef.nativeElement.closest('body');
    if (body.classList.contains('submenu-closed')) {
      this.renderer.addClass(this.document.body, 'side-closed-hover');
      this.renderer.removeClass(this.document.body, 'submenu-closed');
    }
  }
  mouseOut() {
    const body = this.elementRef.nativeElement.closest('body');
    if (body.classList.contains('side-closed-hover')) {
      this.renderer.removeClass(this.document.body, 'side-closed-hover');
      this.renderer.addClass(this.document.body, 'submenu-closed');
    }
  }

  sanitizeClassName(className: string): string {
    return className.replace(/[^a-zA-Z0-9\-_]/g, '');
  }
}
