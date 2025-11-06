import { DiscordClient } from "../src/clients/Discord";
import { ConfigurationError, MessageSendError } from "../src/utils/errors";

global.fetch = jest.fn() as jest.Mock;

describe("DiscordClient", () => {
    const validConfig = {
        webhookUrl: "https://discord.com/api/webhooks/12334545491990515726/hasdasdacasdfeacadcadc",
    };

    beforeEach(() => {
        jest.clearAllMocks();
        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => ({}),
        });
    });

    describe("Constructor and Configuration", () => {
        test("creates client with valid config", () => {
            const client = new DiscordClient(validConfig);
            expect(client.config.webhookUrl).toBe(validConfig.webhookUrl);
            expect(client.config.username).toBe("ZNotify Bot");
            expect(client.config.defaultColor).toBe(0x3498db);
        });

        test("throws error for missing webhook URL", () => {
            expect(() => new DiscordClient({} as any)).toThrow(ConfigurationError);
            expect(() => new DiscordClient({} as any)).toThrow(
                "Discord configuration missing required fields: webhookUrl"
            );
        });

        test("throws error for invalid webhook URL", () => {
            expect(() => new DiscordClient({ webhookUrl: "https://example.com" })).toThrow(
                "Invalid Discord webhook URL format"
            );
        });
    });
});