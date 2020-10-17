import * as discord from "discord.js";
import GetBalanceCommand from "./commands/GetBalance";
import { BotCommand } from "./structures/BotCommand";

export class Bot {
  private client: discord.Client;

  public start(): void {
    this.client = new discord.Client();
    this.loadCommands();
    this.registerListeners();
    this.client.login(process.env.DISCORD_BOT_TOKEN);
  }

  private registerListeners(): void {
    this.client.on("ready", () => {
      console.log("> Bot login successful");
    });

    this.client.on("message", this.onMessage);
  }

  private loadCommands(): void {}

  private onMessage(message: discord.Message): void {
    const GetBalance: GetBalanceCommand = new GetBalanceCommand(this);

    if (GetBalance.isValid(message.cleanContent)) {
      GetBalance.execute(message);
    }
  }
}
