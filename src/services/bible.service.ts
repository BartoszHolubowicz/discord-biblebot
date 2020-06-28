import { BiblesResponse, Bible, BibleResponse, BooksResponse, Book, VerseResponse, Verse } from "../types";
import fetch from "node-fetch";

const BASE_URL = "https://api.scripture.api.bible";
const { BIBLE_API_KEY } = process.env;

const fetchOptions = {
  method: "GET",
  headers: {
    "api-key": BIBLE_API_KEY
  }
};

const UBG_ID: string = "1c9761e0230da6e0-01";

const apiGet = (url: string) =>
  fetch(`${BASE_URL}${url}`, fetchOptions)
  .then(resp => resp.json());

interface GetBiblesProps {
  language: string,
  abbreviation: string,
  name: string
}

export const getBibles = async (parameters: GetBiblesProps = {
  abbreviation: null,
  language: null,
  name: null
}) => {
  try {
    const { abbreviation, language, name } = parameters;
    const paramArray = [];
    if (!!abbreviation) paramArray.push(`abbreviation=${abbreviation}`);
    if (!!language) paramArray.push(`language=${language}`);
    if (!!name) paramArray.push(`name=${name}`);
    const searchResult: BiblesResponse = await apiGet(`/v1/bibles?${paramArray.join("&")}`);
    if (searchResult?.data) {
      const result: Bible[] = searchResult.data;
      return result;
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getBible = async (bibleId: string) => {
  try {
    const searchResult: BibleResponse = await apiGet(`/v1/bibles/${bibleId}`);
    if (searchResult?.data) {
      const result: Bible = searchResult.data;
      return result;
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getBooks = async (bibleId: string) => {
  try {
    const searchResult: BooksResponse = await apiGet(`/v1/bibles/${bibleId}/books`);
    if (searchResult?.data) {
      const result: Book[] = searchResult.data;
      return result;
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const findBook = async (bibleId: string, abbreviation: string) => {
  try {
    const books = await getBooks(bibleId);
    if (!!books) {
      const bookToFind: Book = books.find(
        (book: Book) => book.abbreviation.toLowerCase() === abbreviation.toLowerCase()
      );
      return bookToFind;
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const findVerse = async (
  bibleId: string,
  abbreviation: string,
  chapter: number,
  verse: number
) => {
  try {
    const book = await findBook(bibleId, abbreviation);
    const verseToFind: VerseResponse = await apiGet(`/v1/bibles/${bibleId}/verses/${book.id}.${chapter}.${verse}?content-type=text&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false&use-org-id=false`);
    if (verseToFind?.data) {
      const result: Verse = verseToFind.data;
      return result;
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const findVerses = async (
  bibleId: string,
  abbreviation: string,
  chapter: number,
  verseFrom: number,
  verseTo: number
) => {
  try {
    const verses: Verse[] = [];
    for (let i = verseFrom; i <= verseTo; i++) {
      const verse: Verse = await findVerse(bibleId, abbreviation, chapter, i);
      if (!!verse) verses.push(verse);
    }
    return verses;
  } catch (e) {
    console.error(e);
    return null;
  }
};