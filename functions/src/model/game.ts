export const MinRoomSize = 6;

export interface Room {
  gameEnd: boolean;
  full: boolean;
  players: Array<Player>;
  roomID: string;
  owner: Player;
  roomConfig: RoomConfig;
}

export interface Player {
  name: string;
  role: string;
  playerID: string;
  roomID: string;
  seat: number
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
