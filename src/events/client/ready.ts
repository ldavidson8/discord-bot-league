import { Events } from "discord.js";

import type { Event } from "@/structures/event.js";

export default {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		console.log(`${client.user.username} is now online!`);
	},
} satisfies Event<Events.ClientReady>;
