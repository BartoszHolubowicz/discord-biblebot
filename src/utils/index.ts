/**
 * Due to Discord's message length limit, if verses combined are too long, they
 * have to be seperated into multiple responses.
 *
 * Combines multiple strings into bigger strings that individually are not bigger
 * than the set limit.
 */
export const joinVerseTexts = (verseTexts: string[], limit: number = 2000): string[] => {
  const discordMessageLengthLimit: number = limit - 50; // minus 50, so the message can include @mention and chapter title
  const result: string[] = [];
  let buffer: string = "";
  for (const verse of verseTexts) {
    if (buffer.concat(verse).length > discordMessageLengthLimit) {
      result.push(buffer);
      buffer = verse;
    } else {
      buffer = buffer.concat(verse);
    }
  }
  result.push(buffer);
  return result;
};