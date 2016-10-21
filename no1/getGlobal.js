(function (win) {
	console.log(win);
	// Do somethin with the global
})(new Function('return this')());