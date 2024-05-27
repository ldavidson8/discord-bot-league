import {
  Client,
  Collection,
  GatewayIntentBits,
  type Interaction,
} from "discord.js";
import { env } from "./env.js";

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
  ],
});

client.commands = new Collection();

client.once("ready", () => {
  console.log(`Ready! Logged in as ${client.user?.tag}! 🤖`);
});

client.on("interactionCreate", async (interaction: Interaction) => {
  if (!interaction.isCommand()) {
    return;
  }

  const command = client.commands.get(interaction.commandName);
  if (!command) {
    console.error(`No command found for ${interaction.commandName}`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client.login(env.DISCORD_TOKEN);
