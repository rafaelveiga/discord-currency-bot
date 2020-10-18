import { Message, MessageEmbed } from "discord.js";

export interface BotCommand {
  isValid(msg: string): boolean;
  execute(msg: Message, botMessage: MessageEmbed): Promise<MessageEmbed>;
  getHelp(botMessage: MessageEmbed): MessageEmbed;
}
