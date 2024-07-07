import { TestBed } from '@angular/core/testing';

import { WfhtimetableService } from './wfhtimetable.service';

describe('WfhtimetableService', () => {
  let service: WfhtimetableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WfhtimetableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
