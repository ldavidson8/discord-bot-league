import { type CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder().setName("ping").setDescription("Replies with Pong!");

export async function execute(interaction: CommandInteraction) {
	const sent = await interaction.reply({ content: "Pinging...", fetchReply: true });
	interaction.editReply(
		`🏓 Pong! Latency is ${sent.createdTimestamp - interaction.createdTimestamp}ms. API Latency is ${Math.round(
			interaction.client.ws.ping,
		)}ms`,
	);
}

export default {
	data,
	execute,
};
