StartTest(function (t) {
    Ext.define('Gnt.MyGantt', {
        extend                  : 'Gnt.panel.Gantt',
        enableTaskReordering    : true,
        lockedViewConfig        : { },
        columns:[
            {
                xtype   : 'namecolumn',
                width   :300
            }
        ]
    });

    t.it('After destroying and recreating a gantt panel. It should still be usable.', function (t) {
        var renderGantt = function(){
            return Ext.create('Gnt.MyGantt',{
                renderTo    : Ext.getBody(),
                taskStore   : t.getTaskStore(),
                plugins     : ['viewport']
            });
        };

        var gantt;

        t.chain(
            function(next){
                gantt = renderGantt();
                next();
            },
            { click : function () { return t.getCell(gantt, 3, 0); } },
            function(next){
                gantt.destroy();
                gantt = renderGantt();
                next();
            },
            { click : function () { return t.getCell(gantt, 3, 0); } }
        );
    });
});