import { TestBed } from '@angular/core/testing';

import { ProcessGcodeService } from './process-gcode.service';

describe('ProcessGcodeService', () => {
  let service: ProcessGcodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessGcodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
