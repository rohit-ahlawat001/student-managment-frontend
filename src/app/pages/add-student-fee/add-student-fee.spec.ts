import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentFee } from './add-student-fee';

describe('AddStudentFee', () => {
  let component: AddStudentFee;
  let fixture: ComponentFixture<AddStudentFee>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddStudentFee]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStudentFee);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
