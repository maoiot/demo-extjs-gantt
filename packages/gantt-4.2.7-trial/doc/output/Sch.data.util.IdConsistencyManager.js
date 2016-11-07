Ext.data.JsonP.Sch_data_util_IdConsistencyManager({"tagname":"class","name":"Sch.data.util.IdConsistencyManager","autodetected":{"aliases":true,"alternateClassNames":true,"extends":true,"mixins":true,"requires":true,"uses":true,"members":true,"code_type":true},"files":[{"filename":"IdConsistencyManager.js","href":"IdConsistencyManager.html#Sch-data-util-IdConsistencyManager"}],"private":true,"aliases":{},"alternateClassNames":[],"extends":"Ext.Base","mixins":[],"requires":[],"uses":[],"members":[{"name":"assignmentStore","tagname":"cfg","owner":"Sch.data.util.IdConsistencyManager","id":"cfg-assignmentStore","meta":{"private":true}},{"name":"dependencyStore","tagname":"cfg","owner":"Sch.data.util.IdConsistencyManager","id":"cfg-dependencyStore","meta":{"private":true}},{"name":"eventStore","tagname":"cfg","owner":"Sch.data.util.IdConsistencyManager","id":"cfg-eventStore","meta":{"private":true}},{"name":"resourceStore","tagname":"cfg","owner":"Sch.data.util.IdConsistencyManager","id":"cfg-resourceStore","meta":{"private":true}},{"name":"eventStoreDetacher","tagname":"property","owner":"Sch.data.util.IdConsistencyManager","id":"property-eventStoreDetacher","meta":{"private":true}},{"name":"resourceStoreDetacher","tagname":"property","owner":"Sch.data.util.IdConsistencyManager","id":"property-resourceStoreDetacher","meta":{"private":true}},{"name":"constructor","tagname":"method","owner":"Sch.data.util.IdConsistencyManager","id":"method-constructor","meta":{}},{"name":"getAssignmentStore","tagname":"method","owner":"Sch.data.util.IdConsistencyManager","id":"method-getAssignmentStore","meta":{}},{"name":"getDependencyStore","tagname":"method","owner":"Sch.data.util.IdConsistencyManager","id":"method-getDependencyStore","meta":{}},{"name":"getEventStore","tagname":"method","owner":"Sch.data.util.IdConsistencyManager","id":"method-getEventStore","meta":{}},{"name":"getResourceStore","tagname":"method","owner":"Sch.data.util.IdConsistencyManager","id":"method-getResourceStore","meta":{}},{"name":"getUpdateAssignmentEventIdFieldFn","tagname":"method","owner":"Sch.data.util.IdConsistencyManager","id":"method-getUpdateAssignmentEventIdFieldFn","meta":{"private":true}},{"name":"getUpdateAssignmentResourceIdFieldFn","tagname":"method","owner":"Sch.data.util.IdConsistencyManager","id":"method-getUpdateAssignmentResourceIdFieldFn","meta":{"private":true}},{"name":"getUpdateDependencySourceTargedIdFieldFn","tagname":"method","owner":"Sch.data.util.IdConsistencyManager","id":"method-getUpdateDependencySourceTargedIdFieldFn","meta":{"private":true}},{"name":"getUpdateEventResourceIdFieldFn","tagname":"method","owner":"Sch.data.util.IdConsistencyManager","id":"method-getUpdateEventResourceIdFieldFn","meta":{"private":true}},{"name":"onEventIdChanged","tagname":"method","owner":"Sch.data.util.IdConsistencyManager","id":"method-onEventIdChanged","meta":{"private":true}},{"name":"onResourceIdChanged","tagname":"method","owner":"Sch.data.util.IdConsistencyManager","id":"method-onResourceIdChanged","meta":{"private":true}},{"name":"setAssignmentStore","tagname":"method","owner":"Sch.data.util.IdConsistencyManager","id":"method-setAssignmentStore","meta":{}},{"name":"setDependencyStore","tagname":"method","owner":"Sch.data.util.IdConsistencyManager","id":"method-setDependencyStore","meta":{}},{"name":"setEventStore","tagname":"method","owner":"Sch.data.util.IdConsistencyManager","id":"method-setEventStore","meta":{}},{"name":"setResourceStore","tagname":"method","owner":"Sch.data.util.IdConsistencyManager","id":"method-setResourceStore","meta":{}},{"name":"updateEventStore","tagname":"method","owner":"Sch.data.util.IdConsistencyManager","id":"method-updateEventStore","meta":{"private":true}},{"name":"updateResourceStore","tagname":"method","owner":"Sch.data.util.IdConsistencyManager","id":"method-updateResourceStore","meta":{"private":true}}],"code_type":"ext_define","id":"class-Sch.data.util.IdConsistencyManager","short_doc":"This class manages id consistency among model stores, it listens to 'idchanged' event on each store and updates\nrefer...","component":false,"superclasses":["Ext.Base"],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Ext.Base<div class='subclass '><strong>Sch.data.util.IdConsistencyManager</strong></div></div><h4>Files</h4><div class='dependency'><a href='source/IdConsistencyManager.html#Sch-data-util-IdConsistencyManager' target='_blank'>IdConsistencyManager.js</a></div></pre><div class='doc-contents'><div class='rounded-box private-box'><p><strong>NOTE:</strong> This is a private utility class for internal use by the framework. Don't rely on its existence.</p></div><p>This class manages id consistency among model stores, it listens to 'idchanged' event on each store and updates\nreferential fields referencing records with changed ids in other model entities.</p>\n\n<p>Note on update process:\n at the time when 'idchanged' handler is called we can effectively query stores which are using caches for\n a data cached under old id, but we cannot update related models with the new id since at the time of\n 'idchanged' handler is called a record which id has been updated is still marked as phantom, it's\n phantom flag will be reset only at 'update' event time (and 'idchanged' event is always followed by 'update'\n event) and it's important we start updating related records after primary records are not phantoms\n any more since we might rely on this flag (for example a related store sync operation might be blocked\n if primary store records it relies on are still phantom).</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div id='cfg-assignmentStore' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.data.util.IdConsistencyManager'>Sch.data.util.IdConsistencyManager</span><br/><a href='source/IdConsistencyManager.html#Sch-data-util-IdConsistencyManager-cfg-assignmentStore' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.data.util.IdConsistencyManager-cfg-assignmentStore' class='name expandable'>assignmentStore</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div><div id='cfg-dependencyStore' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.data.util.IdConsistencyManager'>Sch.data.util.IdConsistencyManager</span><br/><a href='source/IdConsistencyManager.html#Sch-data-util-IdConsistencyManager-cfg-dependencyStore' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.data.util.IdConsistencyManager-cfg-dependencyStore' class='name expandable'>dependencyStore</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div><div id='cfg-eventStore' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.data.util.IdConsistencyManager'>Sch.data.util.IdConsistencyManager</span><br/><a href='source/IdConsistencyManager.html#Sch-data-util-IdConsistencyManager-cfg-eventStore' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.data.util.IdConsistencyManager-cfg-eventStore' class='name expandable'>eventStore</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div><div id='cfg-resourceStore' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.data.util.IdConsistencyManager'>Sch.data.util.IdConsistencyManager</span><br/><a href='source/IdConsistencyManager.html#Sch-data-util-IdConsistencyManager-cfg-resourceStore' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.data.util.IdConsistencyManager-cfg-resourceStore' class='name expandable'>resourceStore</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-eventStoreDetacher' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.data.util.IdConsistencyManager'>Sch.data.util.IdConsistencyManager</span><br/><a href='source/IdConsistencyManager.html#Sch-data-util-IdConsistencyManager-property-eventStoreDetacher' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.data.util.IdConsistencyManager-property-eventStoreDetacher' class='name expandable'>eventStoreDetacher</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div><div id='property-resourceStoreDetacher' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.data.util.IdConsistencyManager'>Sch.data.util.IdConsistencyManager</span><br/><a href='source/IdConsistencyManager.html#Sch-data-util-IdConsistencyManager-property-resourceStoreDetacher' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.data.util.IdConsistencyManager-property-resourceStoreDetacher' class='name expandable'>resourceStoreDetacher</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.data.util.IdConsistencyManager'>Sch.data.util.IdConsistencyManager</span><br/><a href='source/IdConsistencyManager.html#Sch-data-util-IdConsistencyManager-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/Sch.data.util.IdConsistencyManager-method-constructor' class='name expandable'>Sch.data.util.IdConsistencyManager</a>( <span class='pre'>config</span> ) : <a href=\"#!/api/Sch.data.util.IdConsistencyManager\" rel=\"Sch.data.util.IdConsistencyManager\" class=\"docClass\">Sch.data.util.IdConsistencyManager</a><span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : Object<div class='sub-desc'></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Sch.data.util.IdConsistencyManager\" rel=\"Sch.data.util.IdConsistencyManager\" class=\"docClass\">Sch.data.util.IdConsistencyManager</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getAssignmentStore' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.data.util.IdConsistencyManager'>Sch.data.util.IdConsistencyManager</span><br/><a href='source/IdConsistencyManager.html#Sch-data-util-IdConsistencyManager-cfg-assignmentStore' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.data.util.IdConsistencyManager-method-getAssignmentStore' class='name expandable'>getAssignmentStore</a>( <span class='pre'></span> ) : Object<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns the value of assignmentStore. ...</div><div class='long'><p>Returns the value of <a href=\"#!/api/Sch.data.util.IdConsistencyManager-cfg-assignmentStore\" rel=\"Sch.data.util.IdConsistencyManager-cfg-assignmentStore\" class=\"docClass\">assignmentStore</a>.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getDependencyStore' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.data.util.IdConsistencyManager'>Sch.data.util.IdConsistencyManager</span><br/><a href='source/IdConsistencyManager.html#Sch-data-util-IdConsistencyManager-cfg-dependencyStore' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.data.util.IdConsistencyManager-method-getDependencyStore' class='name expandable'>getDependencyStore</a>( <span class='pre'></span> ) : Object<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns the value of dependencyStore. ...</div><div class='long'><p>Returns the value of <a href=\"#!/api/Sch.data.util.IdConsistencyManager-cfg-dependencyStore\" rel=\"Sch.data.util.IdConsistencyManager-cfg-dependencyStore\" class=\"docClass\">dependencyStore</a>.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getEventStore' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.data.util.IdConsistencyManager'>Sch.data.util.IdConsistencyManager</span><br/><a href='source/IdConsistencyManager.html#Sch-data-util-IdConsistencyManager-cfg-eventStore' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.data.util.IdConsistencyManager-method-getEventStore' class='name expandable'>getEventStore</a>( <span class='pre'></span> ) : Object<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns the value of eventStore. ...</div><div class='long'><p>Returns the value of <a href=\"#!/api/Sch.data.util.IdConsistencyManager-cfg-eventStore\" rel=\"Sch.data.util.IdConsistencyManager-cfg-eventStore\" class=\"docClass\">eventStore</a>.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getResourceStore' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.data.util.IdConsistencyManager'>Sch.data.util.IdConsistencyManager</span><br/><a href='source/IdConsistencyManager.html#Sch-data-util-IdConsistencyManager-cfg-resourceStore' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.data.util.IdConsistencyManager-method-getResourceStore' class='name expandable'>getResourceStore</a>( <span class='pre'></span> ) : Object<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns the value of resourceStore. ...</div><div class='long'><p>Returns the value of <a href=\"#!/api/Sch.data.util.IdConsistencyManager-cfg-resourceStore\" rel=\"Sch.data.util.IdConsistencyManager-cfg-resourceStore\" class=\"docClass\">resourceStore</a>.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getUpdateAssignmentEventIdFieldFn' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.data.util.IdConsistencyManager'>Sch.data.util.IdConsistencyManager</span><br/><a href='source/IdConsistencyManager.html#Sch-data-util-IdConsistencyManager-method-getUpdateAssignmentEventIdFieldFn' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.data.util.IdConsistencyManager-method-getUpdateAssignmentEventIdFieldFn' class='name expandable'>getUpdateAssignmentEventIdFieldFn</a>( <span class='pre'>assignmentStore, oldId, newId</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>assignmentStore</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>oldId</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>newId</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-getUpdateAssignmentResourceIdFieldFn' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.data.util.IdConsistencyManager'>Sch.data.util.IdConsistencyManager</span><br/><a href='source/IdConsistencyManager.html#Sch-data-util-IdConsistencyManager-method-getUpdateAssignmentResourceIdFieldFn' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.data.util.IdConsistencyManager-method-getUpdateAssignmentResourceIdFieldFn' class='name expandable'>getUpdateAssignmentResourceIdFieldFn</a>( <span class='pre'>assignmentStore, oldId, newId</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>assignmentStore</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>oldId</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>newId</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-getUpdateDependencySourceTargedIdFieldFn' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.data.util.IdConsistencyManager'>Sch.data.util.IdConsistencyManager</span><br/><a href='source/IdConsistencyManager.html#Sch-data-util-IdConsistencyManager-method-getUpdateDependencySourceTargedIdFieldFn' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.data.util.IdConsistencyManager-method-getUpdateDependencySourceTargedIdFieldFn' class='name expandable'>getUpdateDependencySourceTargedIdFieldFn</a>( <span class='pre'>dependencyStore, oldId, newId</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>dependencyStore</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>oldId</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>newId</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-getUpdateEventResourceIdFieldFn' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.data.util.IdConsistencyManager'>Sch.data.util.IdConsistencyManager</span><br/><a href='source/IdConsistencyManager.html#Sch-data-util-IdConsistencyManager-method-getUpdateEventResourceIdFieldFn' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.data.util.IdConsistencyManager-method-getUpdateEventResourceIdFieldFn' class='name expandable'>getUpdateEventResourceIdFieldFn</a>( <span class='pre'>eventStore, oldId, newId</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>{{{ Update rules ...</div><div class='long'><p>{{{ Update rules</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>eventStore</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>oldId</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>newId</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-onEventIdChanged' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.data.util.IdConsistencyManager'>Sch.data.util.IdConsistencyManager</span><br/><a href='source/IdConsistencyManager.html#Sch-data-util-IdConsistencyManager-method-onEventIdChanged' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.data.util.IdConsistencyManager-method-onEventIdChanged' class='name expandable'>onEventIdChanged</a>( <span class='pre'>eventStore, event, oldId, newId</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>Please see the note at the class description ...</div><div class='long'><p>Please see the note at the class description</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>eventStore</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>event</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>oldId</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>newId</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-onResourceIdChanged' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.data.util.IdConsistencyManager'>Sch.data.util.IdConsistencyManager</span><br/><a href='source/IdConsistencyManager.html#Sch-data-util-IdConsistencyManager-method-onResourceIdChanged' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.data.util.IdConsistencyManager-method-onResourceIdChanged' class='name expandable'>onResourceIdChanged</a>( <span class='pre'>resourceStore, resource, oldId, newId</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>Please see the note at the class description ...</div><div class='long'><p>Please see the note at the class description</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>resourceStore</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>resource</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>oldId</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>newId</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-setAssignmentStore' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.data.util.IdConsistencyManager'>Sch.data.util.IdConsistencyManager</span><br/><a href='source/IdConsistencyManager.html#Sch-data-util-IdConsistencyManager-cfg-assignmentStore' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.data.util.IdConsistencyManager-method-setAssignmentStore' class='name expandable'>setAssignmentStore</a>( <span class='pre'>assignmentStore</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Sets the value of assignmentStore. ...</div><div class='long'><p>Sets the value of <a href=\"#!/api/Sch.data.util.IdConsistencyManager-cfg-assignmentStore\" rel=\"Sch.data.util.IdConsistencyManager-cfg-assignmentStore\" class=\"docClass\">assignmentStore</a>.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>assignmentStore</span> : Object<div class='sub-desc'><p>The new value.</p>\n</div></li></ul></div></div></div><div id='method-setDependencyStore' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.data.util.IdConsistencyManager'>Sch.data.util.IdConsistencyManager</span><br/><a href='source/IdConsistencyManager.html#Sch-data-util-IdConsistencyManager-cfg-dependencyStore' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.data.util.IdConsistencyManager-method-setDependencyStore' class='name expandable'>setDependencyStore</a>( <span class='pre'>dependencyStore</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Sets the value of dependencyStore. ...</div><div class='long'><p>Sets the value of <a href=\"#!/api/Sch.data.util.IdConsistencyManager-cfg-dependencyStore\" rel=\"Sch.data.util.IdConsistencyManager-cfg-dependencyStore\" class=\"docClass\">dependencyStore</a>.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>dependencyStore</span> : Object<div class='sub-desc'><p>The new value.</p>\n</div></li></ul></div></div></div><div id='method-setEventStore' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.data.util.IdConsistencyManager'>Sch.data.util.IdConsistencyManager</span><br/><a href='source/IdConsistencyManager.html#Sch-data-util-IdConsistencyManager-cfg-eventStore' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.data.util.IdConsistencyManager-method-setEventStore' class='name expandable'>setEventStore</a>( <span class='pre'>eventStore</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Sets the value of eventStore. ...</div><div class='long'><p>Sets the value of <a href=\"#!/api/Sch.data.util.IdConsistencyManager-cfg-eventStore\" rel=\"Sch.data.util.IdConsistencyManager-cfg-eventStore\" class=\"docClass\">eventStore</a>.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>eventStore</span> : Object<div class='sub-desc'><p>The new value.</p>\n</div></li></ul></div></div></div><div id='method-setResourceStore' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.data.util.IdConsistencyManager'>Sch.data.util.IdConsistencyManager</span><br/><a href='source/IdConsistencyManager.html#Sch-data-util-IdConsistencyManager-cfg-resourceStore' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.data.util.IdConsistencyManager-method-setResourceStore' class='name expandable'>setResourceStore</a>( <span class='pre'>resourceStore</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Sets the value of resourceStore. ...</div><div class='long'><p>Sets the value of <a href=\"#!/api/Sch.data.util.IdConsistencyManager-cfg-resourceStore\" rel=\"Sch.data.util.IdConsistencyManager-cfg-resourceStore\" class=\"docClass\">resourceStore</a>.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>resourceStore</span> : Object<div class='sub-desc'><p>The new value.</p>\n</div></li></ul></div></div></div><div id='method-updateEventStore' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.data.util.IdConsistencyManager'>Sch.data.util.IdConsistencyManager</span><br/><a href='source/IdConsistencyManager.html#Sch-data-util-IdConsistencyManager-method-updateEventStore' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.data.util.IdConsistencyManager-method-updateEventStore' class='name expandable'>updateEventStore</a>( <span class='pre'>newEventStore, oldEventStore</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>{{{ Event attachers ...</div><div class='long'><p>{{{ Event attachers</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>newEventStore</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>oldEventStore</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-updateResourceStore' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.data.util.IdConsistencyManager'>Sch.data.util.IdConsistencyManager</span><br/><a href='source/IdConsistencyManager.html#Sch-data-util-IdConsistencyManager-method-updateResourceStore' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.data.util.IdConsistencyManager-method-updateResourceStore' class='name expandable'>updateResourceStore</a>( <span class='pre'>newResourceStore, oldResourceStore</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>newResourceStore</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>oldResourceStore</span> : Object<div class='sub-desc'></div></li></ul></div></div></div></div></div></div></div>","meta":{"private":true}});