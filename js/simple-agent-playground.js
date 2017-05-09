(function(World, View, FunctionApproximator, SimpleAgent){
    var world = new World({ g: 1/160, M: 1/4 });

    var initialState = { angle: Math.PI/50, ended: false };
    var problem = world.createInvertedPendulum(initialState);


    var functionApproximator = new FunctionApproximator(
        function(){return Math.random();},
        0.001,
        0.01,
        function(elements) { return elements[Math.floor((Math.random() * elements.length))]; },
        function(weights) {
            return 1/weights.reduce(function (prev, current) { return Math.max(prev, current)}, -Infinity)
        }
    );

    functionApproximator.addValueFunction(
        functionApproximator.createValueFunction(function(s) {
            return 1;
        })
    );
    functionApproximator.addValueFunction(
        functionApproximator.createValueFunction(function(s) {
            var toReturnValue =-100.0*Math.abs(s.angle);
            console.log('angle : '+toReturnValue);
            return toReturnValue;
        })
    );
    functionApproximator.addValueFunction(
        functionApproximator.createValueFunction(function(s) {
            var toReturnValue = -100.0*Math.abs(s.angularVelocity);
            console.log('anglevelocity: '+toReturnValue);
            return toReturnValue;
        })
    );
    functionApproximator.addValueFunction(
        functionApproximator.createValueFunction(function(s) {
            var toReturnValue = -0.001*Math.abs(s.velocity);
            console.log('anglevelocity: '+toReturnValue);
            return toReturnValue;
        })
    );

    var agent = new SimpleAgent(problem, functionApproximator);

    new View(document.getElementById('playground'), problem, agent);

    var count = 0;
    var framecount = 0;
    function run(){
        if (framecount % 1 == 0){
            if(!problem.currentState().ended) {
                if(count%5 == 0) {
                var option = agent.chooseAction();

                agent.performAction(option.action);
                } else {
                problem.tick();
                }
                count++;
            } else {
                agent.reevaluateActions();
                problem.currentState(initialState);
            }
        }
        framecount++;
        requestAnimationFrame(run);
    };
    run();
})(World, InvertedPendulumView, FunctionApproximator, SimpleAgent);
