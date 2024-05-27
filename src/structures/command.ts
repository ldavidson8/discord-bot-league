import type {
  CommandInteraction,
  PermissionResolvable,
  RESTPostAPIApplicationCommandsJSONBody,
  RESTPostAPIApplicationGuildCommandsJSONBody,
} from "discord.js";

interface CustomOptions {
  userPermissions?: PermissionResolvable[];
  botPermissions?: PermissionResolvable[];
  category?: string;
  cooldown?: number;
}

export type Command = {
  data:
    | RESTPostAPIApplicationCommandsJSONBody
    | RESTPostAPIApplicationGuildCommandsJSONBody;

  opt?: CustomOptions;

  execute(interaction: CommandInteraction): Promise<void> | void;
};
