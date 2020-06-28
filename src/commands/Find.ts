import { Command, CommandMessage } from "@typeit/discord";
import { performance } from "perf_hooks";
import { findVerses, findBook } from "../services/bible.service";
import { Verse, Book } from "../types";
import { joinVerseTexts } from "../utils";

const UBG_ID: string = "1c9761e0230da6e0-01";

interface FindArgs {
  abbreviation: string,
  chapter: string,
  verse: string
}

export abstract class Find {
  @Command("find :abbreviation :chapter :verse")
  async find(command: CommandMessage<FindArgs>) {
    const { abbreviation, chapter, verse } = command.args;
    const verseNumberRegex = /(\d+)(?!.*\d)/g;
    let startTime;
    let endTime;
    const verseRange = `${verse}`.split("-");
    const verseFrom = verseRange[0];
    const verseTo = verseRange.length === 2 ? verseRange[1] : verseFrom;
    startTime = performance.now();
    const book: Book = await findBook(UBG_ID, abbreviation);
    const verses: Verse[] = await findVerses(UBG_ID, abbreviation, +chapter, +verseFrom, +verseTo);
    endTime = performance.now();
    let verseTexts = verses.map((v: Verse) => v.content);
    verseTexts = joinVerseTexts(verseTexts);
    verseTexts = verseTexts.map((text: string) => text.replace(/[\[\]]/g, "`"));
    for (const text of verseTexts) {
      const verseNumbers: string[] = text.match(verseNumberRegex);
      if (verseNumbers.length > 1)
        command.reply(`**${book.name} ${chapter}:${verseNumbers[0]}-${verseNumbers[verseNumbers.length - 1]}**\n${text}`);
      else if (verseNumbers.length === 1)
        command.reply(`**${book.name} ${chapter}:${verseNumbers[0]}**\n${text}`);
      else
        command.reply("Verses not found");
    }
    command.reply(`*verses found in ${Math.floor(endTime - startTime) / 1000} seconds*`);
  }
}