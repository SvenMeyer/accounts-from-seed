"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const yargs_1 = __importDefault(require("yargs"));
// Hardhat's default test accounts for verification
const HARDHAT_TEST_ACCOUNTS = [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
    "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
    "0x976EA74026E726554dB657fA54763abd0C3a0aa9",
    "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955",
    "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f",
    "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720"
];
// Test function to verify derived addresses match Hardhat's defaults
async function testHardhatAccounts() {
    const mnemonic = "test test test test test test test test test test test junk";
    const basePath = "m/44'/60'/0'/0";
    const baseWallet = ethers_1.ethers.HDNodeWallet.fromPhrase(mnemonic, "", basePath);
    let allCorrect = true;
    console.log("Verifying first 10 accounts...");
    for (let i = 0; i < 10; i++) {
        const wallet = baseWallet.deriveChild(i);
        const derived = wallet.address;
        const expected = HARDHAT_TEST_ACCOUNTS[i];
        const matches = derived.toLowerCase() === expected.toLowerCase();
        console.log(`Account ${i}: ${derived} ${matches ? '✓' : '✗'}`);
        if (!matches) {
            allCorrect = false;
            console.log(`  Expected: ${expected}`);
        }
    }
    if (allCorrect) {
        console.log("\nAll accounts match Hardhat's default accounts! ✓");
    }
    else {
        console.error("\nSome accounts did not match! ✗");
        process.exit(1);
    }
}
// Add test command to yargs
const main = async () => {
    const argv = await (0, yargs_1.default)(process.argv.slice(2))
        .option("mnemonic", {
        alias: "m",
        description: "12-word mnemonic phrase",
        type: "string",
        demandOption: false, // Changed from true to false
        coerce: (arg) => arg?.trim() // Added optional chaining
    })
        .option("p", {
        description: "Include private keys in the output",
        type: "boolean",
        default: false,
    })
        .option("n", {
        description: "Number of accounts to generate",
        type: "number",
        default: 1,
    })
        .option("test", {
        description: "Run tests to verify Hardhat default accounts",
        type: "boolean",
        default: false,
    })
        .check((argv) => {
        // Only require mnemonic if not running tests
        if (!argv.test && !argv.mnemonic) {
            throw new Error('Missing required argument: mnemonic');
        }
        return true;
    })
        .strict()
        .help()
        .alias("help", "h")
        .argv;
    if (argv.test) {
        await testHardhatAccounts();
    }
    else {
        if (!argv.mnemonic)
            throw new Error("Mnemonic is required");
        await generateKeys(argv.mnemonic, argv.p, argv.n);
    }
};
async function generateKeys(mnemonic, includePk, count) {
    // Create base wallet with the base path (without index)
    const basePath = "m/44'/60'/0'/0";
    const baseWallet = ethers_1.ethers.HDNodeWallet.fromPhrase(mnemonic, "", basePath);
    for (let i = 0; i < count; i++) {
        // Use deriveChild for indices
        const wallet = baseWallet.deriveChild(i);
        const publicKey = wallet.address;
        const privateKey = includePk ? wallet.privateKey : "";
        console.log([i.toString(), publicKey, privateKey].filter(Boolean).join(","));
    }
}
main().catch(console.error);
