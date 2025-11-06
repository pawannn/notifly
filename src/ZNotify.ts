import { DiscordClient } from "./clients/Discord.js";
import { DiscordClientConfig } from "./types/discord.js";

export class ZNotify {
    private readonly version: string;

    constructor() {
        this.version = "1.0.0";
    }

    newDiscordClient(config: DiscordClientConfig): DiscordClient {
        return new DiscordClient(config);
    }

    getVersion(): string {
        return this.version;
    }
}

export default ZNotify;
