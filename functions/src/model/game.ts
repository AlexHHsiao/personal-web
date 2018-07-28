export const MinRoomSize = 6;

export interface Room {
  gameEnd: boolean;
  full: boolean;
  players: Array<Player>;
  roomID: string;
  roomConfig: RoomConfig;
}

export interface Player {
  name: string;
  role: string;
  playerID: string;
}

export interface RoomConfig {
  villager: number;
  seer: number;
  werewolf: number;
  hunter: number;
  witch: number;
  guard: number;
  fool: number;
  size: number;
  witchSaveSelf: boolean;
}
