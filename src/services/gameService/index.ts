import { Socket } from "socket.io-client";
import {IStartGame, MatrixType} from "../../types/game.types";

class GameService {
  public async joinGameRoom(socket: Socket, roomId: string): Promise<boolean> {
    return new Promise((rs, rj) => {
      socket.emit("join_game", { roomId });
      socket.on("room_joined", () => rs(true));
      socket.on("room_join_error", ({ error }) => rj(error));
    });
  }

  public async updateGame(socket: Socket, gameMatrix: MatrixType) {
    socket.emit("update_game", { matrix: gameMatrix });
  }

  public async onGameUpdate(
    socket: Socket,
    listener: (matrix: MatrixType) => void
  ) {
    socket.on("on_game_update", ({ matrix }) => listener(matrix));
  }

  public async onStartGame(
    socket: Socket,
    listener: (options: IStartGame) => void
  ) {
    socket.on("start_game", listener);
  }

  public async gameWin(socket: Socket, message: string) {
    socket.emit("game_win", { message });
  }

  public async onGameWin(socket: Socket, listiner: (message: string) => void) {
    socket.on("on_game_win", ({ message }) => listiner(message));
  }
}

export default new GameService();
