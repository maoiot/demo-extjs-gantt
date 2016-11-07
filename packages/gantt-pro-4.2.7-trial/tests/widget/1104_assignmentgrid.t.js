StartTest(function (t) {

    t.expectGlobal('My');

    var grid;

    t.beforeEach(function () {
        grid && grid.destroy();
    })

    t.it('Basic use cases', function (t) {

        var assignmentStore = new Gnt.data.AssignmentStore({
            data : [
                { Id : 'a1', ResourceId : 'r1', TaskId : 1 },
                { Id : 'a2', ResourceId : 'r2', TaskId : 2 },
                { Id : 'a3', ResourceId : 'r6', TaskId : 3, Units : 50 }
            ]
        });

        var resourceStore    = new Sch.data.ResourceStore({
            data : [
                { Id : 'r3', Name : 'Don' },
                { Id : 'r5', Name : 'Doug' },
                { Id : 'r4', Name : 'Karen' },
                { Id : 'r2', Name : 'Linda' },
                { Id : 'r1', Name : 'Mike' },
                { Id : 'r6', Name : 'Peter' }
            ]
        });
        var nbrResourceLoads = 0;

        var grid = new Gnt.widget.AssignmentGrid({
            margin          : 10,
            width           : 300,
            renderTo        : Ext.getBody(),
            resourceStore   : resourceStore,
            assignmentStore : assignmentStore,

            loadResources : function () {
                nbrResourceLoads++;
                Gnt.widget.AssignmentGrid.prototype.loadResources.apply(this, arguments);
            }
        });

        var selModel = grid.getSelectionModel();

        t.chain(
            { waitForRowsVisible : 'assignmentgrid' },

            function (next) {

                t.selectorExists('.x-grid-item:nth-child(1):contains(Don)')
                t.selectorExists('.x-grid-item:nth-child(2):contains(Doug)')
                t.selectorExists('.x-grid-item:nth-child(3):contains(Karen)')
                t.selectorExists('.x-grid-item:nth-child(4):contains(Linda)')
                t.selectorExists('.x-grid-item:nth-child(5):contains(Mike)')
                t.selectorExists('.x-grid-item:nth-child(6):contains(Peter)')

                grid.loadTaskAssignments(3);

                t.selectorExists('.x-grid-item:nth-child(1):contains(Peter)')
                t.selectorExists('.x-grid-item:nth-child(2):contains(Don)')
                t.selectorExists('.x-grid-item:nth-child(3):contains(Doug)')
                t.selectorExists('.x-grid-item:nth-child(4):contains(Karen)')
                t.selectorExists('.x-grid-item:nth-child(5):contains(Linda)')
                t.selectorExists('.x-grid-item:nth-child(6):contains(Mike)')

                t.is(selModel.getCount(), 1, 'Should find one row selected');
                t.is(selModel.selected.first().getResourceId(), 'r6', 'Should find "r3" selected');
                t.matchGridCellContent(grid, 0, 2, '50', 'Should find 50 percent in the Units cell');
                t.is(grid.store.first(), selModel.selected.first(), 'Should find store sorted with assigned resources on top');

                grid.cellEditing.startEditByPosition({ row : 0, column : 2 });

                next();
            },

            {
                waitFor : function () {
                    return grid.cellEditing.getActiveEditor();
                }
            },

            function (next) {
                var editor = grid.cellEditing.getActiveEditor();

                editor.setValue(0);
                editor.completeEdit();
                next();
            },

            { waitFor : 100 },

            function (next) {
                t.is(selModel.getCount(), 0, 'Should not see resource assigned if setting Units to 0');
                t.is(grid.store.first().getUnits(), 0, 'Should see store updated with value');

                grid.saveTaskAssignments();
                t.is(assignmentStore.getCount(), 2, 'Should find assignment store having only 2 items');
                t.is(assignmentStore.find('ResourceId', 'r6'), -1, 'Should not find any assignment for resource "r3"');

                var nbrLoads = nbrResourceLoads;

                grid.destroy();
                grid         = null;
                resourceStore.loadData([
                    { Id : 'Foo', Name : 'Bar' }
                ]);

                t.is(nbrResourceLoads, nbrLoads, 'Grid should not react to resource store changes after it is destroyed');
            }
        );
    })

    t.it('Integration test: Clicking checkboxes', function (t) {

        var assignmentStore = new Gnt.data.AssignmentStore({
            data : [
                { Id : 'a1', ResourceId : 'r1', TaskId : 1 },
                { Id : 'a2', ResourceId : 'r2', TaskId : 2 },
                { Id : 'a3', ResourceId : 'r3', TaskId : 3, Units : 50 }
            ]
        });

        var resourceStore = new Sch.data.ResourceStore({
            data : [
                { Id : 'r1', Name : 'Mike' },
                { Id : 'r2', Name : 'Linda' },
                { Id : 'r3', Name : 'Don' }
            ]
        });

        grid = new Gnt.widget.AssignmentGrid({
            cls             : 'clicktest',
            margin          : 10,
            width           : 300,
            renderTo        : Ext.getBody(),
            resourceStore   : resourceStore,
            assignmentStore : assignmentStore
        });

        var selModel = grid.getSelectionModel();

        t.chain(
            { click : '.clicktest .x-grid-cell-row-checker' },
            { click : '.clicktest .x-grid-item:nth-child(2) .x-grid-cell-row-checker' },

            function (next) {
                t.is(selModel.getCount(), 2);
                t.selectorCountIs('.clicktest .x-grid-item-selected', 2)
                t.is(assignmentStore.getAt(0).getUnits(), 100, 'Mike at 100%')
                t.is(assignmentStore.getAt(1).getUnits(), 100, 'Linda at 100%')

                t.matchGridCellContent(grid, 0, 2, '100 %', 'Cell content: Mike 100 %')
                t.matchGridCellContent(grid, 1, 2, '100 %', 'Cell content: Linda 100 %')
            }
        );
    })

    t.it('Check / uncheck all', function (t) {
        var assignmentStore = new Gnt.data.AssignmentStore({
            data : [
                { Id : 'a1', ResourceId : 'r1', TaskId : 1 }
            ]
        });

        var resourceStore = new Sch.data.ResourceStore({
            data : [
                { Id : 'r1', Name : 'Mike' },
                { Id : 'r2', Name : 'Linda' }
            ]
        });

        grid = new Gnt.widget.AssignmentGrid({
            width           : 300,
            cls             : 'grid2',
            renderTo        : Ext.getBody(),
            resourceStore   : resourceStore,
            assignmentStore : assignmentStore
        });

        grid.loadTaskAssignments(1);

        t.chain(
            { click : '.grid2 .x-column-header-checkbox' },
            { click : '.grid2 .x-column-header-checkbox' },

            function (next) {
                grid.saveTaskAssignments();
                // after each saveTaskAssignments we should call loadTaskAssignments to set proper __id__'s on task assignments
                grid.loadTaskAssignments();
                next();
            },

            { click : '.grid2 .x-column-header-checkbox' },

            function (next) {
                grid.saveTaskAssignments();
            }
        )
    })

    t.it('Should support showing custom columns and save custom model fields when using custom model', function (t) {
        Ext.define('My.Model', {
            extend : Gnt.model.Assignment,
            fields : [
                'foo'
            ]
        })
        var assignmentStore = new Gnt.data.AssignmentStore({
            model : 'My.Model',
            data  : [
                { Id : 'a1', ResourceId : 'r1', TaskId : 1, foo : 'bar' }
            ]
        });

        var resourceStore = new Sch.data.ResourceStore({
            data : [
                { Id : 'r1', Name : 'Mike' },
                { Id : 'r2', Name : 'Linda' }
            ]
        });

        grid = new Gnt.widget.AssignmentGrid({
            width           : 300,
            cls             : 'grid2',
            renderTo        : Ext.getBody(),
            resourceStore   : resourceStore,
            assignmentStore : assignmentStore,

            columns : [
                {
                    text      : 'Custom column',
                    flex      : 1,
                    dataIndex : 'foo'
                }
            ]
        });

        grid.loadTaskAssignments(1);

        t.chain(
            { waitForSelector : '.x-grid-cell:contains(bar)' },

            function (next) {
                grid.store.getAt(0).set('foo', 'baz');
                grid.saveTaskAssignments();

                t.expect(assignmentStore.getAt(0).get('foo')).toBe('baz')
            }
        )
    })
})
