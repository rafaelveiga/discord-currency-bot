import User from "@entities/User";
import { Message, MessageEmbed, User as DiscordUser } from "discord.js";
import { Bot } from "src/bot";
import { BotCommand } from "src/structures/BotCommand";
import { getRepository } from "typeorm";

export default class RegisterCommand implements BotCommand {
  constructor(bot: Bot) {}

  isValid(msg: string): boolean {
    const regExp = /[$]register\b/g;

    return regExp.test(msg);
  }

  getHelp(botMessage: MessageEmbed) {
    const message = "Create your currency account on this server.";

    return botMessage.setDescription(message);
  }

  async execute(msg: Message, botMessage: MessageEmbed): Promise<MessageEmbed> {
    const discordUser: DiscordUser = msg.member.user;

    try {
      const userRepository = getRepository(User);

      const user = new User();

      user.balance = 50;
      user.discordId = discordUser.id;
      user.guild = msg.guild.id;

      const userSearch = await userRepository.findOne({
        where: { discordId: discordUser.id, guild: msg.guild.id },
      });

      if (userSearch) {
        return botMessage.setDescription("Usuário já cadastrado");
      }

      await userRepository.save(user);

      return botMessage.setDescription("Usuário cadastrado com sucesso");
    } catch (e) {
      console.log(e);
      return botMessage.setDescription(
        "Ocorreu um erro ao registrar o usuário"
      );
    }
  }
}
