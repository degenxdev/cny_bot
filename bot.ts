import {
    buy_ticket,
    get_game_status,
    open_ticket
} from './cny_bot';

const TIME_TOLERANCE = 10000;
const MAX_TOLERANCE = 35000;
const ONE_SECOND_MS = 1000;
const DEFAULT_INTERVAL = 10000;
/// This function assumes your account is funded and ready to spam some buys
async function buy_envelopes_bot_under() {
    let game_status = await get_game_status();
    const currentDateInMillis: number = new Date().getTime();
    let time_left = (game_status?.end_time! - currentDateInMillis);
    if (time_left < MAX_TOLERANCE) {
        console.log("buying tickets");
        await buy_ticket(1);
        await open_ticket(1);
    };

    // Calculate the interval time I should wake up
    if (time_left > TIME_TOLERANCE) {
        return time_left - TIME_TOLERANCE;
    } else {
        // If we are sweating the end of the game we should check every second
        return ONE_SECOND_MS; 
    }
}

function millisecondsToMinutes(milliseconds: number): number {
    return milliseconds / 60000;
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function main() {
    while (true) {
        let sleep_time = await buy_envelopes_bot_under();
        console.log(`Sleeping for ${millisecondsToMinutes(sleep_time)} minutes, Wake me up when I should degen again.`);
        await sleep(sleep_time);
    };
}
    
main().catch((err) => console.log(err));