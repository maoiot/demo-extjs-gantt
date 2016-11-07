StartTest(function (t) {
    var gantt = t.getGantt2({
        cascadeChanges  : false,
        dependencyStore : new Gnt.data.DependencyStore(),
        renderTo        : Ext.getBody(),
        viewConfig      : { forceFit : true }
    });

    var dependencyStore = gantt.getDependencyStore(),
        newDep,
        depView = gantt.getSchedulingView().getDependencyView(),
        ts = gantt.getTaskStore(),
        root = ts.getRootNode();

    t.chain(
        {   waitForEventsToRender : gantt },

        // Make sure view is fully rendered, no extra refresh calls
        { waitFor : 100 },

        function (next) {
            t.wontFire(depView, 'refresh', 'View should not perform full refresh when adding/updating/removing single record');

            t.is(depView.getDependencyElements().getCount(), 0, 'No dependencies in DOM');

            newDep = new dependencyStore.model({
                From : root.childNodes[0].get('Id'),
                To   : root.childNodes[1].get('Id'),
                Cls  : 'foo',
                Type : Gnt.model.Dependency.Type.EndToEnd
            });

            dependencyStore.add(newDep);
            next();
        },

        { waitFor : function() {
            return depView.getDependencyElements().getCount() > 0;
        } },

        function (next) {

            var lineEls = gantt.el.select('.foo-line'),
                testDep;

            t.isGreater(depView.getDependencyElements().getCount(), 0, 'Adding dependency introduced some dependency elements in DOM');

            t.ok(newDep.internalId, 'Dep record has internalId')
            t.is(lineEls.getCount(), 3, '3 lines found')
            t.selectorExists('.foo-arrow', 'Custom arrow CSS class correctly applied');

            lineEls.each(function(lineEl) {
                testDep = depView.getDependencyForElement(lineEl);
                t.ok(newDep == testDep, 'Correct dependency record might be identified by line element')
            });

            testDep = depView.getDependencyForElement(gantt.el.down('.foo-arrow'));
            t.ok(testDep == newDep, 'Correct dependency record might be identified by arrow');

            // Setting the From field to an 'invalid' number should mean it should no longer be rendered, DOM should be updated to reflect this
            newDep.set('From', -1);
            t.is(depView.getDependencyElements().getCount(), 0, 'No dependencies in DOM after making one of the tasks missing');

            newDep.reject();
            t.isGreater(depView.getDependencyElements().getCount(), 0, 'Dependencies redrawn after model reject');

            t.isCalled(depView.updateDependencies, depView);
            root.childNodes[1].setStartDate(new Date(1987, 1, 1));

        }
    );
})    
