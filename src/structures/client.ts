import { Client, Collection, GatewayIntentBits } from "discord.js";
import { fileURLToPath, URL } from "node:url";

import type { Command } from "./command.js";
import type { Event } from "./event.js";
import { loadStructures } from "../misc/util.js";
import { env } from "@/env.js";

export class ExtendedClient extends Client {
	commands: Collection<string, Command>;
	cooldown: Collection<string, Collection<string, number>>;
	constructor() {
		super({
			intents: [GatewayIntentBits.Guilds],
			failIfNotExists: false,
			rest: {
				retries: 3,
				timeout: 15_000,
			},
		});
		this.commands = new Collection<string, Command>();
		this.cooldown = new Collection<string, Collection<string, number>>();
	}

	private async loadModules() {
		// Command handling
		const commandFolderPath = fileURLToPath(new URL("../commands", import.meta.url));
		const commandFiles: Command[] = await loadStructures(commandFolderPath, ["data", "execute"]);
		for (const command of commandFiles) {
			this.commands.set(command.data.name, command);
		}

		// Event handling
		const eventFolderPath = fileURLToPath(new URL("../events", import.meta.url));
		const eventFiles: Event[] = await loadStructures(eventFolderPath, ["name", "execute"]);
		for (const event of eventFiles) {
			this[event.once ? "once" : "on"](event.name, async (...args) => event.execute(...args));
		}
	}

	start() {
		this.loadModules();
		this.login(env.DISCORD_TOKEN);
	}
}
