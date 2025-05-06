// sockets/socketManager.js
import {tribeService} from "../../src/services/tribeService.js";

export const initializeSocket = (io) => {
    io.on('connection', (socket) => {
        console.log('New client connected');

        socket.on('joinTribe', async (tribeId, token) => {
            try {
                tribeService.setAuthToken(token);
                await tribeService.getTribe(tribeId);
                socket.join(tribeId);
            } catch (error) {
                socket.emit('error', 'Not authorized to join this tribe');
            }
        });

        // Leave tribe room
        socket.on('leaveTribe', (tribeId) => {
            socket.leave(tribeId);
            console.log(`User left tribe room: ${tribeId}`);
        });

        // Tribe chat messages
        socket.on('tribeChatMessage', ({ tribeId, message, user }) => {
            io.to(tribeId).emit('newTribeMessage', { user, message });
        });

        // Project updates
        socket.on('projectUpdate', ({ projectId, update }) => {
            io.emit(`projectUpdate:${projectId}`, update);
        });

        // Disconnect handler
        socket.on('disconnect', () => {
            console.log(`🔥: ${socket.id} user disconnected`);
        });
    });
};