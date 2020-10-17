import * as discord from "discord.js";
import { BotMessage } from "./BotMessage";
import CoinFlipCommand from "./commands/CoinFlip";
import GetBalanceCommand from "./commands/GetBalance";
import RegisterCommand from "./commands/Register";

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
          const CoinFlip: CoinFlipCommand = new CoinFlipCommand(this);
          const botMessage: discord.MessageEmbed = new BotMessage().get();

          const commands = [GetBalance, Register, CoinFlip];

          commands.forEach(async (command) => {
            if (command.isValid(message.cleanContent)) {
              await command.execute(message, botMessage);
              message.reply({ embed: botMessage });
            }
          });
        }
      }
    );

    this.client.login(process.env.DISCORD_BOT_TOKEN);
  }
}
