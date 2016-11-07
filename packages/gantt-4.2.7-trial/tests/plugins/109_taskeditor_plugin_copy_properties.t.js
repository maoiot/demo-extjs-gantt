StartTest(function(t) {

    // This test checks that task editor plugin maps some of its properties to the contained task editor widget (#2864)


    // Prepare a configuration object having configs listed in taskEditorConfigs
    // we include only configs like showXXX, allowXXX or xxxxText, since other
    // having store/class names require more complex technique
    var config = Ext.Array.toMap(Ext.Array.filter(Gnt.plugin.TaskEditor.prototype.taskEditorConfigs.split(','), function (prop) {
        return prop.match(/^(show.+|allow.+|.+Text)$/);
    }));


    t.beforeEach(function () {
        t.cq1('ganttpanel') && t.cq1('ganttpanel').destroy();
    });


    t.it('Task editor plugin maps some properties to the task editor widget (plugin instance)', function (t) {

        var plugin = new Gnt.plugin.TaskEditor(config);

        t.getGantt2({
            renderTo        : Ext.getBody(),
            resourceStore   : t.getResourceStore(),
            assignmentStore : t.getAssignmentStore(),
            forceFit        : true,
            plugins         : plugin
        });

        for (var p in config) {
            t.is(plugin[p], plugin.taskEditor[p], p + ' is mapped properly');
        }

    });


    t.it('Task editor plugin maps some properties to the task editor widget (plugin prototype)', function (t) {

        /* global MyTaskEditor */

        t.expectGlobals('MyTaskEditor');

        Ext.define('MyTaskEditor', Ext.apply({
            extend : 'Gnt.plugin.TaskEditor'
        }, config));

        var plugin = new MyTaskEditor();

        t.getGantt2({
            renderTo        : Ext.getBody(),
            resourceStore   : t.getResourceStore(),
            assignmentStore : t.getAssignmentStore(),
            forceFit        : true,
            plugins         : plugin
        });

        for (var p in config) {
            t.is(plugin[p], plugin.taskEditor[p], p + ' is mapped properly');
        }

    });

});
