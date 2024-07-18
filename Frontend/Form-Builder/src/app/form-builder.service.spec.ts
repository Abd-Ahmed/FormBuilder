import { TestBed } from '@angular/core/testing';

import { FormBuilderService } from '../services/form-builder.service';

describe('FormBuilderService', () => {
  let service: FormBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
export { FormBuilderService };

