/* inputService takes  user input and stores them in future database.

*/
app.service('userInputService', function(){
	this.data = [
		{label:"Knee Surgery", value:"50,000"},
		{label:"Physical", value:"300"}
		];
	this.getData = function(){
			return this.data;
			
		};
	this.update = function(input){
		console.log('update called in service');
			if (!input) {
				console.log('no data defined');
				return
			}
			var newData = {
	 			label: input.label,
	 			value: input.value
				}
			console.log('adding: '+newData);
			this.data.push(angular.copy(newData));
		};
	this.remove = function(input) {
			var index = this.data.indexOf(input);
			this.data.splice(index, 1);
			}	

});