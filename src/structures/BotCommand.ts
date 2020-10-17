import { Bot } from "src/bot";
import { Message, MessageEmbed } from "discord.js";

export interface BotCommand {
  // init(bot: Bot): void;
  isValid(msg: string): boolean;
  execute(msg: Message, answerObject: MessageEmbed): Promise<void>;
}
