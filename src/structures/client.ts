import { Client, Collection, GatewayIntentBits } from "discord.js";
import { fileURLToPath, URL } from "node:url";

import type { Command } from "./command.js";
import type { Event } from "./event.js";

export class ExtendedClient extends Client {
  private readonly commands: Collection<string, Command>;
  private readonly cooldown: Collection<string, Collection<string, number>>;
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
}
