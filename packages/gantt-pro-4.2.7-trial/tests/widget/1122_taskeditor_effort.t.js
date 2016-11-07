StartTest(function (t) {

    // #2738 - Effort field gets reset in TaskEditor for summary tasks

    var taskStore   = t.getTaskStore({
        DATA : [
            {
                Id        : 1,
                StartDate : '2016-03-30',
                Duration  : 1,
                expanded  : true,
                children  : [
                    {
                        Id        : 11,
                        StartDate : '2016-03-30',
                        Duration  : 1,
                        Effort    : 99,
                        leaf      : true
                    }
                ]
            }
        ]
    });

    var editor      = new Gnt.widget.TaskEditor({
        taskStore       : taskStore,
        assignmentStore : taskStore.getAssignmentStore(),
        resourceStore   : taskStore.getResourceStore(),
        margin          : 10,
        width           : 500,
        renderTo        : document.body
    });

    editor.loadTask(taskStore.getNodeById(1));

    t.is(editor.taskForm.taskBuffer.getEffort(), 99, 'proper effort value');

});
