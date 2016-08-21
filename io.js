/**
 * Created by eugene on 14.12.15.
 */

var io;

module.exports.init = function(server) {
    io = server;
    console.log('lol1');

    io.on('connection', function (socket) {
        console.log('lol2');
        socket.emit('testEvent', {a: 7});
    });
};