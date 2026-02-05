import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should update value when input changes', () => {
    component.onInput('test');
    expect(component.value()).toBe('test');
    expect(component.hasValue()).toBe(true);
  });

  it('should clear value when clear is called', () => {
    component.onInput('something');
    component.clear();
    expect(component.value()).toBe('');
    expect(component.hasValue()).toBe(false);
  });
});
