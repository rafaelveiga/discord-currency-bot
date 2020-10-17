import User from "@entities/User";
import { Message, MessageEmbed } from "discord.js";
import { Bot } from "src/bot";
import { BotCommand } from "src/structures/BotCommand";
import { getRepository, Repository } from "typeorm";

export default class CoinFlipCommand implements BotCommand {
  userRepository: Repository<User> = getRepository(User);

  constructor(bot: Bot) {}

  isValid(msg: string): boolean {
    const regExp = /[$]coin\b/g;

    return regExp.test(msg);
  }

  validateArgs(commandArgs): boolean {
    const betTotal = commandArgs[1];

    if (parseInt(betTotal) === NaN) {
      return false;
    }

    // this.userRepository.findOne({ where: })

    return true;
  }

  async execute(
    message: Message,
    botMessage: MessageEmbed
  ): Promise<MessageEmbed> {
    const commandArgs = message.cleanContent.split(" ");

    console.log(commandArgs);

    if (!this.validateArgs(commandArgs)) {
      return botMessage.setDescription(
        "Ocorreu um erro. Por favor tente novamente"
      );
    }

    return botMessage.setDescription("aoba");
  }
}
