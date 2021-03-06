function MqttTarget(opt, wtc, tspt) {
    this.mqtt = tspt.createClient(opt.transportOptions);
    this.topic = opt.topic;
    var p = this;
    this.mqtt.on('connected', function () {
        console.log('mqtt target ready');
        wtc.emit('target', p);
    });
    this.mqtt.on('disconnected', function () {
        console.log('mqtt target not ready');
        wtc.emit('target', null);
    });
    console.log('MQTT target created');
}

MqttTarget.prototype.write = function (data) {
    console.log('Publishing data ' + data);
    this.mqtt.publish(this.topic, data);
};

MqttTarget.prototype.stop = function () {};

exports.createTarget = function (opt, watcher, tspt) {
    return new MqttTarget(opt, watcher, tspt[opt.transport]);
};