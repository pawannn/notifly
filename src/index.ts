import ZNotify from "./ZNotify.js";
import { DiscordClient } from "./clients/Discord.js";
import * as errors from "./utils/errors.js";

const znotify = new ZNotify();

export default znotify;
export { ZNotify, DiscordClient, errors as Errors };
export type { DiscordClientConfig } from "./types/discord.js";
