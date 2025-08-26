import { Server } from 'socket.io';

let ioInstance: Server | null = null;

export const setupSocket = (io: Server) => {
  ioInstance = io;
  io.on('connection', (socket) => {
    // Join rooms by role or userId as needed
    socket.on('join', ({ role, userId }) => {
      if (role) socket.join(role);
      if (userId) socket.join(`User:${userId}`);
    });
  });
};

export const getIO = (): Server => {
  if (!ioInstance) throw new Error('Socket.IO not initialized');
  return ioInstance;
};
