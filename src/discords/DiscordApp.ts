import * as Path from "path";

import { Discord, On, Client, CommandNotFound, ArgsOf, CommandMessage } from "@typeit/discord";

@Discord("+", {
  import: [
    Path.join(__dirname, "..", "commands", "*.ts"),
    Path.join(__dirname, "..", "commands", "*.js")
  ]
})
export class DiscordApp {
  @On("message")
  onMessage([message]: ArgsOf<"message">, client: Client) {
    
  }

  @CommandNotFound()
  notFoundA(command: CommandMessage) {
    command.reply("Command not found");
  }
}