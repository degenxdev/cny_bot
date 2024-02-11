import { TransactionBlock } from "@mysten/sui.js/transactions";
import {
    CNY_PACKAGE_V2,
    SUI_COIN_TYPE,
    COIN_TYPE_WHITELIST,
    Oracle,
    GameStatus,
    ReferralManager,
    TroveManager,
    Leaderboard,
    LootboxPool,
    FinalPool,
    Game,
    signer,
    CLOCK,
    FINAL_POOL,
    GAME_STATUS,
    LEADERBOARD,
    LOOTBOX_POOL,
    ORACLE,
    REFERRAL_MANAGER,
    TROVE_MANAGER,
    RED_ENVELOPE_TYPE_SUI
} from "./constants"
import {
	SUI_CLOCK_OBJECT_ID,
} from '@mysten/sui.js/utils';
import { EventId, type SuiObjectData } from "@mysten/sui.js/client";

const ONE_SUI = 1000000000;
const TICKET_COST_SUI = 10 * ONE_SUI;

export async function buy_ticket(count: number) {
    let txb = new TransactionBlock();

    let coin = txb.splitCoins(txb.gas, [txb.pure(TICKET_COST_SUI* count)]);
    let sender = signer.getSuiAddress();
    console.log(sender);
    // txb.setGasBudget(1000000000);
    txb.moveCall({
        target: `${CNY_PACKAGE_V2}::periphery::buy_to`,
        typeArguments: [SUI_COIN_TYPE],
        arguments: [
          txb.sharedObjectRef(CLOCK),
          txb.sharedObjectRef(COIN_TYPE_WHITELIST),
          txb.sharedObjectRef(ORACLE),
          txb.sharedObjectRef(GAME_STATUS),
          txb.sharedObjectRef(REFERRAL_MANAGER),
          txb.sharedObjectRef(TROVE_MANAGER),
          txb.sharedObjectRef(FINAL_POOL),
          txb.sharedObjectRef(LOOTBOX_POOL),
          txb.sharedObjectRef(LEADERBOARD),
          coin,
          txb.pure(count),
          txb.pure([Game], "vector<address>"),
          txb.pure(sender, "address"),
          txb.pure(sender, "address"),
        ],
    });

    txb.transferObjects([coin], sender);

    const txResponse = await signer.signAndExecuteTransactionBlock(
        {
            transactionBlock: txb,
            options: {
                showEvents: true,
            }
        }
    )

    console.log(txResponse);
    
}

export async function open_ticket(count: number) {

  let txb = new TransactionBlock();

  let envs = await signer.suiClient.getOwnedObjects({
    owner: signer.getSuiAddress(),
    options: { showContent: true },
    filter: { StructType: RED_ENVELOPE_TYPE_SUI },
  });
  for (let i = 0; i < envs.data.length && i < count; i++) {
    let obj_id = envs.data[i].data?.objectId;
          // Open envelope
      txb.moveCall({
        target: `${CNY_PACKAGE_V2}::red_envelope::open`,
        typeArguments: [SUI_COIN_TYPE],
        arguments: [
            txb.object(SUI_CLOCK_OBJECT_ID),
            txb.object(GameStatus),
            txb.object(ReferralManager),
            txb.object(LootboxPool),
            txb.object(Leaderboard),
            txb.object(obj_id!),
        ]
      });
  };

      const txResponse = await signer.signAndExecuteTransactionBlock(
        {
            transactionBlock: txb,
            options: {
                showEvents: true,
            }
        }
    )
        console.log(txResponse);
}

export async function get_game_status() {
    const response = await signer.suiClient.getObject({
        id: GameStatus,
        options: {
          showContent: true,
        },
      });

    return getGameStatusFields(response.data!);
}

function getGameStatusFields(data: SuiObjectData) {
    if (data.content?.dataType !== "moveObject") {
      return null;
    }
  
    return data.content.fields as {
      end_time: number;
      is_ended: boolean;
    };
  }

  export async function get_last_openers() {

    let opener_events: String[] = [];
    let current_cursor: EventId | null | undefined = null;
    while (opener_events.length < 40) {
      const response = await signer.suiClient.queryEvents({
        // query: {
        //   MoveEventType: `0xd441d82fa791d7e7fc89eb2a40b0714bd9a6a1aaf0c897d702802d30109c1f7b::red_envelope::Open<0x2::sui::SUI>`,
        // },
        query: {
          MoveEventModule: {
            package: "0xd441d82fa791d7e7fc89eb2a40b0714bd9a6a1aaf0c897d702802d30109c1f7b",
            module: "red_envelope"
          }
        },
        order: "descending",
        cursor: current_cursor,
        limit: 100
      });
      if (!response.data) {
        break;
      }
      current_cursor = response.nextCursor;
      response.data.map(
        (event) => { 
            hasOpener(event.parsedJson) ? opener_events.push(event?.parsedJson?.opener) : "";
        }
      )
    };
      return opener_events;
  }

  function hasOpener(
    parsedJson: any,
  ): parsedJson is { opener: String } {
    return "opener" in parsedJson;
  }