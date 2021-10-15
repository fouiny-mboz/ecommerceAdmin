import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrAddCategoryModalComponent } from './edit-or-add-category-modal.component';

describe('EditOrAddCategoryModalComponent', () => {
  let component: EditOrAddCategoryModalComponent;
  let fixture: ComponentFixture<EditOrAddCategoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOrAddCategoryModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrAddCategoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
