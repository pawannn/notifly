export interface DiscordClientConfig {
    webhookUrl: string;
    username?: string;
    avatarUrl?: string;
    defaultColor?: number;
    timeout?: number;
}

export interface DiscordEmbedField {
    name: string;
    value: string;
    inline?: boolean;
}

export interface DiscordEmbed {
    title?: string | undefined;
    description?: string | undefined;
    color?: number | undefined;
    fields?: DiscordEmbedField[] | undefined;
    timestamp?: string | undefined;
    footer?: { text: string; icon_url?: string; } | undefined;
    author?: { name: string; icon_url?: string; url?: string; } | undefined;
    thumbnail?: { url: string; } | undefined;
    image?: { url: string; } | undefined;
    url?: string | undefined;
}

export interface SendOptions {
    username?: string;
    avatarUrl?: string;
}