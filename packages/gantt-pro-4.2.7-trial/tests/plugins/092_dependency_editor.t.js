StartTest(function(t) {

    //======================================================================================================================================================================================================================================================
    t.diag('Setup');
    t.expectGlobals('dep');

    Ext.define('dep', {
        extend : 'Gnt.model.Dependency',
        typeField : 'FooType',
        fromField : 'FooFrom',

        fields : ['FooType', 'FooFrom']
    });

    var depEditor = new Gnt.plugin.DependencyEditor({
        triggerEvent : 'dependencyclick',
        showLag     : true
    })

    var g = t.getGantt2({
        renderTo : Ext.getBody(),
        forceFit : true,
        width    : 600,
        plugins : depEditor,
        dependencyStore : t.getDependencyStore({
            model : 'dep',
            data: [
                { "FooFrom": 117, "To": 115, "Id": 30, "FooType": 2 },
                { "FooFrom": 118, "To": 115, "Id": 31, "FooType": 2 },
                { "FooFrom": 115, "To": 116, "Id": 32, "FooType": 2 },
                { "FooFrom": 121, "To": 120, "Id": 33, "FooType": 2 }
            ]
        })
    });

    t.chain(
        { waitForTasksAndDependenciesToRender : g },

        { click : function() {
            var depStore = g.getDependencyStore(),
                depModel = depStore.getById(33), // This model dependency doesn't interest with other dependency lines
                                                 // and Siesta has no problems clicking exactly it, for other models
                                                 // the selected dependency line element might be hovered by other
                                                 // dependency line and Siesta won't click the hovered element
                el;

            el = g.getDependencyView().getElementsForDependency(depModel);
            el = el.elements[Math.floor(el.getCount() / 2)];
            return el;
        } },

        function(next) {
            t.ok(depEditor.isVisible(), 'Dependency editor visible after double click');
            var newType = (depEditor.typeField.getValue() + 1) % 4;
            depEditor.typeField.setValue(newType);

            depEditor.getForm().updateRecord(depEditor.dependencyRecord);
            t.is(depEditor.dependencyRecord.getType(), newType, 'Type changed ok');
            t.is(depEditor.dependencyRecord.get('FooType'), newType, 'Type changed ok');

            next();
        },

        { click : g.getSchedulingView(), offset : [10, 10] },

        { waitFor : function () { return depEditor.isHidden(); }, message : 'Dependency editor not visible after hide' }
    );
});
