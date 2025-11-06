import { ConfigurationError, MessageSendError, ZNotifyError } from "../src/utils/errors";

describe("Error Classes", () => {
    describe("ZNotifyError", () => {
        test("creates error with message and code", () => {
            const error = new ZNotifyError("Test error", "TEST_CODE");
            expect(error).toBeInstanceOf(Error);
            expect(error.name).toBe("ZNotifyError");
            expect(error.message).toBe("Test error");
            expect(error.code).toBe("TEST_CODE");
        });
    });

    describe("ConfigurationError", () => {
        test("creates configuration error", () => {
            const error = new ConfigurationError("Invalid config");
            expect(error).toBeInstanceOf(ZNotifyError);
            expect(error.name).toBe("ConfigurationError");
            expect(error.message).toBe("Invalid config");
            expect(error.code).toBe("CONFIGURATION_ERROR");
        });
    });

    describe("MessageSendError", () => {
        test("creates message send error with original error", () => {
            const originalError = new Error("Network timeout");
            const error = new MessageSendError("Discord", originalError);

            expect(error).toBeInstanceOf(ZNotifyError);
            expect(error.name).toBe("MessageSendError");
            expect(error.message).toContain("Discord");
            expect(error.message).toContain("Network timeout");
            expect(error.code).toBe("MESSAGE_SEND_ERROR");
            expect(error.originalError).toBe(originalError);
        });
    });
});
