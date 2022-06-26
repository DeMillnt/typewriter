export class TextGenerator {
    static generateSenteces(wordAmount: number): string {
        let res = "";
        for (let i = 0; i < wordAmount; i += 2) {
            res += this.generateWord(this.randomNumberBetween(4, 11)) + " ";
        }
        return res;
    }

    static generateWord(letterAmount: number): string {
        let res = "";
        for (let i = 0; i < letterAmount; i++) {
            res += this.getRandomLetter();
        }
        return res;
    }

    static getRandomLetter(): string {
        var characters = 'abcdefghijklmnopqrstuvwxyz';
        return characters[Math.floor(Math.random() * characters.length)];
    }

    static randomNumberBetween(min: number, max: number) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}