export interface ServerToClientEvents {
  message: (message: { id: string; name?: string; message: string }) => void;
  hello: (message: string) => void;
  pointersMove: (pointer: { id?: string; x: number; y: number }) => void;
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

export interface ClientToServerEvents {
  message: (message: { id: string; name?: string; message: string }) => void;
  hello: () => void;
  pointerMove: (pointer: { id?: string; x: number; y: number }) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
