StartTest(function(t) {

    t.beforeEach(function (t) {
        t.cq1('ganttpanel') && t.cq1('ganttpanel').destroy();
    });

    function checkFormFieldsAreReadOnly (t, form, isReadOnly) {
        var fields = form.getForm().getFields();

        var disabledFields = ['CalendarId', 'wbsCode', 'SchedulingMode'];

        fields.each(function (field) {
            var dom = field.inputEl.dom;
            var fn  = isReadOnly || Ext.Array.contains(disabledFields, field.getName()) ? 'ok' : 'notOk'

            t[fn](dom.disabled || dom.readOnly, field.getName());
        });
    }

    function assertions (t, gantt, fn) {
        var plugin     = gantt.taskEditor;
        var taskEditor = plugin.taskEditor;
        var isReadOnly = gantt.isReadOnly();

        t.chain(
            { waitForEventsToRender : gantt },

            { dblclick : '.sch-gantt-item' },

            { waitForComponentVisible : plugin },

            function (next) {
                t.diag('General tab');

                checkFormFieldsAreReadOnly(t, taskEditor.taskForm, isReadOnly);

                t.waitForComponentVisible(taskEditor.advancedForm, next);

                taskEditor.setActiveTab(taskEditor.advancedForm);
            },

            function () {
                t.diag('Advanced tab');

                checkFormFieldsAreReadOnly(t, plugin.taskEditor.advancedForm, isReadOnly);

                fn && fn();
            }
        );
    }

    t.it('Reacts on readOnly=false config', function (t) {

        var gantt       = t.getGantt({
            taskStore   : t.getTaskStore({
                DATA : [
                    {
                        leaf      : true,
                        StartDate : '2016-02-08',
                        Duration  : 5
                    }
                ]
            }),
            startDate : null,
            endDate   : null,
            renderTo  : Ext.getBody(),
            plugins   : new Gnt.plugin.TaskEditor()
        });

        assertions(t, gantt);
    });

    t.it('Reacts on readOnly=true config', function (t) {

        var gantt       = t.getGantt({
            taskStore   : t.getTaskStore({
                DATA : [
                    {
                        leaf      : true,
                        StartDate : '2016-02-08',
                        Duration  : 5
                    }
                ]
            }),
            startDate : null,
            endDate   : null,
            renderTo  : Ext.getBody(),
            plugins   : new Gnt.plugin.TaskEditor(),
            readOnly  : true
        });

        assertions(t, gantt);
    });

    t.it('Reacts on gantt setReadOnly() method', function (t) {
        var gantt       = t.getGantt({
            taskStore   : t.getTaskStore({
                DATA : [
                    {
                        leaf      : true,
                        StartDate : '2016-02-08',
                        Duration  : 5
                    }
                ]
            }),
            startDate : null,
            endDate   : null,
            renderTo  : Ext.getBody(),
            plugins   : new Gnt.plugin.TaskEditor()
        });

        gantt.setReadOnly(true);

        assertions(t, gantt, function () {
            gantt.taskEditor.close();

            gantt.setReadOnly(false);

            assertions(t, gantt);
        });
    });

});
