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

  private async validateArgs(
    commandArgs,
    message: Message
  ): Promise<CoinFlipValidationResult> {
    const betTotal = parseInt(commandArgs[1], 10);
    const betSubject = parseInt(commandArgs[2], 10);

    if (isNaN(betSubject) || betSubject > 1 || betSubject < 0) {
      return { error: "Aposta não válida" };
    }

    if (isNaN(betTotal)) {
      return { error: "Valor de aposta não é um número" };
    }

    const user = await this.userRepository.findOne({
      where: { discordId: message.author.id },
    });

    if (!user) {
      return { error: "Usuário não encontrado" };
    }

    if (user.balance < betTotal) {
      return { error: "Usuário não possui saldo suficiente" };
    }

    return {
      error: null,
      parsedArguments: {
        betTotal,
        betSubject,
      },
    };
  }

  private flipCoin(): number {
    return Math.random() >= 0.5 ? 1 : 0;
  }

  private async setBalance(
    betResult: boolean,
    userId,
    parsedArguments: CoinFlipParsedArguments
  ): Promise<void> {
    const balanceChange = betResult
      ? parsedArguments.betTotal
      : -parsedArguments.betTotal;

    const userData = await this.userRepository.findOne({
      where: { discordId: userId },
    });

    await this.userRepository.update(
      { discordId: userId },
      { balance: userData.balance + balanceChange }
    );
  }

  async execute(
    message: Message,
    botMessage: MessageEmbed
  ): Promise<MessageEmbed> {
    const commandArgs = message.cleanContent.split(" ");
    const argsValidation: CoinFlipValidationResult = await this.validateArgs(
      commandArgs,
      message
    );

    // Validate arguments
    if (argsValidation.error) {
      return botMessage.setDescription(argsValidation.error);
    }

    // Flip Coin
    const flipResult = this.flipCoin();
    const betWon = flipResult === argsValidation.parsedArguments.betSubject;

    // Adjust balance
    await this.setBalance(
      betWon,
      message.author.id,
      argsValidation.parsedArguments
    );

    if (betWon) {
      return botMessage.setDescription("Bet won");
    }

    return botMessage.setDescription("betLost");
  }
}
