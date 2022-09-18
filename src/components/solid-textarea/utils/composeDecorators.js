import { CompositeDecorator } from "draft-js";
import {highlightHash, highlightLinks, highlightPerson} from "./createHighlightDecorator";

export const detectHashtag = /(?:\s|^)(#[\w]+\b)/gi;
export const detectURL = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
export const detectPerson = /(?:\s|^)(@[\w]+\b)/gi;

export const composeDecorators = (onChangeHandler) =>
    new CompositeDecorator([
        highlightHash(detectHashtag),
        highlightLinks(detectURL),
        highlightPerson(detectPerson, onChangeHandler)
    ]);
