import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemPopup } from './add-item-popup';

describe('AddItemPopup', () => {
  let component: AddItemPopup;
  let fixture: ComponentFixture<AddItemPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddItemPopup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddItemPopup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
