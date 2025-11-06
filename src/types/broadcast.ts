export interface PlatformClient {
    send(message: string | object, options?: Record<string, any>): Promise<any>;
    sendEmbed?(embedOptions: EmbedOptions): Promise<any>;
    testConnection?(): Promise<boolean>;
}

export interface EmbedOptions {
    title: string;
    description: string;
    color?: number;
    [key: string]: any;
}

export interface BroadcastResult {
    success: boolean;
    platform: string;
    result?: any;
    error?: string;
    note?: string;
}

export interface BroadcastSummary {
    groupName: string;
    totalClients: number;
    results: Record<string, BroadcastResult>;
}

export interface TestConnectionResult {
    platform: string;
    connected: boolean;
    error?: string;
}

interface ClientEntry {
    client: PlatformClient;
    alias: string;
    platform: string;
}