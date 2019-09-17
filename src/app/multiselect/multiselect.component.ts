import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.less']
})
export class MultiselectComponent implements OnInit {
  @Input() options: string[];
  @Output() update: EventEmitter<Set<string>> = new EventEmitter<Set<string>>();
  @Output() maxItems: EventEmitter<any> = new EventEmitter();
  selected: Set<string> = new Set<string>();
  @Input() searchKey: string = "";

  constructor() { }

  ngOnInit() {

  }
  toggle(option) {
    option = option.toLowerCase();
    if (this.selected.has(option)) {
      this.selected.delete(option)
    } else {
      if (this.selected.size >= 5) {
        this.maxItems.emit();
        return;
      }
      this.selected.add(option)
    }
    this.update.emit(this.selected);
  }
  matchKey(option: string) {
    if (!!this.searchKey) {
      let re = new RegExp("" + this.searchKey.toLowerCase())
      return !!option.toLowerCase().match(re);
    }
    return /^[A-Za-z0-9].*/.test(option);
  }
  removeOption(option: string) {
    this.selected.delete(option);
    this.update.emit(this.selected);
  }

}
