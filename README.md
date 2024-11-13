# accounts-from-seed

A self-contained TypeScript program that generates Ethereum addresses and private keys from a 12-word mnemonic phrase. The program reads the mnemonic from the command line, and optionally outputs private keys if the -p flag is provided. It also allows specifying the number of accounts to generate with the -n flag.

## Installation

```bash
npm install
```

## Usage

### Generate Accounts
```bash
# Generate a single account
node dist/accounts-from-seed.js --mnemonic="your twelve word mnemonic phrase here"

# Generate multiple accounts
node dist/accounts-from-seed.js -m "your twelve word mnemonic phrase here" -n 3

# Include private keys in output
$ node dist/accounts-from-seed.js --mnemonic="test test test test test test test test test test test junk" -n 3 -p
0,0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266,0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
1,0x70997970C51812dc3A010C7d01b50e0d17dc79C8,0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
2,0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC,0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
```

### Parameters

- `-m, --mnemonic`: 12-word mnemonic phrase (required unless running tests)
- `-p`: Include private keys in the output (optional, default: false)
- `-n`: Number of accounts to generate (optional, default: 1)
- `--test`: Run verification against Hardhat's default accounts
- `-h, --help`: Show help menu

### Testing

The program includes a verification test that ensures the wallet derivation matches Hardhat's default accounts. This is useful for developers who want to ensure compatibility with Hardhat's default testing environment.

```bash
# Run the verification test
npm test
```

The test verifies that the first 10 accounts derived from Hardhat's default mnemonic phrase 

`test test test test test test test test test test test junk` match the expected addresses:
```
Index 0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 
Index 1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 
Index 2: 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC 
Index 3: 0x90F79bf6EB2c4f870365E785982E1f101E93b906 
Index 4: 0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 
Index 5: 0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc 
Index 6: 0x976EA74026E726554dB657fA54763abd0C3a0aa9 
Index 7: 0x14dC79964da2C08b23698B3D3cc7Ca32193d9955 
Index 8: 0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f 
Index 9: 0xa0Ee7A142d267C1f36714E4a8F75612F20a79720
```
This test ensures that the wallet derivation follows the correct BIP-32/BIP-44 specification.