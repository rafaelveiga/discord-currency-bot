import { rejects } from "assert";
import * as discord from "discord.js";
import { resolve } from "path";
import { BotMessage } from "./BotMessage";
import GetBalanceCommand from "./commands/GetBalance";
import RegisterCommand from "./commands/Register";
import { BotCommand } from "./structures/BotCommand";

export class Bot {
  private client: discord.Client;
  public botId: string = null;

  public async start(): Promise<void> {
    this.client = new discord.Client();

    this.client.on("ready", () => {
      this.botId = this.client.user.id;
      console.log("> Bot login");
    });

    this.client.on(
      "message",
      async (message: discord.Message): Promise<void> => {
        if (message.author.id !== this.botId) {
          const GetBalance: GetBalanceCommand = new GetBalanceCommand(this);
          const Register: RegisterCommand = new RegisterCommand(this);
          const botMessage: discord.MessageEmbed = new BotMessage().get();

          if (GetBalance.isValid(message.cleanContent)) {
            await GetBalance.execute(message, botMessage);
            message.reply({ embed: botMessage });
          }

          if (Register.isValid(message.cleanContent)) {
            await Register.execute(message, botMessage);
            message.reply({ embed: botMessage });
          }
        }
      }
    );

    this.client.login(process.env.DISCORD_BOT_TOKEN);
  }
}
