StartTest(function (t) {

    function fieldsAreReadOnly (t, form, fields) {
        for (var i = 0; i < fields.length; i++) {
            t.ok(form.findField(fields[i]).readOnly, fields[i] + ' is readonly');
        }
    }


    t.it('Load Project into form', function (t) {

        var store           = t.getTaskStore({
            DATA            : [ t.getProject('Project', false, true) ]
        });

        var projectForm     = new Gnt.widget.ProjectForm({
            margin          : 10,
            width           : 500,
            showCalendar    : true,
            renderTo        : Ext.getBody()
        });

        var taskForm        = new Gnt.widget.TaskForm({
            margin          : 10,
            width           : 500
        });

        t.chain(
            { waitForCQVisible : 'projectform' },

            function (next) {
                var project         = store.getNodeById('Project'),
                    form            = projectForm.getForm(),
                    readOnlyField   = form.findField(project.readOnlyField);

                t.firesOk({
                    desc       : 'Project loading and updating fires correct events',
                    observable : projectForm,
                    events     : {
                        afterloadrecord    : 1,
                        beforeupdaterecord : 1,
                        afterupdaterecord  : 1
                    },
                    during     : function () {
                        projectForm.loadRecord(project);

                        readOnlyField.setValue(true);

                        projectForm.updateRecord(project);
                    }
                });

                // projectForm.loadRecord(project);
                // readOnlyField.setValue(true);

                fieldsAreReadOnly(t, form, [
                    project.nameField,
                    project.startDateField,
                    project.endDateField,
                    project.allowDependenciesField
                ]);

                t.notOk(readOnlyField.readOnly, 'Project readOnlyField is not readOnly');

                projectForm.destroy();

                taskForm.render(Ext.getBody());
                next();
            },

            { waitForCQVisible : 'taskform' },

            function (next) {
                var subTask = store.getNodeById('Project_task_1');

                t.firesOk({
                    desc       : 'Task loading fires correct events',
                    observable : taskForm,
                    events     : {
                        afterloadrecord : 1
                    },
                    during     : function () {
                        taskForm.loadRecord(subTask);
                    }
                });


                fieldsAreReadOnly(t, taskForm.getForm(), [
                    subTask.nameField,
                    subTask.startDateField,
                    subTask.endDateField,
                    subTask.percentDoneField,
                    subTask.durationField
                ]);


                taskForm.destroy();
            }
        );
    });
});
