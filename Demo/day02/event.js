var events = require('events');
var eventsEmitter = new events.EventEmitter();

eventsEmitter.on('someEvent', function(arg1, arg2){
    console.log('listener1', arg1, arg2);
});

eventsEmitter.on('someEvent', function(arg1, arg2){
    console.log('listener2', arg1, arg2);
});

eventsEmitter.emit('someEvent', 'arg1参数', 'arg2参数');