StartTest(function (t) {
    var plug, field, scheduler;

    t.beforeEach(function () {
        scheduler && scheduler.destroy();

        plug = new Sch.plugin.TreeCellEditing();

        field = new Ext.form.TextField({
            setTask : function(rec) {
                this.task = rec;
            },

            getValue : function() {
                return 'foo';
            },

            applyChanges : function (record) {
                record.setName(this.getValue());
            }
        });

        scheduler = t.getScheduler({
            renderTo   : Ext.getBody(),
            plugins    : plug,
            columns    : [
                {
                    dataIndex : 'Name', // Should never be used
                    editor : field
                }
            ]
        });
    });

    t.it('Should call setTask in editor start, and use getValue on the Field - not read the dataIndex value on the model', function (t) {
        var resourceRecord = scheduler.resourceStore.first();
        var name = resourceRecord.getName();

        t.chain(
            { waitForRowsVisible : scheduler },

            function(next) {
                plug.startEdit(0, 0);

                next();
            },

            { waitFor : function() { return plug.getActiveEditor(); } },

            function(next) {
                t.is(field.inputEl.dom.value, 'foo');
                t.is(field.task, scheduler.resourceStore.first(), 'setTask correctly called');

                plug.completeEdit();

                t.is(resourceRecord.getName(), name, 'Changes are not applied');

                next();
            }
        )
    });

    // #2657
    t.it('Should continue editing after click in normal grid', function (t) {
        if (Ext.getVersion().isLessThan('6.0.1')) {
            t.pass('Only fixed for 6.0.1');
            return;
        }
        t.chain(
            { waitForEventsToRender : scheduler },
            { clickToEditCell : [scheduler.lockedGrid, 0, 0] },
            function (next) {
                t.elementIsTopElement('input');
                next();
            },
            { click : '.sch-timetd', offset : [5, '50%'] },
            // IE need to wait for some time before editing can be started again
            { waitFor : 300 },
            { clickToEditCell : [scheduler.lockedGrid, 0, 0] },
            function () {
                t.elementIsTopElement('input');
            }
        )
    });

    t.it('Should not try to stop GC if editing is not started', function (t) {
        scheduler.on('beforeedit', function () { return false; }, false, { single : true });
        t.chain(
            { waitForRowsVisible : scheduler },
            { dblclick : function () { return t.getCell(scheduler, 0, 0); }},
            function (next) {
                t.selectorNotExists('.x-editor');
                next();
            },
            { clickToEditCell : [scheduler.lockedGrid, 1, 0] },
            function () {
                t.selectorExists('.x-editor');
            }
        )
    });
});