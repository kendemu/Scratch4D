"use strict";

var _cylon = require("cylon");

var _cylon2 = _interopRequireDefault(_cylon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_cylon2.default.api("http", {
   host: '127.0.0.1',
   port: '3001',
   ssl: false,
   auth: false
});

_cylon2.default.robot({
   name: "Scratch4D",
   connections: {
      bebop: { adaptor: 'skylifesimulator' }
   },

   devices: {
      drone: { driver: 'skylifesimulator' }
   },

   work: function work(my) {}
}).start();