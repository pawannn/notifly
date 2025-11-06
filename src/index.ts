import logping from "./logping";
import { DiscordClient } from "./clients/Discord";
import * as errors from "./utils/errors";

const lgfy = new logping();

export default lgfy;
export { logping, DiscordClient, errors as Errors };
export type { DiscordClientConfig } from "./types/discord";
