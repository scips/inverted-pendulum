(function(World, View, FunctionApproximator, SimpleAgent){
    var world = new World({ g: 1/16, M: 1/4 });

    var problem = world.createInvertedPendulum({ angle: Math.PI/50 });

    new View(document.getElementById('playground'), problem);

    var functionApproximator = new FunctionApproximator(function(){return Math.rand();}, 0.01, 0.1, function(elements) { return elements[Math.floor((Math.random() * elements.length))]; });

    var agent = new SimpleAgent(problem, functionApproximator);

    function run(){
	
	problem.tick();
	requestAnimationFrame(run);
    };
    run();
})(World, InvertedPendulumView, FunctionApproximator, SimpleAgent);
