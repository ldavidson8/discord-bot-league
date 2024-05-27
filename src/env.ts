import "dotenv/config";
import { z } from "zod";

const envScheme = z.object({
  DISCORD_TOKEN: z.string().min(1),
  CLIENT_ID: z.string().min(1),
  GUILD_ID: z.string().min(1),
});

const env = envScheme.parse(process.env);

export { env };
