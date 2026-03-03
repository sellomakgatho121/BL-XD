// Patch os.networkInterfaces to handle sandbox restrictions
const os = require('os');
const original = os.networkInterfaces;
os.networkInterfaces = function() {
  try {
    return original.call(this);
  } catch (e) {
    return {};
  }
};
