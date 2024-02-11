## Instructions

1. First install npm, ts-node, dotenv, and mysten.js libraries;
    ```npm install``` 
2. Create a .env file in with a private key for your usage
```
KEY_PHRASE="[YOUR_MNEMONIC]"
```
3. Make sure you fund the wallet you want to bot with with SUI.
4. Run the bot
```
npx ts-node bot.ts
```
5. PROFIT

## Naive algorithm
If there is only 45 seconds left,
If I am a not a buyer in the last 40 buy 1 envelop.

Feel free to modify the bot code as you see fit! This is a starting naive bot implementation.