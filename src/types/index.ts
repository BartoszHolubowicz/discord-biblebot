export interface Bible {
  id: string,
  dblId: string,
  abbreviation: string,
  abbreviationLocal: string,
  language: Language,
  countries: Country[],
  name: string,
  nameLocal: string,
  description: string,
  descriptionLocal: string,
  relatedDbl: string,
  type: string,
  updatedAt: string,
  audioBibles: AudioBible[]
}

export interface Language {
  id: string,
  name: string,
  nameLocal: string,
  script: string,
  scriptDirection: string
}

export interface Country {
  id: string,
  name: string,
  nameLocal: string
}

export interface AudioBible {
  id: string,
  name: string,
  nameLocal: string,
  description: string,
  descriptionLocal: string
}

export interface Book {
  id: string,
  bibleId: string,
  abbreviation: string,
  name: string,
  nameLong: string,
  chapters: Chapter[]
}

export interface Chapter {
  id: string,
  bibleId: string,
  bookId: string,
  number: string,
  position: number
}

export interface Verse {
  id: string,
  orgId: string,
  bibleId: string,
  bookId: string,
  chapterId: string,
  content: string,
  reference: string,
  copyright: string,
  next: PreviousOrNextVerse,
  previous: PreviousOrNextVerse
}

interface PreviousOrNextVerse {
  id: string,
  number: string
}

export interface BiblesResponse {
  data: Bible[]
}

export interface BibleResponse {
  data: Bible
}

export interface BooksResponse {
  data: Book[]
}

export interface VerseResponse {
  data: Verse
}