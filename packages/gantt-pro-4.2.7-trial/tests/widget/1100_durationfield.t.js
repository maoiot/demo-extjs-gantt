StartTest(function (t) {

    t.it('Integration tests', function(t){
        var editor = Ext.create('Sch.plugin.TreeCellEditing', { clicksToEdit: 1 });

        var g = t.getGantt({
            columns : [
                { xtype : 'treecolumn' },

                { xtype : 'durationcolumn', instantUpdate : !Ext.isIE }
            ],
            plugins : [ editor ],
            renderTo : document.body
        });

        var task = g.taskStore.getRootNode().firstChild.firstChild; // Taking a leaf

        t.willFireNTimes(g.lockedGrid, 'edit', 2);

        t.chain(
            { waitForRowsVisible : g },

            { click : function() { return t.getCell(g.lockedGrid, 1, 1); } },

            { waitForCQVisible : 'numberfield' },

            { type : '[UP][UP][ENTER]' },

            function(next) {
                t.is(task.getDuration(), task.modified.Duration + 2, 'Duration increased by 2');

                next();
            },

            { action : 'click' },

            { waitForSelectorAtCursor : 'input:focus' },

            function(next) {
                var ed = editor.getActiveEditor();

                t.type(ed, '5w[ENTER]', next, null, null, true);
            },
            //----------------------------------
            function(next) {
                t.is(task.getDuration(), 5, 'Duration is 5');
                t.is(task.getDurationUnit(), 'w', 'Duration unit is week');
            }
        );
    });

    t.it('allowDecimals', function(t){

        var field = new Gnt.widget.DurationField({
            renderTo : Ext.getBody(),
            allowDecimals : false
        });

        t.type(field, '2.2', function() {
            t.todo(function(t) {
                t.hasValue(field, 2, 'allowDecimal false should prevent decimals');
            });
        });
    });
})
