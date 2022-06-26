import { Renderer2 } from "@angular/core";
import { TextGenerator } from "./text-generator";

export class TextObject {

    private letterIndex = 0;
    private wordIndex = 0;
    private word: Element;
    private letter: Element;

    constructor(private container: Element,
        private renderer: Renderer2) {
    }

    add(text: string): void {
        let newChildren = this.parse(text);
        newChildren.forEach(child => this.renderer.appendChild(this.container, child));
    }

    nextLetter(): string {
        if (this.letterIndex + 1 > this.word.children.length - 1) {
            this.setIndex(this.wordIndex + 1, 0);
        } else {
            this.setIndex(this.wordIndex, this.letterIndex + 1);
        }

        return this.getLetter();
    }

    setIndex(wordIndex: number = 0, letterIndex: number = 0): void {       
        this.toggleWordHighlight();
        this.toggleLetterHighlight();

        this.wordIndex = wordIndex;
        this.letterIndex = letterIndex;
        this.word = this.container.children[wordIndex];
        this.letter = this.word.children[letterIndex];

        this.toggleWordHighlight();
        this.toggleLetterHighlight();

        let wordAmount = this.removeTopLine();
        this.add(TextGenerator.generateSenteces(wordAmount));
    }

    getLetter(): string {
        return this.letter?.textContent ?? "";
    }

    private toggleWordHighlight(): void {
        this.word?.classList.toggle("current-word");
    }

    private toggleLetterHighlight(): void {
        this.letter?.classList.toggle("current-letter");
    }

    private parse(text: string): HTMLSpanElement[] {
        let result: HTMLSpanElement[] = [];

        text.replace(/\s+/g, ' ').split(' ').forEach(word => {
            result.push(this.createWord(word));
            result.push(this.createWord(" "));
        });

        return result;
    }

    private createWord(word: string): HTMLSpanElement {
        let wordSpan = document.createElement("span");
        wordSpan.classList.add('word');
        word.split('').forEach(letter => {
            let letterSpan = document.createElement("span");
            letterSpan.textContent = letter;
            letterSpan.classList.add("letter");
            wordSpan.appendChild(letterSpan);
        });

        return wordSpan;
    }

    private remove(spansToDelete: HTMLSpanElement[]): void {
        spansToDelete.forEach(span => {
            this.renderer.removeChild(this.container, span);
        });
    }

    private removeTopLine(): number {
        let wordElement = this.word as HTMLElement;
        let children = [].slice.call(this.container.children);
        let spansToDelete = children.filter((s: HTMLElement) => s.offsetTop < wordElement.offsetTop);
        this.remove(spansToDelete);
        return spansToDelete.length;
    }
}