StartTest(function (t) {

    t.it('Should NOT find task model data applied to task template, when not using eventRenderer', function (t) {
        var g = t.getGantt({
            renderTo         : Ext.getBody(),
            taskStore        : new Gnt.data.TaskStore({ proxy : 'memory' }),
            taskBodyTemplate : '<span class="leaf">leaf:{leaf} Name:{Name}</span>'
        });

        var newTask = new g.taskStore.model({
            Name      : 'TheName',
            StartDate : g.getStart(),
            EndDate   : g.getEnd(),
            Cls       : 'foo',
            leaf      : true
        });
        g.taskStore.getRootNode().appendChild(newTask);

        var el = g.getSchedulingView().getElementFromEventRecord(newTask);
        var inner = el.dom.innerHTML;

        t.hasCls(el, 'foo', 'Found Cls class ok');

        t.unlike(inner, 'leaf:true')
    })

    t.it('Should find custom task data applied to task template, when using eventRenderer', function (t) {
        var g = t.getGantt({
            renderTo         : Ext.getBody(),
            taskStore        : new Gnt.data.TaskStore({ proxy : 'memory' }),
            taskBodyTemplate : '<span class="leaf">leaf:{leaf} Name:{Name}</span>',

            eventRenderer    : function() {
                return {
                    leaf : 'foo',
                    Name : 'OverrideName'
                };
            }
        });

        var newTask = new g.taskStore.model({
            Name      : 'TheName',
            StartDate : g.getStart(),
            EndDate   : g.getEnd(),
            Cls       : 'foo',
            leaf      : true
        });
        g.taskStore.getRootNode().appendChild(newTask);

        var el = g.getSchedulingView().getElementFromEventRecord(newTask);
        var inner = el.dom.innerHTML;

        t.like(inner, 'leaf:foo')
        t.like(inner, 'Name:OverrideName')
    })
})
