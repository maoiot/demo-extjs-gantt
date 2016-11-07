Ext.data.JsonP.Sch_data_ResourceStore({"tagname":"class","name":"Sch.data.ResourceStore","autodetected":{"aliases":true,"alternateClassNames":true,"requires":true,"uses":true,"members":true,"code_type":true},"files":[{"filename":"ResourceStore.js","href":"ResourceStore.html#Sch-data-ResourceStore"}],"extends":"Ext.data.Store","mixins":["Sch.data.mixin.ResourceStore"],"aliases":{"store":["resourcestore"]},"alternateClassNames":[],"requires":[],"uses":[],"members":[{"name":"model","tagname":"cfg","owner":"Sch.data.ResourceStore","id":"cfg-model","meta":{"private":true}},{"name":"eventStore","tagname":"property","owner":"Sch.data.mixin.ResourceStore","id":"property-eventStore","meta":{"private":true}},{"name":"model","tagname":"property","owner":"Sch.data.ResourceStore","id":"property-model","meta":{"private":true}},{"name":"storeId","tagname":"property","owner":"Sch.data.ResourceStore","id":"property-storeId","meta":{"private":true}},{"name":"constructor","tagname":"method","owner":"Sch.data.ResourceStore","id":"method-constructor","meta":{}},{"name":"getEventStore","tagname":"method","owner":"Sch.data.mixin.ResourceStore","id":"method-getEventStore","meta":{}},{"name":"getModel","tagname":"method","owner":"Sch.data.ResourceStore","id":"method-getModel","meta":{}},{"name":"getScheduledEventsInTimeSpan","tagname":"method","owner":"Sch.data.mixin.ResourceStore","id":"method-getScheduledEventsInTimeSpan","meta":{"private":true}},{"name":"setEventStore","tagname":"method","owner":"Sch.data.mixin.ResourceStore","id":"method-setEventStore","meta":{}},{"name":"setModel","tagname":"method","owner":"Sch.data.ResourceStore","id":"method-setModel","meta":{}},{"name":"eventstorechange","tagname":"event","owner":"Sch.data.mixin.ResourceStore","id":"event-eventstorechange","meta":{}}],"code_type":"ext_define","id":"class-Sch.data.ResourceStore","short_doc":"This is a class holding the collection the resources to be rendered into a scheduler panel. ...","component":false,"superclasses":["Ext.data.Store"],"subclasses":["Gnt.data.ResourceStore"],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Ext.data.Store<div class='subclass '><strong>Sch.data.ResourceStore</strong></div></div><h4>Mixins</h4><div class='dependency'><a href='#!/api/Sch.data.mixin.ResourceStore' rel='Sch.data.mixin.ResourceStore' class='docClass'>Sch.data.mixin.ResourceStore</a></div><h4>Subclasses</h4><div class='dependency'><a href='#!/api/Gnt.data.ResourceStore' rel='Gnt.data.ResourceStore' class='docClass'>Gnt.data.ResourceStore</a></div><h4>Files</h4><div class='dependency'><a href='source/ResourceStore.html#Sch-data-ResourceStore' target='_blank'>ResourceStore.js</a></div></pre><div class='doc-contents'><p>This is a class holding the collection the <a href=\"#!/api/Sch.model.Resource\" rel=\"Sch.model.Resource\" class=\"docClass\">resources</a> to be rendered into a <a href=\"#!/api/Sch.panel.SchedulerGrid\" rel=\"Sch.panel.SchedulerGrid\" class=\"docClass\">scheduler panel</a>.\nIt is a subclass of Ext.data.Store - a store with linear data presentation.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div id='cfg-model' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.data.ResourceStore'>Sch.data.ResourceStore</span><br/><a href='source/ResourceStore.html#Sch-data-ResourceStore-cfg-model' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.data.ResourceStore-cfg-model' class='name expandable'>model</a> : String<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>'Sch.model.Resource'</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-eventStore' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.data.mixin.ResourceStore' rel='Sch.data.mixin.ResourceStore' class='defined-in docClass'>Sch.data.mixin.ResourceStore</a><br/><a href='source/ResourceStore2.html#Sch-data-mixin-ResourceStore-property-eventStore' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.data.mixin.ResourceStore-property-eventStore' class='name expandable'>eventStore</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div><div id='property-model' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.data.ResourceStore'>Sch.data.ResourceStore</span><br/><a href='source/ResourceStore.html#Sch-data-ResourceStore-property-model' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.data.ResourceStore-property-model' class='name expandable'>model</a> : String<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>'Sch.model.Resource'</code></p></div></div></div><div id='property-storeId' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.data.ResourceStore'>Sch.data.ResourceStore</span><br/><a href='source/ResourceStore.html#Sch-data-ResourceStore-property-storeId' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.data.ResourceStore-property-storeId' class='name expandable'>storeId</a> : String<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>'resources'</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.data.ResourceStore'>Sch.data.ResourceStore</span><br/><a href='source/ResourceStore.html#Sch-data-ResourceStore-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/Sch.data.ResourceStore-method-constructor' class='name expandable'>Sch.data.ResourceStore</a>( <span class='pre'></span> ) : <a href=\"#!/api/Sch.data.ResourceStore\" rel=\"Sch.data.ResourceStore\" class=\"docClass\">Sch.data.ResourceStore</a><span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Sch.data.ResourceStore\" rel=\"Sch.data.ResourceStore\" class=\"docClass\">Sch.data.ResourceStore</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getEventStore' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.data.mixin.ResourceStore' rel='Sch.data.mixin.ResourceStore' class='defined-in docClass'>Sch.data.mixin.ResourceStore</a><br/><a href='source/ResourceStore2.html#Sch-data-mixin-ResourceStore-method-getEventStore' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.data.mixin.ResourceStore-method-getEventStore' class='name expandable'>getEventStore</a>( <span class='pre'></span> ) : <a href=\"#!/api/Sch.data.EventStore\" rel=\"Sch.data.EventStore\" class=\"docClass\">Sch.data.EventStore</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Returns the associated event store instance. ...</div><div class='long'><p>Returns the associated event store instance.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Sch.data.EventStore\" rel=\"Sch.data.EventStore\" class=\"docClass\">Sch.data.EventStore</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getModel' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.data.ResourceStore'>Sch.data.ResourceStore</span><br/><a href='source/ResourceStore.html#Sch-data-ResourceStore-cfg-model' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.data.ResourceStore-method-getModel' class='name expandable'>getModel</a>( <span class='pre'></span> ) : String<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns the value of model. ...</div><div class='long'><p>Returns the value of <a href=\"#!/api/Sch.data.ResourceStore-cfg-model\" rel=\"Sch.data.ResourceStore-cfg-model\" class=\"docClass\">model</a>.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getScheduledEventsInTimeSpan' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.data.mixin.ResourceStore' rel='Sch.data.mixin.ResourceStore' class='defined-in docClass'>Sch.data.mixin.ResourceStore</a><br/><a href='source/ResourceStore2.html#Sch-data-mixin-ResourceStore-method-getScheduledEventsInTimeSpan' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.data.mixin.ResourceStore-method-getScheduledEventsInTimeSpan' class='name expandable'>getScheduledEventsInTimeSpan</a>( <span class='pre'>start, end, eventStore</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>start</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>end</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>eventStore</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-setEventStore' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.data.mixin.ResourceStore' rel='Sch.data.mixin.ResourceStore' class='defined-in docClass'>Sch.data.mixin.ResourceStore</a><br/><a href='source/ResourceStore2.html#Sch-data-mixin-ResourceStore-method-setEventStore' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.data.mixin.ResourceStore-method-setEventStore' class='name expandable'>setEventStore</a>( <span class='pre'>eventStore</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Sets the associated event store instance. ...</div><div class='long'><p>Sets the associated event store instance.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>eventStore</span> : <a href=\"#!/api/Sch.data.EventStore\" rel=\"Sch.data.EventStore\" class=\"docClass\">Sch.data.EventStore</a><div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Fires</h3><ul><li><a href=\"#!/api/Sch.data.mixin.ResourceStore-event-eventstorechange\" rel=\"Sch.data.mixin.ResourceStore-event-eventstorechange\" class=\"docClass\">eventstorechange</a></li></ul></div></div></div><div id='method-setModel' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.data.ResourceStore'>Sch.data.ResourceStore</span><br/><a href='source/ResourceStore.html#Sch-data-ResourceStore-cfg-model' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.data.ResourceStore-method-setModel' class='name expandable'>setModel</a>( <span class='pre'>model</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Sets the value of model. ...</div><div class='long'><p>Sets the value of <a href=\"#!/api/Sch.data.ResourceStore-cfg-model\" rel=\"Sch.data.ResourceStore-cfg-model\" class=\"docClass\">model</a>.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>model</span> : String<div class='sub-desc'><p>The new value.</p>\n</div></li></ul></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-event'>Events</h3><div class='subsection'><div id='event-eventstorechange' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.data.mixin.ResourceStore' rel='Sch.data.mixin.ResourceStore' class='defined-in docClass'>Sch.data.mixin.ResourceStore</a><br/><a href='source/ResourceStore2.html#Sch-data-mixin-ResourceStore-event-eventstorechange' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.data.mixin.ResourceStore-event-eventstorechange' class='name expandable'>eventstorechange</a>( <span class='pre'>this, newEventStore, oldEventStore, eOpts</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Fires when new event store is set via setEventStore method. ...</div><div class='long'><p>Fires when new event store is set via <a href=\"#!/api/Sch.data.mixin.ResourceStore-method-setEventStore\" rel=\"Sch.data.mixin.ResourceStore-method-setEventStore\" class=\"docClass\">setEventStore</a> method.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>this</span> : <a href=\"#!/api/Sch.data.ResourceStore\" rel=\"Sch.data.ResourceStore\" class=\"docClass\">Sch.data.ResourceStore</a><div class='sub-desc'>\n</div></li><li><span class='pre'>newEventStore</span> : <a href=\"#!/api/Sch.data.EventStore\" rel=\"Sch.data.EventStore\" class=\"docClass\">Sch.data.EventStore</a>|null<div class='sub-desc'>\n</div></li><li><span class='pre'>oldEventStore</span> : <a href=\"#!/api/Sch.data.EventStore\" rel=\"Sch.data.EventStore\" class=\"docClass\">Sch.data.EventStore</a>|null<div class='sub-desc'>\n</div></li><li><span class='pre'>eOpts</span> : Object<div class='sub-desc'><p>The options object passed to Ext.util.Observable.addListener.</p>\n\n\n\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});