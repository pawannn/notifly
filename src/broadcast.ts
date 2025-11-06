import { PlatformClient } from "./types/broadcast";
import {
    BroadcastResult,
    BroadcastSummary,
    EmbedOptions,
    TestConnectionResult,
} from "./types/broadcast";

interface ClientEntry {
    client: PlatformClient;
    alias: string;
    platform: string;
}

export class BroadcastGroup {
    private name: string;
    private clients: ClientEntry[] = [];

    constructor(name: string, clients: PlatformClient[] = []) {
        this.name = name;
        clients.forEach((client) => this.addClient(client));
    }

    addClient(client: PlatformClient, alias?: string): this {
        if (!client || typeof client.send !== "function") {
            throw new Error("Invalid client: must have a send() method");
        }

        this.clients.push({
            client,
            alias: alias || `client_${this.clients.length + 1}`,
            platform: client.constructor.name.replace("Client", "").toLowerCase(),
        });

        return this;
    }

    removeClient(alias: string): boolean {
        const index = this.clients.findIndex((c) => c.alias === alias);
        if (index !== -1) {
            this.clients.splice(index, 1);
            return true;
        }
        return false;
    }

    async broadcast(
        message: string | object,
        options: Record<string, any> = {}
    ): Promise<BroadcastSummary> {
        const results: Record<string, BroadcastResult> = {};

        const promises = this.clients.map(async ({ client, alias, platform }) => {
            try {
                const result = await client.send(message, options);
                results[alias] = { success: true, platform, result };
            } catch (error: any) {
                results[alias] = {
                    success: false,
                    platform,
                    error: error.message,
                };
            }
        });

        await Promise.allSettled(promises);

        return {
            groupName: this.name,
            totalClients: this.clients.length,
            results,
        };
    }

    async broadcastEmbed(embedOptions: EmbedOptions): Promise<BroadcastSummary> {
        const results: Record<string, BroadcastResult> = {};

        const promises = this.clients.map(async ({ client, alias, platform }) => {
            try {
                if (typeof client.sendEmbed === "function") {
                    const result = await client.sendEmbed(embedOptions);
                    results[alias] = { success: true, platform, result };
                } else {
                    const message = `**${embedOptions.title}**\n${embedOptions.description}`;
                    const result = await client.send(message);
                    results[alias] = {
                        success: true,
                        platform,
                        result,
                        note: "Embed not supported, sent as text",
                    };
                }
            } catch (error: any) {
                results[alias] = {
                    success: false,
                    platform,
                    error: error.message,
                };
            }
        });

        await Promise.allSettled(promises);

        return {
            groupName: this.name,
            totalClients: this.clients.length,
            results,
        };
    }

    async broadcastSuccess(title: string, description: string) {
        return this.broadcastEmbed({
            title: `✅ ${title}`,
            description,
            color: 0x00ff00,
        });
    }

    async broadcastError(title: string, description: string) {
        return this.broadcastEmbed({
            title: `❌ ${title}`,
            description,
            color: 0xff0000,
        });
    }

    async broadcastWarning(title: string, description: string) {
        return this.broadcastEmbed({
            title: `⚠️ ${title}`,
            description,
            color: 0xffff00,
        });
    }

    async broadcastInfo(title: string, description: string) {
        return this.broadcastEmbed({
            title: `ℹ️ ${title}`,
            description,
            color: 0x3498db,
        });
    }

    listClients() {
        return this.clients.map(({ alias, platform }) => ({
            alias,
            platform,
        }));
    }

    size(): number {
        return this.clients.length;
    }

    async testConnections(): Promise<Record<string, TestConnectionResult>> {
        const results: Record<string, TestConnectionResult> = {};

        const promises = this.clients.map(async ({ client, alias, platform }) => {
            try {
                const connected =
                    typeof client.testConnection === "function"
                        ? await client.testConnection()
                        : await client.send("Test").then(() => true).catch(() => false);

                results[alias] = { platform, connected };
            } catch (error: any) {
                results[alias] = { platform, connected: false, error: error.message };
            }
        });

        await Promise.allSettled(promises);
        return results;
    }
}
