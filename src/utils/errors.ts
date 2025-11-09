export class logiflyError extends Error {
    code: string;
    constructor(message: string, code: string) {
        super(message);
        this.name = 'logiflyError';
        this.code = code;
    }
}

export class ConfigurationError extends logiflyError {
    constructor(message: string) {
        super(message, 'CONFIGURATION_ERROR');
        this.name = 'ConfigurationError';
    }
}

export class MessageSendError extends logiflyError {
    originalError: any;
    constructor(platform: string, originalError: any) {
        super(
            `Failed to send message via ${platform}: ${originalError?.message}`,
            'MESSAGE_SEND_ERROR'
        );
        this.name = 'MessageSendError';
        this.originalError = originalError;
    }
}
