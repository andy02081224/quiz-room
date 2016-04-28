let Utils = {
  generateShortUID: function () {
    return ("0".repeat(6) + (Math.random() * Math.pow(36, 6) << 0).toString(36)).slice(-6);
  }
};


export default Utils;