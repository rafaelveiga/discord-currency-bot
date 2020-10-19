import { Message, MessageEmbed } from "discord.js";
import { BotCommand } from "src/structures/BotCommand";
import User from "@entities/User";
import { getRepository, Repository } from "typeorm";

export default class LeaderboardCommand implements BotCommand {
  userRepository: Repository<User> = getRepository(User);

  isValid(msg: string): boolean {
    const regExp = /^[$]leaderboard/g;

    return regExp.test(msg);
  }

  getHelp(botMessage: MessageEmbed) {
    return botMessage;
  }

  async execute(
    message: Message,
    botMessage: MessageEmbed
  ): Promise<MessageEmbed> {
    const users = await this.userRepository.find({
      where: { guild: message.guild.id },
      order: { balance: "DESC" },
      take: 5,
    });

    return botMessage
      .setTitle("Leaderboard")
      .setColor("#059cdd")
      .setDescription("Top 5")
      .setFooter("Discord Currency Bot")
      .addFields(
        users.map((user, index) => ({
          name: message.guild.members.cache
            .filter((member) => member.user.id === user.discordId)
            .reduce((prev, curr) => `${index + 1}. ${curr.user.username}`, ""),
          value: `$${user.balance}`,
        }))
      );
  }
}
