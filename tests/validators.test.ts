import { isValidURL, IsValidWebhookUrl, validateRequired } from '../src/utils/validators';

describe('Validators', () => {
    describe('isValidURL', () => {
        test('should validate correct URLs', () => {
            expect(isValidURL('https://example.com')).toBe(true);
            expect(isValidURL('http://localhost:3000')).toBe(true);
            expect(isValidURL('https://discord.com/api/webhooks/123/abc')).toBe(true);
        });

        test('should reject invalid URLs', () => {
            expect(isValidURL('not a url')).toBe(false);
            expect(isValidURL('example.com')).toBe(false);
            expect(isValidURL('')).toBe(false);
        });
    });

    describe('IsValidWebhookUrl', () => {
        test('should validate Discord webhook URLs', () => {
            const validDiscord = 'https://discord.com/api/webhooks/123456789/abcdefgh';
            expect(IsValidWebhookUrl(validDiscord, 'discord')).toBe(true);
        });

        test('should reject invalid Discord webhook URLs', () => {
            expect(IsValidWebhookUrl('https://example.com', 'discord')).toBe(false);
            expect(IsValidWebhookUrl('https://discord.com/invalid', 'discord')).toBe(false);
        });

        test('should return false for unknown platforms with valid URL', () => {
            // @ts-ignore
            expect(IsValidWebhookUrl('https://example.com', 'unknown')).toBe(false);
        });
    });

    describe('validateRequired', () => {
        test('should pass when all required fields present', () => {
            const config = { field1: 'value1', field2: 'value2' };
            expect(() => {
                validateRequired(config, ['field1', 'field2'], 'Test');
            }).not.toThrow();
        });

        test('should throw when required fields missing', () => {
            const config = { field1: 'value1' };
            expect(() => {
                validateRequired(config, ['field1', 'field2'], 'Test');
            }).toThrow('Test configuration missing required fields: field2');
        });

        test('should throw for multiple missing fields', () => {
            const config = {};
            expect(() => {
                validateRequired(config, ['field1', 'field2', 'field3'], 'Test');
            }).toThrow('field1, field2, field3');
        });
    });
});