import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertionArea } from './insertion-area';

describe('InsertionArea', () => {
  let component: InsertionArea;
  let fixture: ComponentFixture<InsertionArea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertionArea]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertionArea);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
