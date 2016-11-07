Ext.define('Sch.examples.vertical.view.Scheduler2', {
    extend          : 'Sch.examples.vertical.view.Scheduler',
    alias           : 'widget.vertical-scheduler2',
    viewPreset      : 'hourAndDay',

    verticalColumns : [
        {
            text      : 'Day',
            width     : 80,
            locked    : true,
            sortable  : false,
            dataIndex : 'Id',
            align     : 'right',
            tdCls     : 'sch-verticaltimeaxis-cell sch-vertical-daycell',
            renderer  : function (value, metaData, record, rowIndex, colIndex, store) {
                var currentIndex = store.indexOf(record);
                var nextRecord   = store.getAt(--currentIndex);

                if (!nextRecord || nextRecord.getStartDate().getDate() !== record.getStartDate().getDate()) {
                    return Ext.Date.format(record.getStartDate(), 'D');
                } else {
                    metaData.tdCls += ' sch-spanned-row';
                }
            }
        },
        {
            text  : 'Time',
            xtype : 'verticaltimeaxis'
        }
    ]
});