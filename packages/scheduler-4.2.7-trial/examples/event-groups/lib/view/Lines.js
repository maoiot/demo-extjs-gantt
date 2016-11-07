Ext.define("App.view.Lines", {
    extend : "Sch.plugin.Lines", 

    requires : [
        'Ext.XTemplate'
    ],

    uniqueCls : 'sch-linegroup',

    template : new Ext.XTemplate(
        '<tpl for=".">',
        '<div id="{Id}" class="{Id} sch-timeline sch-summaryline sch-linegroup {Cls}" style="left:{left}px;top:{top}px;">',
        '<div title="Drag me" class="timeline-draghandle"><span>{Name}</span></div>',
        '</div>',
        '</tpl>'
    ),

    resolveDelivery : function(el) {
        return this.store.getById(el.id);
    }
});