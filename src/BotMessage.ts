import { MessageEmbed } from "discord.js";

export class BotMessage {
  public richEmbed: MessageEmbed;

  constructor() {
    this.richEmbed = new MessageEmbed();
  }

  get(): MessageEmbed {
    return this.richEmbed;
  }
}
