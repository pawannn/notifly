export class logpingError extends Error {
    code: string;
    constructor(message: string, code: string) {
        super(message);
        this.name = 'logpingError';
        this.code = code;
    }
}

export class ConfigurationError extends logpingError {
    constructor(message: string) {
        super(message, 'CONFIGURATION_ERROR');
        this.name = 'ConfigurationError';
    }
}

export class MessageSendError extends logpingError {
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
