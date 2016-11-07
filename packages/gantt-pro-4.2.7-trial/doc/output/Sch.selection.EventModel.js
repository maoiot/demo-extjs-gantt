Ext.data.JsonP.Sch_selection_EventModel({"tagname":"class","name":"Sch.selection.EventModel","autodetected":{"aliases":true,"alternateClassNames":true,"mixins":true,"requires":true,"uses":true,"members":true,"code_type":true},"files":[{"filename":"EventModel.js","href":"EventModel.html#Sch-selection-EventModel"}],"extends":"Ext.selection.Model","aliases":{"selection":["eventmodel"]},"alternateClassNames":[],"mixins":[],"requires":["Ext.util.KeyNav"],"uses":[],"members":[{"name":"deselectOnContainerClick","tagname":"cfg","owner":"Sch.selection.EventModel","id":"cfg-deselectOnContainerClick","meta":{}},{"name":"selectedOnMouseDown","tagname":"property","owner":"Sch.selection.EventModel","id":"property-selectedOnMouseDown","meta":{"private":true}},{"name":"bindStore","tagname":"method","owner":"Sch.selection.EventModel","id":"method-bindStore","meta":{"private":true}},{"name":"bindToView","tagname":"method","owner":"Sch.selection.EventModel","id":"method-bindToView","meta":{}},{"name":"deselectNode","tagname":"method","owner":"Sch.selection.EventModel","id":"method-deselectNode","meta":{"private":true}},{"name":"forEachEventRelatedSelection","tagname":"method","owner":"Sch.selection.EventModel","id":"method-forEachEventRelatedSelection","meta":{"private":true}},{"name":"getDraggableSelections","tagname":"method","owner":"Sch.selection.EventModel","id":"method-getDraggableSelections","meta":{"private":true}},{"name":"getFirstSelectedEventForResource","tagname":"method","owner":"Sch.selection.EventModel","id":"method-getFirstSelectedEventForResource","meta":{}},{"name":"onEventClick","tagname":"method","owner":"Sch.selection.EventModel","id":"method-onEventClick","meta":{"private":true}},{"name":"onEventMouseDown","tagname":"method","owner":"Sch.selection.EventModel","id":"method-onEventMouseDown","meta":{"private":true}},{"name":"onEventStoreLoad","tagname":"method","owner":"Sch.selection.EventModel","id":"method-onEventStoreLoad","meta":{"private":true}},{"name":"onItemMouseDown","tagname":"method","owner":"Sch.selection.EventModel","id":"method-onItemMouseDown","meta":{"private":true}},{"name":"onSelectChange","tagname":"method","owner":"Sch.selection.EventModel","id":"method-onSelectChange","meta":{"private":true}},{"name":"selectNode","tagname":"method","owner":"Sch.selection.EventModel","id":"method-selectNode","meta":{"private":true}},{"name":"selectRange","tagname":"method","owner":"Sch.selection.EventModel","id":"method-selectRange","meta":{"private":true}},{"name":"beforedeselect","tagname":"event","owner":"Sch.selection.EventModel","id":"event-beforedeselect","meta":{}},{"name":"beforeselect","tagname":"event","owner":"Sch.selection.EventModel","id":"event-beforeselect","meta":{}},{"name":"deselect","tagname":"event","owner":"Sch.selection.EventModel","id":"event-deselect","meta":{}},{"name":"select","tagname":"event","owner":"Sch.selection.EventModel","id":"event-select","meta":{}}],"code_type":"ext_define","id":"class-Sch.selection.EventModel","component":false,"superclasses":["Ext.selection.Model"],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Ext.selection.Model<div class='subclass '><strong>Sch.selection.EventModel</strong></div></div><h4>Requires</h4><div class='dependency'>Ext.util.KeyNav</div><h4>Files</h4><div class='dependency'><a href='source/EventModel.html#Sch-selection-EventModel' target='_blank'>EventModel.js</a></div></pre><div class='doc-contents'><p>This class provides the basic implementation event selection in a grid.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div id='cfg-deselectOnContainerClick' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.selection.EventModel'>Sch.selection.EventModel</span><br/><a href='source/EventModel.html#Sch-selection-EventModel-cfg-deselectOnContainerClick' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.selection.EventModel-cfg-deselectOnContainerClick' class='name expandable'>deselectOnContainerClick</a> : Boolean<span class=\"signature\"></span></div><div class='description'><div class='short'>True to deselect all events when user clicks on the underlying space in scheduler. ...</div><div class='long'><p><code>True</code> to deselect all events when user clicks on the underlying space in scheduler. Defaults to <code>true</code>.</p>\n<p>Defaults to: <code>true</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-selectedOnMouseDown' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.selection.EventModel'>Sch.selection.EventModel</span><br/><a href='source/EventModel.html#Sch-selection-EventModel-property-selectedOnMouseDown' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.selection.EventModel-property-selectedOnMouseDown' class='name expandable'>selectedOnMouseDown</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'><p>Stores selected record on mousedown event to avoid\nunselecting record on click</p>\n</div><div class='long'><p>Stores selected record on mousedown event to avoid\nunselecting record on click</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-bindStore' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.selection.EventModel'>Sch.selection.EventModel</span><br/><a href='source/EventModel.html#Sch-selection-EventModel-method-bindStore' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.selection.EventModel-method-bindStore' class='name expandable'>bindStore</a>( <span class='pre'>eventStore</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>eventStore</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-bindToView' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.selection.EventModel'>Sch.selection.EventModel</span><br/><a href='source/EventModel.html#Sch-selection-EventModel-method-bindToView' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.selection.EventModel-method-bindToView' class='name expandable'>bindToView</a>( <span class='pre'>view</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>view</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-deselectNode' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.selection.EventModel'>Sch.selection.EventModel</span><br/><a href='source/EventModel.html#Sch-selection-EventModel-method-deselectNode' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.selection.EventModel-method-deselectNode' class='name expandable'>deselectNode</a>( <span class='pre'>node, keepExisting, suppressEvent</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>node</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>keepExisting</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>suppressEvent</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-forEachEventRelatedSelection' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.selection.EventModel'>Sch.selection.EventModel</span><br/><a href='source/EventModel.html#Sch-selection-EventModel-method-forEachEventRelatedSelection' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.selection.EventModel-method-forEachEventRelatedSelection' class='name expandable'>forEachEventRelatedSelection</a>( <span class='pre'>eventRecord, fn</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>eventRecord</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>fn</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-getDraggableSelections' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.selection.EventModel'>Sch.selection.EventModel</span><br/><a href='source/EventModel.html#Sch-selection-EventModel-method-getDraggableSelections' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.selection.EventModel-method-getDraggableSelections' class='name expandable'>getDraggableSelections</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-getFirstSelectedEventForResource' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.selection.EventModel'>Sch.selection.EventModel</span><br/><a href='source/EventModel.html#Sch-selection-EventModel-method-getFirstSelectedEventForResource' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.selection.EventModel-method-getFirstSelectedEventForResource' class='name expandable'>getFirstSelectedEventForResource</a>( <span class='pre'>resource</span> ) : <a href=\"#!/api/Sch.model.Event\" rel=\"Sch.model.Event\" class=\"docClass\">Sch.model.Event</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Returns first selected event record for the given resource record or null if the resource has no assigned\nevents whic...</div><div class='long'><p>Returns first selected event record for the given resource record or null if the resource has no assigned\nevents which are selected.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>resource</span> : <a href=\"#!/api/Sch.model.Resource\" rel=\"Sch.model.Resource\" class=\"docClass\">Sch.model.Resource</a><div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Sch.model.Event\" rel=\"Sch.model.Event\" class=\"docClass\">Sch.model.Event</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-onEventClick' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.selection.EventModel'>Sch.selection.EventModel</span><br/><a href='source/EventModel.html#Sch-selection-EventModel-method-onEventClick' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.selection.EventModel-method-onEventClick' class='name expandable'>onEventClick</a>( <span class='pre'>view, record, e</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>view</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>record</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>e</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-onEventMouseDown' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.selection.EventModel'>Sch.selection.EventModel</span><br/><a href='source/EventModel.html#Sch-selection-EventModel-method-onEventMouseDown' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.selection.EventModel-method-onEventMouseDown' class='name expandable'>onEventMouseDown</a>( <span class='pre'>view, record, e</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>view</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>record</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>e</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-onEventStoreLoad' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.selection.EventModel'>Sch.selection.EventModel</span><br/><a href='source/EventModel.html#Sch-selection-EventModel-method-onEventStoreLoad' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.selection.EventModel-method-onEventStoreLoad' class='name expandable'>onEventStoreLoad</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-onItemMouseDown' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.selection.EventModel'>Sch.selection.EventModel</span><br/><a href='source/EventModel.html#Sch-selection-EventModel-method-onItemMouseDown' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.selection.EventModel-method-onItemMouseDown' class='name expandable'>onItemMouseDown</a>( <span class='pre'>a, b, c, d, eventObj</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>a</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>b</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>c</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>d</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>eventObj</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-onSelectChange' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.selection.EventModel'>Sch.selection.EventModel</span><br/><a href='source/EventModel.html#Sch-selection-EventModel-method-onSelectChange' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.selection.EventModel-method-onSelectChange' class='name expandable'>onSelectChange</a>( <span class='pre'>record, isSelected, suppressEvent, commitFn</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>record</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>isSelected</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>suppressEvent</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>commitFn</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-selectNode' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.selection.EventModel'>Sch.selection.EventModel</span><br/><a href='source/EventModel.html#Sch-selection-EventModel-method-selectNode' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.selection.EventModel-method-selectNode' class='name expandable'>selectNode</a>( <span class='pre'>node, keepExisting, suppressEvent</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>node</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>keepExisting</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>suppressEvent</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-selectRange' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.selection.EventModel'>Sch.selection.EventModel</span><br/><a href='source/EventModel.html#Sch-selection-EventModel-method-selectRange' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.selection.EventModel-method-selectRange' class='name expandable'>selectRange</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>Not supported. ...</div><div class='long'><p>Not supported.</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-event'>Events</h3><div class='subsection'><div id='event-beforedeselect' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.selection.EventModel'>Sch.selection.EventModel</span><br/><a href='source/EventModel.html#Sch-selection-EventModel-event-beforedeselect' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.selection.EventModel-event-beforedeselect' class='name expandable'>beforedeselect</a>( <span class='pre'>this, record, eOpts</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Fired before a record is deselected. ...</div><div class='long'><p>Fired before a record is deselected. If any listener returns false, the\ndeselection is cancelled.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>this</span> : <a href=\"#!/api/Sch.selection.EventModel\" rel=\"Sch.selection.EventModel\" class=\"docClass\">Sch.selection.EventModel</a><div class='sub-desc'>\n</div></li><li><span class='pre'>record</span> : <a href=\"#!/api/Sch.model.Event\" rel=\"Sch.model.Event\" class=\"docClass\">Sch.model.Event</a><div class='sub-desc'><p>The selected event</p>\n</div></li><li><span class='pre'>eOpts</span> : Object<div class='sub-desc'><p>The options object passed to Ext.util.Observable.addListener.</p>\n\n\n\n</div></li></ul></div></div></div><div id='event-beforeselect' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.selection.EventModel'>Sch.selection.EventModel</span><br/><a href='source/EventModel.html#Sch-selection-EventModel-event-beforeselect' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.selection.EventModel-event-beforeselect' class='name expandable'>beforeselect</a>( <span class='pre'>this, record, eOpts</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Fired before a record is selected. ...</div><div class='long'><p>Fired before a record is selected. If any listener returns false, the\nselection is cancelled.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>this</span> : <a href=\"#!/api/Sch.selection.EventModel\" rel=\"Sch.selection.EventModel\" class=\"docClass\">Sch.selection.EventModel</a><div class='sub-desc'>\n</div></li><li><span class='pre'>record</span> : <a href=\"#!/api/Sch.model.Event\" rel=\"Sch.model.Event\" class=\"docClass\">Sch.model.Event</a><div class='sub-desc'><p>The selected event</p>\n</div></li><li><span class='pre'>eOpts</span> : Object<div class='sub-desc'><p>The options object passed to Ext.util.Observable.addListener.</p>\n\n\n\n</div></li></ul></div></div></div><div id='event-deselect' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.selection.EventModel'>Sch.selection.EventModel</span><br/><a href='source/EventModel.html#Sch-selection-EventModel-event-deselect' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.selection.EventModel-event-deselect' class='name expandable'>deselect</a>( <span class='pre'>this, record, eOpts</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Fired after a record is deselected ...</div><div class='long'><p>Fired after a record is deselected</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>this</span> : <a href=\"#!/api/Sch.selection.EventModel\" rel=\"Sch.selection.EventModel\" class=\"docClass\">Sch.selection.EventModel</a><div class='sub-desc'>\n</div></li><li><span class='pre'>record</span> : <a href=\"#!/api/Sch.model.Event\" rel=\"Sch.model.Event\" class=\"docClass\">Sch.model.Event</a><div class='sub-desc'><p>The selected event</p>\n</div></li><li><span class='pre'>eOpts</span> : Object<div class='sub-desc'><p>The options object passed to Ext.util.Observable.addListener.</p>\n\n\n\n</div></li></ul></div></div></div><div id='event-select' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.selection.EventModel'>Sch.selection.EventModel</span><br/><a href='source/EventModel.html#Sch-selection-EventModel-event-select' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.selection.EventModel-event-select' class='name expandable'>select</a>( <span class='pre'>this, record, eOpts</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Fired after a record is selected ...</div><div class='long'><p>Fired after a record is selected</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>this</span> : <a href=\"#!/api/Sch.selection.EventModel\" rel=\"Sch.selection.EventModel\" class=\"docClass\">Sch.selection.EventModel</a><div class='sub-desc'>\n</div></li><li><span class='pre'>record</span> : <a href=\"#!/api/Sch.model.Event\" rel=\"Sch.model.Event\" class=\"docClass\">Sch.model.Event</a><div class='sub-desc'><p>The selected event</p>\n</div></li><li><span class='pre'>eOpts</span> : Object<div class='sub-desc'><p>The options object passed to Ext.util.Observable.addListener.</p>\n\n\n\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});