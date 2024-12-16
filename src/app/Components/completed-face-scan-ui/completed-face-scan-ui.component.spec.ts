import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedFaceScanUiComponent } from './completed-face-scan-ui.component';

describe('CompletedFaceScanUiComponent', () => {
  let component: CompletedFaceScanUiComponent;
  let fixture: ComponentFixture<CompletedFaceScanUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompletedFaceScanUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedFaceScanUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
