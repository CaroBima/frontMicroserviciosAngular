import { TestBed } from '@angular/core/testing';

import { ProgramasCulturaService } from './programas-cultura.service';

describe('ProgramasCulturaService', () => {
  let service: ProgramasCulturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramasCulturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
