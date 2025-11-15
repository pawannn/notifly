import logifly from "./logifly";
import { DiscordClient } from "./clients/Discord";
import { SlackClient } from "./clients/Slack";
import * as errors from "./utils/errors";

const lgfy = new logifly();

export default lgfy;
export { logifly, SlackClient, DiscordClient, errors as Errors };
export type { DiscordClientConfig } from "./types/discord";
export type { SlackClientConfig } from "./types/slack";
