import { Command, CommandMessage } from "@typeit/discord";
import { findVerses } from "../services/bible.service";
import { Verse } from "../types";

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
    const verseRange = `${verse}`.split("-");
    const verseFrom = verseRange[0];
    const verseTo = verseRange.length === 2 ? verseRange[1] : verseFrom;
    findVerses(UBG_ID, abbreviation, +chapter, +verseFrom, +verseTo)
    .then((resp: Verse[]) => command.reply(
      resp
      .map((v: Verse) => v.content)
      .join("")
    ));
  }
}