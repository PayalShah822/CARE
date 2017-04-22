import { TestBed, inject } from '@angular/core/testing';

import { ManageRecordsService } from './manage-records.service';

describe('ManageRecordsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageRecordsService]
    });
  });

  it('should ...', inject([ManageRecordsService], (service: ManageRecordsService) => {
    expect(service).toBeTruthy();
  }));
});
