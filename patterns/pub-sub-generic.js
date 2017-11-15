
/**
 * not declaring the properties in protoype
 * due to the fact, every new object will have its own EventBus
 */
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


/**
 * OrderService inherits EventBus
 * and adds createOrder and removeOrder methods on it.
 * 
 */
var OrderService = function(){
    EventBus.call(this);
}
OrderService.prototype = Object.create(EventBus.prototype)
OrderService.prototype.constructor = OrderService;
//-----------
OrderService.prototype.createOrder = function(params){
    console.log("created the order using parameters given as " ,params);
    //publish/emit the event = order/new 
     this.emitEventListeners('order/new',params)
}
OrderService.prototype.removeOrder = function(params){
    console.log("remove Order using paramters given as ", params);
    this.emitEventListeners('order/remove',params);
}

/**
 * 1) create a new order
 * 2) add the event listeners for new and remove event
 * 3) simulate order add and creation
 * 
 */
var ods = new OrderService();
ods.addEventListener('order/new',(e)=>{
    console.log("add new order notification 1");
});
ods.addEventListener('order/remove', (e) => {
    console.log('remove order notification 2');
});

ods.createOrder({ "Email": "irshad@mfail.com", "name": "irshad", "id": "order0001" });
ods.removeOrder({ "Email": "irshad@mfail.com", "name": "irshad", "id": "order0001" });

console.log();
console.log();

