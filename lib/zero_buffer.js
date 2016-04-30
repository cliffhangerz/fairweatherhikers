module.exports = exports = function(buf) {
  for (var i = 0; i < buf.length; i++) {
    buf.writeUInt8(0, i);
  }
};
