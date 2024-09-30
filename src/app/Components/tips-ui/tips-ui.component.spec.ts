import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipsUIComponent } from './tips-ui.component';

describe('TipsUIComponent', () => {
  let component: TipsUIComponent;
  let fixture: ComponentFixture<TipsUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipsUIComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipsUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
