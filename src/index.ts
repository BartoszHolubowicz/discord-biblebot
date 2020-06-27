import { Client } from "@typeit/discord";

// Environment variables
const { CLIENT_KEY } = process.env;

export class Main {
  private static _client: Client;

  static get Client(): Client {
    return this._client;
  }

  static start() {
    this._client = new Client();

    this._client.login(
      CLIENT_KEY,
      `${__dirname}/discords/*.ts`,
      `${__dirname}/discords/*.js`
    );

    console.log("App commands:", Client.getCommands());
  }
}

Main.start();