import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { canLoadLoginGuard } from './can-load-login.guard';

describe('canLoadLoginGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canLoadLoginGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
