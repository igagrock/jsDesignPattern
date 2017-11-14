var EventBus = function(){
    eventTopics =  {};
    //subscriber
    this.addEventListener =  function (eventName, listener) {
        if ( !eventTopics[eventName] || eventTopics[eventName].length < 1) {
                eventTopics[eventName] = [];
        }
         eventTopics[eventName].push(listener);
    };
    //publisher
    this.emitEventListeners = function (eventName , params) {
        if ( !eventTopics[eventName] || eventTopics[eventName].length < 1) return;

          eventTopics[eventName].forEach(function (listener) {
              
            listener( !!params ? params : {} );
        });
    }

} //END EventBus

var Order = function(params ){
    EventBus.call(this);
    var params = params;
    this.getParams = function(){return params;}
}

var order1 = new Order({"email": "irshad.sheikh@gmail.com","Name": "Irshad"});
console.log(order1)
//Order.addEventListener('order/add' , function(){});




