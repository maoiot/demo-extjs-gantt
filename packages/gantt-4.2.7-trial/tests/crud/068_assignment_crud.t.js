StartTest(function (t) {

    var resourceStore = new Gnt.data.ResourceStore({
        data : [
            { "Id" : 1, "Name" : "Mats" },
            { "Id" : 2, "Name" : "Nickolay" },
            { "Id" : 3, "Name" : "Goran" },
            { "Id" : 4, "Name" : "Jakub" }
        ]
    });

    var assignmentStore = Ext.create("Gnt.data.AssignmentStore", {
        autoLoad      : true,
        autoSync      : true,
        resourceStore : resourceStore,
        proxy         : {
            method        : 'GET',
            type          : 'ajax',
            actionMethods : { read : 'GET', destroy : 'POST', create : 'POST' },
            api           : {
                read    : 'data/crud/assignment-read.js',
                create  : 'data/crud/assignment-create.js',
                destroy : 'data/crud/assignment-delete.js'
            },
            reader        : 'json',
            writer        : 'json'
        }
    });

    var cellEditing = Ext.create('Sch.plugin.TreeCellEditing', {
        clicksToEdit : 1
    });

    var gantt = t.getGantt({
        renderTo : Ext.getBody(),

        resourceStore   : resourceStore,
        assignmentStore : assignmentStore,

        plugins : cellEditing,

        columns : [
            {
                xtype : 'namecolumn'
            },
            {
                xtype : 'resourceassignmentcolumn',
                tdCls : 'editor'
            }
        ]
    });

    var itemSelector = Ext.grid.View.prototype.itemSelector;

    t.it('Assign 2 resources', function (t) {
        t.chain(
            { waitForStoresToLoad : assignmentStore },

            { waitForRowsVisible : gantt },

            function (next) {
                t.waitFor(function () {
                    return cellEditing.getActiveEditor();
                }, next);

                cellEditing.startEdit(0, 1);
            },

            { click : 'assignmentgrid => .x-grid-cell:nth-child(3)' },

            { waitForSelectorAtCursor : 'input' },

            {
                type : '100[TAB][TAB]',
                target : function () {
                    var editor = cellEditing.getActiveColumn().field.getPicker().cellEditing.getActiveEditor();
                    // selectOnFocus is disabled in IE, need to clear field
                    if (Ext.isIE) {
                        editor.field.inputEl.dom.value = '';
                    }
                    return editor;
                }
            },

            { waitForCQVisible : 'numberfield' },

            {
                type : '80[ENTER]',
                target : function () {
                    var editor = cellEditing.getActiveColumn().field.getPicker().cellEditing.getActiveEditor();
                    if (Ext.isIE) {
                        editor.field.inputEl.dom.value = '';
                    }
                    return editor;
                }
            },

            {
                waitForEvent : [assignmentStore, 'write'],
                trigger      : { click : '>> assignmentgrid button[text^=Save]' }
            },

            function (next) {
                t.is(assignmentStore.getCount(), 2, '2 records in assignment store');
                t.ok(assignmentStore.getById(1), 'Record with Id 1 found');
                t.is(assignmentStore.getById(1).getUnits(), 100, '100 percent found');
                t.is(assignmentStore.getById(2).getUnits(), 80, '80 percent found');

                next();
            }
        );
    });

    t.it('Unassign same 2 resources', function (t) {
        t.chain(
            //function (next) {
            //    t.clickToEditCell(gantt.lockedGrid, 0, 1, next);
            //},
            { click : '.x-grid-cell:nth-child(2)' },

            function (next) {
                // force expand with manual method call (is required for FF when running
                // in automation)
                // just clicking on the grid cell doesn't work because of something
                // related to focus..
                cellEditing.getActiveEditor().field.expand();

                next();
            },
            // eof forced expand


            { waitForCompositeQuery : 'assignmentgrid => td.x-grid-cell:nth-child(3)' },

            // 2 clicks to uncheck selected rows
            { click : 'assignmentgrid => ' + itemSelector + ':nth-child(1) .x-grid-row-checker' },
            { click : 'assignmentgrid => ' + itemSelector + ':nth-child(2) .x-grid-row-checker' },

            {
                waitForEvent : [assignmentStore, 'write'],
                trigger      : { click : '>> assignmentgrid button[text^="Save"]' }
            },

            function (next) {
                t.is(assignmentStore.getCount(), 0, 'Records removed');

            }
        )
    });

    t.it('Testing Cancel button', function (t) {
        t.chain(
            //function (next) {
            //    t.clickToEditCell(gantt.lockedGrid, 0, 1, next);
            //},
            { click : '.x-grid-cell:nth-child(2)' },

            function (next) {
                t.selectorNotExists('.x-grid-row-selected .x-grid-row-checker', 'No rows selected');
                next();
            },

            { click : '>> assignmentgrid button[text=Cancel]' },

            function (next) {
                t.selectorNotExists('.x-grid-row-selected .x-grid-row-checker', 'No rows selected');
                t.elementIsNotVisible(t.cq1('assignmentfield').getEl(), 'No assignment field visible after Cancel click');
                next();
            },

            // click again
            { click : '.x-grid-cell:nth-child(2)' },

            { click : '>> assignmentgrid button[text=Cancel]' }
        );
    });
});
