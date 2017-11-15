
/**
 * Order acts as publisher here and also has a private event bus
 * the reason to have a private event bus to control the number of events
 * allowed to be notified.
 * ex: events allowed are 
 *  - order/add
 *  - order/remove
 */

var OrderService = function(params){};
OrderService.prototype = function(){
    var _this =  this;
    //private event bus for publisher so it can 
    //make the limited events available for which the listner would be called
    var Event = function( params){
        this.data = !!params ? params : {};
    }

    var EventBus = {
         eventTopics: {},
         subscribe: function(eventName , listener){
             console.log('this == ', this);
             var evb = EventBus;
             if (!evb.eventTopics[eventName] || evb.eventTopics[eventName].length < 1 ){
                 evb.eventTopics[eventName] = [];
             }
             evb.eventTopics[eventName].push(listener);
         },
         publish: function(eventName, params){
             var evb = EventBus;
             var e = new Event(params);
             if (!evb.eventTopics[eventName] || evb.eventTopics[eventName].length < 1) return;
             evb.eventTopics[eventName].forEach(function(listener) {
                 listener(e);
             });
         }

     } //END EventBus
     var addNewOrder = function(params){
         console.log("created the order using parameters given as " ,params);
         //publish/emit the events 
         EventBus.publish('order/new' , params);
     }

     return {
         on : EventBus.subscribe,
         createOrder : addNewOrder
     }

}();

var orderSrc = new OrderService();

orderSrc.on('order/new', (e) => { console.log('1st Event Notified for ',e.data.id); });
orderSrc.on('order/new', (e) => { console.log('2nd Event Notified for ',e.data.id); });
orderSrc.createOrder({ "Email": "irshad@mfail.com", "name": "irshad", "id": "order0001" });
orderSrc.createOrder({ "Email": "ahmad@mfail.com", "name": "ahmad", "id": "order0003" });
