import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from './auth.guard';
import { ApiService } from '../../shared/services/api.service';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let apiService: ApiService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        AuthGuard,
        { provide: ApiService, useValue: { isLogged: () => true } }
      ]
    });
    guard = TestBed.inject(AuthGuard);
    apiService = TestBed.inject(ApiService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow the authenticated user to access app', () => {
    spyOn(apiService, 'isLogged').and.returnValue(true);
    expect(guard.canActivate()).toBeTrue();
  });

  it('should not allow the unauthenticated user to access app and redirect to login', () => {
    spyOn(apiService, 'isLogged').and.returnValue(false);
    const navigateSpy = spyOn(router, 'navigate');
    expect(guard.canActivate()).toBeFalse();
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
});
