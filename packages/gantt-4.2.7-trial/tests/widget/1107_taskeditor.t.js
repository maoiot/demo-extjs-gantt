StartTest(function (t) {

    t.expectGlobals('MyTask');

    Ext.define('MyTask', {
        extend      : 'Gnt.model.Task',
        isEditable  : function(fieldName) {
            if (this.getId() == 117 && 'Name' === fieldName) {
                return false;
            }
            if (this.getId() == 115 && 'Duration' === fieldName) {
                return false;
            }
            if (this.getId() == 118 && (('StartDate' === fieldName) || ('EndDate' === fieldName))) {
                return false;
            }

            return this.callParent(arguments);
        }
    });

    var taskStore = t.getTaskStore({
        model : 'MyTask'
    });


    t.it('loadTask() loads task values properly and doesn`t persist changes untill updateTask() is called', function (t) {
        var editor = new Gnt.widget.TaskEditor({
            taskStore   : taskStore,
            margin      : 10,
            width       : 500,
            renderTo    : Ext.getBody()
        });

        var form = editor.taskForm;

        var startDateField  = form.getForm().findField('StartDate');
        var durationField   = form.getForm().findField('Duration');
        var percentField    = form.getForm().findField('PercentDone');

        var task = taskStore.getNodeById(117);

        editor.loadTask(task);

        t.is(startDateField.getValue(), new Date(2010, 1, 3), 'Start date value is proper');
        t.is(durationField.getValue(), 6, 'Duration value is proper');
        t.is(durationField.durationUnit, 'd', 'Duration unit is proper');
        t.is(percentField.getValue(), 0, 'Percent value is proper');

        t.diag('Set field values');

        startDateField.setValue(new Date(2010, 1, 2));
        durationField.setValue({ value : 7, unit : 'd' });
        percentField.setValue(10);

        t.is(startDateField.getValue(), new Date(2010, 1, 2), 'Start date value is proper');
        t.is(durationField.getValue(), 7, 'Duration value is proper');
        t.is(durationField.durationUnit, 'd', 'Duration unit is proper');
        t.is(percentField.getValue(), 10, 'Percent value is proper');

        t.diag('Check task values (it should stay unchanged)');

        t.is(task.getStartDate(), new Date(2010, 1, 3), 'Start date value unchanged');
        t.is(task.getDuration(), 6, 'Duration value unchanged');
        t.is(task.getDurationUnit(), 'd', 'Duration unit unchanged');
        t.is(task.getPercentDone(), 0, 'Percent value unchanged');

        t.diag('Call editor.updateTask() to persist values into task');

        editor.updateTask();

        t.diag('Check task values');

        t.is(task.getStartDate(), new Date(2010, 1, 2), 'Start date value changed');
        t.is(task.getDuration(), 7, 'Duration value changed');
        t.is(task.getDurationUnit(), 'd', 'Duration unit changed');
        t.is(task.getPercentDone(), 10, 'Percent value is proper');

        t.it('loadTask() takes into account Task.isEditable() result', function (t) {
            var nameField  = form.getForm().findField('Name');

            t.ok(nameField.readOnly, 'Name field is disabled');
            t.notOk(durationField.readOnly, 'Duration field is enabled');

            editor.loadTask(taskStore.getNodeById(115));

            t.notOk(nameField.readOnly, 'Name field is enabled');
            t.ok(durationField.readOnly, 'Duration field is disabled');
        });
    });

    t.it('Task editor constructor takes into account Task.isEditable() result', function (t) {
        t.cq1('taskeditor') && t.cq1('taskeditor').destroy();

        var editor = new Gnt.widget.TaskEditor({
            taskStore   : taskStore,
            margin      : 10,
            width       : 500,
            renderTo    : Ext.getBody(),
            task        : taskStore.getNodeById(117)
        });

        t.ok(editor.taskForm.getForm().findField('Name').readOnly, 'Name field is disabled');
        t.notOk(editor.taskForm.getForm().findField('Duration').readOnly, 'Duration field is enabled');
    });

    t.it('Form loadRecord() takes into account Task.isEditable() and `editable` mode of fields ', function (t) {
        t.cq1('taskeditor') && t.cq1('taskeditor').destroy();

        var editor = new Gnt.widget.TaskEditor({
            taskStore      : taskStore,
            task           : taskStore.getNodeById(118),
            taskFormConfig : {
                startConfig : {
                    editable : false
                }
            },
            margin         : 10,
            width          : 500,
            renderTo       : Ext.getBody()
        });

        var form            = editor.taskForm.getForm();
        var startDateField  = form.findField('StartDate').inputEl.dom;
        var endDateField    = form.findField('EndDate').inputEl.dom;

        t.ok(startDateField.readOnly, 'StartDate field is disabled');
        t.ok(endDateField.readOnly, 'EndDate field is disabled');

        editor.loadTask(taskStore.getNodeById(115));

        t.ok(startDateField.readOnly, 'StartDate field is still disabled');
        t.notOk(endDateField.readOnly, 'EndDate field is enabled');
    });

});
