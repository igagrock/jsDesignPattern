/**
* Obeserver pattern 

*/

var Subject =   function(){};

Subject.prototype = function(){

	var dataList =  [];
	var observers =  [];

	//add the data to dataList
	var push =  function( val ){
		dataList.push(val);
		notifyRegistered();
	};
	var pop =  function( val ){
		var index = dataList.indexOf(val);
		if(index > -1){
			dataList.splice(index,1);
			notifyRegistered();
		}
	};
	var register = function ( observer){
		if(observer.notify && typeof observer.notify == 'function'){
			observers.push(observer)
		}
		else{
			console.error("can not register the observer. Notify method not present");
		}
	};
	var remove =  function(observer){
		var id = observers.indexOf(observer);
		if(id > -1){
			observers.splice(id , 1);

		}
	}

	var notifyRegistered = function(){
		for (var i = observers.length - 1; i >= 0; i--) {
			observers[i].notify(dataList);
		}
	}
	return{
		data : dataList ,
		Listeners : observers,
		push : push,
		pop : pop,
		addListener : register ,
		removeListener : remove
	}

}();


var Observer = function(){};
Observer.prototype.notify = function(data){
	console.log("notified the change");
	console.log("dataList = ", data);
};

//run

var db = new Subject();
db.addListener(new Observer());
db.addListener(new Observer());

db.push(111);
db.push(222);

db.pop(111);
db.pop(111);
db.pop(12121221);



