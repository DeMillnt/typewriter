import { Component, ElementRef, OnInit, QueryList, Renderer2, SecurityContext, ViewChild, ViewChildren } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TextGenerator } from './text-generator';
import { TextObject } from './text-object';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent implements OnInit {

  @ViewChild('textarea') textArea: ElementRef;
  currentLetterValue: string = "";
  textObject: TextObject;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    let text = TextGenerator.generateSenteces(1000);
    this.textObject = new TextObject(this.textArea.nativeElement, this.renderer);
    this.textObject.add(text);
    this.textObject.setIndex();
    this.currentLetterValue = this.textObject.getLetter();

    document.onkeyup = (ev) => {
      if (ev.key == this.currentLetterValue) {
        this.currentLetterValue = this.textObject.nextLetter();
      }
    }
  }
}
