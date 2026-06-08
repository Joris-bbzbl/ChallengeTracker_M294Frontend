import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { AppAuthService } from '../services/app-auth.service';
import { Role } from '../app.roles';

@Directive({
  selector: '[appIsInRole]',
  standalone: true,
})
export class IsInRoleDirective implements OnInit {
  @Input() appIsInRole!: Role | Role[];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AppAuthService,
  ) {}

  ngOnInit(): void {
    this.updateView();
    this.authService.onLoginStatusChanged().subscribe(() => this.updateView());
  }

  private updateView(): void {
    const roles = Array.isArray(this.appIsInRole) ? this.appIsInRole : [this.appIsInRole];
    const hasRole = roles.some((role) => this.authService.hasRole(role));

    if (hasRole) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
