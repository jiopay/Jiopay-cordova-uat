/*global cordova, module*/

var JiopayCheckout = module.exports = {
    open: function (options, successCallback, errorCallback) {
      if (successCallback) {
        JiopayCheckout.callbacks['payment.success'] = function(response) {
          successCallback(response.tid);
        }
      }

      if (errorCallback) {
        JiopayCheckout.callbacks['payment.cancel'] = errorCallback;
      }

      cordova.exec(
        JiopayCheckout.pluginCallback,
        JiopayCheckout.pluginCallback,
        'Checkout',
        'open',
        [
          JSON.stringify(options)
        ]
      );
    },

    pluginCallback: function(response){
      if('tid' in response){
        JiopayCheckout.callbacks['payment.success'](response);
      }

      else if('code' in response){
        JiopayCheckout.callbacks['payment.cancel'](response);
      }
    },

    callbacks: {},

    on: function(event, callback) {
      if (typeof event === 'string' && typeof callback === 'function') {
        JiopayCheckout.callbacks[event] = callback;
      }
    },

    onResume: function(event) {
      if(event.pendingResult && event.pendingResult.pluginServiceName === 'Checkout'){
        JiopayCheckout.pluginCallback(event.pendingResult.result);
      }
    }
};
