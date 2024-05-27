import { REST, Routes } from "discord.js";
import { env } from "./env.js";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const commands: any[] = [];
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const commandFile of commandFiles) {
  const command = await import(`./commands/${commandFile}`);
  commands.push(command.data);
}

// Construct and prepare instance of REST module
const rest = new REST().setToken(env.DISCORD_TOKEN);

// deploy commands
(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(
      Routes.applicationGuildCommands(env.CLIENT_ID, env.GUILD_ID),
      {
        body: commands,
      }
    );

    console.log(
      `Successfully reloaded ${commands.length} application commands.`
    );
  } catch (error) {
    console.error(error);
  }
})();
