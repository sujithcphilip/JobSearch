import { TestBed } from '@angular/core/testing';

import { ApisService } from './apis.service';
import { HttpClientModule } from '@angular/common/http';

describe('ApisService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: ApisService = TestBed.get(ApisService);
    expect(service).toBeTruthy();
  });
});
