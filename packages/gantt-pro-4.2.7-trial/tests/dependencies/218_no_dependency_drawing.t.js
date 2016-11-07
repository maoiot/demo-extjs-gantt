describe('Should support not drawing dependencies', function (t) {

    var gantt = t.getGantt2({
        renderTo         : document.body,
        viewConfig : {
            drawDependencies : false
        }
    });

    t.waitForRowsVisible(gantt, function () {
        t.notOk(gantt.getSchedulingView().getDependencyView().canDrawDependencies(), 'Dependency view is disabled');
    })
});
