import * as discord from "discord.js";
import { BotMessage } from "./BotMessage";
import commands from "./commands";
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
          const botMessage: discord.MessageEmbed = new BotMessage().get();

          commands.forEach(async (CommandClass) => {
            const commandInstance: BotCommand = new CommandClass(this);
            if (commandInstance.isValid(message.cleanContent)) {
              await commandInstance.execute(message, botMessage);
              message.reply({ embed: botMessage });
            }
          });
        }
      }
    );

    this.client.login(process.env.DISCORD_BOT_TOKEN);
  }
}
