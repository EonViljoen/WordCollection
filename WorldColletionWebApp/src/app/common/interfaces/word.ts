import { WordType } from "../enum/wordType";

export interface IWord {
    id: number,
    word: string,
    type: WordType
}