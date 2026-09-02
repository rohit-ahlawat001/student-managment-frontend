import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsDetials } from './students-detials';

describe('StudentsDetials', () => {
  let component: StudentsDetials;
  let fixture: ComponentFixture<StudentsDetials>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentsDetials]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsDetials);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
