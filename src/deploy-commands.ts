import {
	REST,
	Routes,
	type RESTPostAPIApplicationCommandsJSONBody,
	type RESTPostAPIApplicationGuildCommandsJSONBody,
	type RESTPutAPIApplicationCommandsJSONBody,
	type RESTPutAPIApplicationGuildCommandsJSONBody,
} from "discord.js";
import { env } from "./env.js";
import { fileURLToPath } from "node:url";
import type { Command } from "./structures/command.js";
import { loadStructures } from "./misc/util.js";

const commands: RESTPostAPIApplicationCommandsJSONBody[] | RESTPostAPIApplicationGuildCommandsJSONBody[] = [];

const commandFolderPath = fileURLToPath(new URL("commands", import.meta.url));
const commandFiles: Command[] = await loadStructures(commandFolderPath, ["data", "execute"]);
for (const command of commandFiles) {
	console.log(command);
	commands.push(command.data);
}

const rest = new REST().setToken(env.DISCORD_TOKEN);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		let data: RESTPutAPIApplicationCommandsJSONBody[] | RESTPutAPIApplicationGuildCommandsJSONBody[] = [];

		if (env.GUILD_ID) {
			data = (await rest.put(Routes.applicationGuildCommands(env.CLIENT_ID, env.GUILD_ID), {
				body: commands,
			})) as RESTPutAPIApplicationGuildCommandsJSONBody[];
		} else {
			data = (await rest.put(Routes.applicationCommands(env.CLIENT_ID), {
				body: commands,
			})) as RESTPutAPIApplicationCommandsJSONBody[];
		}

		console.log(
			`Successfully reloaded ${data.length} application (/) commands ${
				env.GUILD_ID ? `in guild ${env.GUILD_ID}` : ""
			}.`,
		);
	} catch (error) {
		console.error(error);
	}
})();
