import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sidenavbar } from './sidenavbar';

describe('Sidenavbar', () => {
  let component: Sidenavbar;
  let fixture: ComponentFixture<Sidenavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sidenavbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sidenavbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
