import { Message, MessageEmbed } from "discord.js";
import { BotCommand } from "src/structures/BotCommand";
import commands from ".";
import { Bot } from "src/bot";

export default class HelpCommand implements BotCommand {
  bot: Bot;

  constructor(bot: Bot) {
    this.bot = bot;
  }

  isValid(msg: string) {
    const regExp = /^[$]help\b/g;

    return regExp.test(msg);
  }

  getHelp(botMessage: MessageEmbed) {
    return botMessage;
  }

  async execute(
    message: Message,
    botMessage: MessageEmbed
  ): Promise<MessageEmbed> {
    const commandArgs = message.cleanContent.split(" ");

    commands.forEach((CommandClass) => {
      const commandInstance: BotCommand = new CommandClass(this.bot);

      if (commandInstance.isValid(commandArgs[1])) {
        return commandInstance.getHelp(botMessage);
      }
    });

    return botMessage;
  }
}
