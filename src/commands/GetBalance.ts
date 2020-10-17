import { Message, MessageEmbed } from "discord.js";
import { Bot } from "src/bot";
import { BotCommand } from "src/structures/BotCommand";

export default class GetBalanceCommand implements BotCommand {
  constructor(bot: Bot) {}

  async execute(msg: Message, answerObj: MessageEmbed): Promise<void> {
    console.log(msg.member);
  }

  isValid(msg: string) {
    return true;
  }
}
