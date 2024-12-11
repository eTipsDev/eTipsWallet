import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadImageUIComponent } from './upload-image-ui.component';

describe('UploadImageUIComponent', () => {
  let component: UploadImageUIComponent;
  let fixture: ComponentFixture<UploadImageUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadImageUIComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadImageUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
