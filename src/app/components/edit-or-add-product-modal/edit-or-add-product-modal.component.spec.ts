import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrAddProductModalComponent } from './edit-or-add-product-modal.component';

describe('EditOrAddProductModalComponent', () => {
  let component: EditOrAddProductModalComponent;
  let fixture: ComponentFixture<EditOrAddProductModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOrAddProductModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrAddProductModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
