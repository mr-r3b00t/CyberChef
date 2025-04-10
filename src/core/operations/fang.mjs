/**
 * @author mrr3b00t (@UK_Daniel_Card)
 */
import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";

export default class Refang extends Operation {
    constructor() {
        super();

        this.name = "Refang";
        this.module = "Default";
        this.description = "Reverses common defanging techniques in URLs, IPs, domains, and emails. Converts patterns like [.] to ., [:] to :, [@] to @, etc.";
        this.infoURL = "https://en.wikipedia.org/wiki/Obfuscation#Examples"; // Placeholder
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                name: "Replace [.]",
                type: "boolean",
                value: true
            },
            {
                name: "Replace [:]",
                type: "boolean",
                value: true
            },
            {
                name: "Replace [@]",
                type: "boolean",
                value: true
            },
            {
                name: "Replace [ . ]",
                type: "boolean",
                value: true
            },
            {
                name: "Replace hxxp",
                type: "boolean",
                value: false
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        try {
            let output = input;

            const [
                replaceDot,
                replaceColon,
                replaceAt,
                replaceSpacedDot,
                replaceHxxp
            ] = args;

            // Define replacement rules
            const rules = [];
            if (replaceDot) rules.push({ pattern: /\[\.\]/g, replacement: "." });
            if (replaceColon) rules.push({ pattern: /\[\:\]/g, replacement: ":" });
            if (replaceAt) rules.push({ pattern: /\[@\]/g, replacement: "@" });
            if (replaceSpacedDot) rules.push({ pattern: /\[\s*\.\s*\]/g, replacement: "." });
            if (replaceHxxp) rules.push({ pattern: /hxxp(s?)/gi, replacement: "http$1" });

            // Apply replacements
            for (const rule of rules) {
                output = output.replace(rule.pattern, rule.replacement);
            }

            return output;
        } catch (err) {
            throw new OperationError(`Error refanging input: ${err.message}`);
        }
    }
}
