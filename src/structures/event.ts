import type { ClientEvents } from "discord.js";

export type Event<Key extends keyof ClientEvents = keyof ClientEvents> = {
	name: Key;

	once?: boolean;

	execute(...args: ClientEvents[Key]): Promise<void> | void;
};
