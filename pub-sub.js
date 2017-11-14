var Publisher = function(params){
    var params = params;
    this.getParams = function(){return params};
};
Publisher.prototype = function(){
    var _this =  this;
    var EventBus = {

         eventTopics: {},

         subscribe: function(eventName , listener){
             if(!this.eventTopics[eventName] || this.eventTopics[eventName].length < 1 ){
                 this.eventTopics[eventName] = [];
             }
             this.eventTopics[eventName].push(listener);
         },
         publish: function(eventName){
             if (!this.eventTopics[eventName] || this.eventTopics[eventName].length < 1) return;
             
             this.eventTopics[eventName].forEach(function(listener) {
                 listener(_this.getParams());
             });
         }

     } //END EventBus

     return {
         on : EventBus.subscribe,
         publish : EventBus.publish
     }

}();

var p1 = new Publisher({"Email": "irshad@mfail.com", "name": "irshad"});
