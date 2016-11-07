/* globals OtherDPV */
StartTest(function(t) {

    t.it([
        "Dependency view mixin should create dependency view instance whenever a component's view is created",
        "and destroy dependency view instance whenever a component is destroyed"
    ].join(' '), function(t) {

        function testInjection(scheduler, t) {
            t.firesOnce(scheduler, 'dependencyviewready', "Dependency view ready event has been fired ok");

            t.notOk(scheduler.hasDependencyView(), "Component reports that there's no dependency view yet");
            t.notOk(scheduler.getDependencyView(), "There's no dependency view before component rendering, since normal view has not been created yet");

            scheduler.render(Ext.getBody());

            t.ok(scheduler.hasDependencyView(), "Component reports that there's a dependency view now");
            t.ok(scheduler.getDependencyView(), "There's the dependency view present now, since normal view has been created");

            Ext.destroy(scheduler);

            t.notOk(scheduler.hasDependencyView(), "Component reports that dependency view is destroyed");
        }

        t.diag("Scheduler grid");
        testInjection(t.getScheduler(), t);

        t.diag("Scheduler tree");
        testInjection(t.getSchedulerTree(), t);

        t.diag("Events");
    });

    t.it("Dependency view mixin should take component's dependencyViewConfig as dependency view configuration", function(t) {
        var scheduler = t.getScheduler({
            renderTo : Ext.getBody(),
            dependencyViewConfig : {
                drawDependencies : false
            }
        });

        t.notOk(scheduler.getDependencyView().getDrawDependencies(), "View reports `drawDependencies` config to be `false`, by default it's `true`, thus config is applied");

        Ext.destroy(scheduler);
    });

    t.it("Dependency view mixin should be able to create different dependency view types", function(t) {
        var scheduler;

        t.expectGlobals('OtherDPV');

        Ext.define('OtherDPV', {
            extend : 'Sch.view.dependency.View',
            alias  : 'schdependencyview.other'
        });

        scheduler = t.getScheduler({
            renderTo : Ext.getBody(),
            dependencyViewConfig : {
                type : 'other'
            }
        });

        t.ok(scheduler.getDependencyView() instanceof OtherDPV, "Dependency view subclass has been created");

        Ext.destroy(scheduler);
    });
});
