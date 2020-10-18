import { Message, MessageEmbed } from "discord.js";
import { BotCommand } from "src/structures/BotCommand";

export default class HelpCommand implements BotCommand {
  isValid(msg: string) {
    const regExp = /[$]help\b/g;

    return regExp.test(msg);
  }

  getHelp(botMessage: MessageEmbed) {
    return botMessage;
  }

  async execute(
    message: Message,
    botMessage: MessageEmbed
  ): Promise<MessageEmbed> {
    return botMessage;
  }
}
