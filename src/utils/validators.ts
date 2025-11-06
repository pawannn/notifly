import { WEBHOOK_PATTERNS } from "./constants";
import { ConfigurationError } from "./errors";

type Platform = keyof typeof WEBHOOK_PATTERNS;

export const isValidURL = (webhookURL: string) => {
    try {
        new URL(webhookURL);
        return true;
    } catch (err: any) {
        return false;
    }
}

export const IsValidWebhookUrl = (webhookURL: string, platform: Platform) => {
    if (!isValidURL(webhookURL)) {
        return false;
    }

    return WEBHOOK_PATTERNS[platform] ? WEBHOOK_PATTERNS[platform].test(webhookURL) : false
}

export const validateRequired = (config: Record<string, any>, requiredFields: string[], platformName: string) => {
    const missing = requiredFields.filter(field => !config[field]);

    if (missing.length > 0) {
        throw new ConfigurationError(
            `${platformName} configuration missing required fields: ${missing.join(', ')}`
        );
    }
}
