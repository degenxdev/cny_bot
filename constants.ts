import { Signer } from "./lib/signer";
import dotenv from "dotenv";
dotenv.config({path: "./.env"});

export const CNY_PACKAGE: String = "0xd441d82fa791d7e7fc89eb2a40b0714bd9a6a1aaf0c897d702802d30109c1f7b";
export const CNY_PACKAGE_V2 = "0xc071ece9544eb6319d51f0bd7df0429c32995e34f228f3d4a39bd326ea435588";
export const Oracle = "0xb9d6e14dcdc0b44b98f02dccebfa4f1545f776c41e6d8c19542b0fec884bb5be";
export const TroveManager = "0x5d25a08c02f83bda4f25169623427985ae1577d3d57bd8006b18f53f30ca6caf";
export const ReferralManager = "0x1c2d1faf24866510f8d304b3e90e924b6abdf288dbc12fca1ceada1f952fc12b";
export const FinalPool = "0xb261766c0ce160919cb60f6a025b3d25db278038fce7ab048df5614ff8ba510c";
export const LootboxPool = "0x73169f782a6d77e4063bff15a3984caaffafd4ce4c50de60fce8a869df938040";
export const Leaderboard = "0x8c5671931b77af6f497fd099779b36b08a16634200475fd2778c5fd28accc65a";
export const GameStatus = "0x1ebb5906b47bd94e4f305512167d717e978cad8e365ba64d4f910e8deb6de2c2";
export const Game = "0x716a7ce95cc33530c193c77f4e7129b6f1dcf5cc62203b7989a4ed994cb13bb2";
export const SUI_COIN_TYPE = `0x2::sui::SUI`;
export const RED_ENVELOPE_TYPE_SUI = `0xd441d82fa791d7e7fc89eb2a40b0714bd9a6a1aaf0c897d702802d30109c1f7b::red_envelope::RedEnvelope<0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI>`;

export const PACKAGE_ID =
  "0xc071ece9544eb6319d51f0bd7df0429c32995e34f228f3d4a39bd326ea435588";

export const V1_PACKAGE_ID =
  "0xd441d82fa791d7e7fc89eb2a40b0714bd9a6a1aaf0c897d702802d30109c1f7b";

export const COIN_TYPE_WHITELIST = {
  objectId:
    "0x8e68766e6bb8532f4dcb2878d4df04f22d5619cf0c5e9bb61aa41d8472e4bd81",
  initialSharedVersion: 66995382,
  mutable: true,
};

export const ORACLE = {
  objectId:
    "0xb9d6e14dcdc0b44b98f02dccebfa4f1545f776c41e6d8c19542b0fec884bb5be",
  initialSharedVersion: 66995382,
  mutable: true,
};

export const TROVE_MANAGER = {
  objectId:
    "0x5d25a08c02f83bda4f25169623427985ae1577d3d57bd8006b18f53f30ca6caf",
  initialSharedVersion: 66995382,
  mutable: true,
};

export const REFERRAL_MANAGER = {
  objectId:
    "0x1c2d1faf24866510f8d304b3e90e924b6abdf288dbc12fca1ceada1f952fc12b",
  initialSharedVersion: 66995382,
  mutable: true,
};

export const FINAL_POOL = {
  objectId:
    "0xb261766c0ce160919cb60f6a025b3d25db278038fce7ab048df5614ff8ba510c",
  initialSharedVersion: 66995382,
  mutable: true,
};

export const LOOTBOX_POOL = {
  objectId:
    "0x73169f782a6d77e4063bff15a3984caaffafd4ce4c50de60fce8a869df938040",
  initialSharedVersion: 66995382,
  mutable: true,
};

export const LEADERBOARD = {
  objectId:
    "0x8c5671931b77af6f497fd099779b36b08a16634200475fd2778c5fd28accc65a",
  initialSharedVersion: 66995382,
  mutable: true,
};

export const GAME_STATUS = {
  objectId:
    "0x1ebb5906b47bd94e4f305512167d717e978cad8e365ba64d4f910e8deb6de2c2",
  initialSharedVersion: 66995382,
  mutable: true,
};

export const TRANSFER_POLICY = {
  objectId:
    "0xcc0b74906a2006823465b0cff4cad756368029909f85e30e0537c718246894ca",
  initialSharedVersion: 66995382,
  mutable: false,
};

export const SUPRA_SOURCE_PACKAGE_ID
  = "0xdca41a092ffc7bbe9dff339fa5914e8661f19ed93918c8db4d9106c226402c5d";

export const SUPRA_CONFIG = {
  objectId: "0xd055da0828eea4f51354eb5e78306d1f68df6f36f0db716f161e7b364693586c",
  initialSharedVersion: 66995385,
  mutable: false,
};

export const SUPRA_ORACLE_HOLDER
  = "0xaa0315f0748c1f24ddb2b45f7939cff40f7a8104af5ccbc4a1d32f870c0b4105";

export const RED_ENVELOPE_TYPE = `${V1_PACKAGE_ID}::red_envelope::RedEnvelope`;

export const PRICE_IN_SUI = 10_000_000_000;

export const CLOCK = {
    objectId: "0x6",
    initialSharedVersion: 1,
    mutable: false,
};

export const signer = new Signer({
    keyPhrase: process.env.KEY_PRHASE ?? "",
    rpcEndpoint: process.env.RPC_ENDPOINT
});