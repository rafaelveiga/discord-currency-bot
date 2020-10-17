import { Message, MessageEmbed, User as DiscordUser } from "discord.js";
import { Bot } from "src/bot";
import User from "@entities/User";
import { BotCommand } from "src/structures/BotCommand";

export default class GetBalanceCommand implements BotCommand {
  constructor(bot: Bot) {}

  async execute(msg: Message, botMessage: MessageEmbed): Promise<MessageEmbed> {
    const discordUser: DiscordUser = msg.member.user;

    try {
      const foundUser = await User.findOneOrFail({
        where: { discordId: discordUser.id },
      });

      return botMessage.setDescription(foundUser.balance);
    } catch (e) {
      return botMessage.setDescription(
        "Usuário não encontrado. Digite $register para se cadastrar"
      );
    }
  }

  isValid(msg: string) {
    const regExp = /[$]balance\b/g;

    return regExp.test(msg);
  }
}
