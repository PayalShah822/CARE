/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InputManagerService } from './input-manager.service';

describe('Service: InputManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InputManagerService]
    });
  });

  it('should ...', inject([InputManagerService], (service: InputManagerService) => {
    expect(service).toBeTruthy();
  }));
});
