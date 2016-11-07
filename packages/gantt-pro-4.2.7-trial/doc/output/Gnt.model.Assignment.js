Ext.data.JsonP.Gnt_model_Assignment({"tagname":"class","name":"Gnt.model.Assignment","autodetected":{"aliases":true,"alternateClassNames":true,"extends":true,"mixins":true,"requires":true,"uses":true,"members":true,"code_type":true},"files":[{"filename":"Assignment.js","href":"Assignment3.html#Gnt-model-Assignment"}],"aliases":{},"alternateClassNames":[],"extends":"Sch.model.Assignment","mixins":[],"requires":[],"uses":["Sch.util.Date"],"members":[{"name":"customizableFields","tagname":"cfg","owner":"Gnt.model.Assignment","id":"cfg-customizableFields","meta":{}},{"name":"eventIdField","tagname":"cfg","owner":"Gnt.model.Assignment","id":"cfg-eventIdField","meta":{}},{"name":"resourceIdField","tagname":"cfg","owner":"Sch.model.Assignment","id":"cfg-resourceIdField","meta":{}},{"name":"taskIdField","tagname":"cfg","owner":"Gnt.model.Assignment","id":"cfg-taskIdField","meta":{}},{"name":"unitsField","tagname":"cfg","owner":"Gnt.model.Assignment","id":"cfg-unitsField","meta":{}},{"name":"idProperty","tagname":"property","owner":"Sch.model.Assignment","id":"property-idProperty","meta":{"private":true}},{"name":"constructor","tagname":"method","owner":"Gnt.model.Assignment","id":"method-constructor","meta":{}},{"name":"fullCopy","tagname":"method","owner":"Sch.model.Assignment","id":"method-fullCopy","meta":{"private":true}},{"name":"getAssignmentStore","tagname":"method","owner":"Sch.model.Assignment","id":"method-getAssignmentStore","meta":{}},{"name":"getEffort","tagname":"method","owner":"Gnt.model.Assignment","id":"method-getEffort","meta":{}},{"name":"getEffortAtDate","tagname":"method","owner":"Gnt.model.Assignment","id":"method-getEffortAtDate","meta":{}},{"name":"getEvent","tagname":"method","owner":"Sch.model.Assignment","id":"method-getEvent","meta":{}},{"name":"getEventId","tagname":"method","owner":"Gnt.model.Assignment","id":"method-getEventId","meta":{"private":true}},{"name":"getEventName","tagname":"method","owner":"Sch.model.Assignment","id":"method-getEventName","meta":{}},{"name":"getEventStore","tagname":"method","owner":"Gnt.model.Assignment","id":"method-getEventStore","meta":{}},{"name":"getInternalId","tagname":"method","owner":"Sch.model.Assignment","id":"method-getInternalId","meta":{"private":true}},{"name":"getResource","tagname":"method","owner":"Sch.model.Assignment","id":"method-getResource","meta":{}},{"name":"getResourceName","tagname":"method","owner":"Sch.model.Assignment","id":"method-getResourceName","meta":{}},{"name":"getResourceStore","tagname":"method","owner":"Sch.model.Assignment","id":"method-getResourceStore","meta":{}},{"name":"getTask","tagname":"method","owner":"Gnt.model.Assignment","id":"method-getTask","meta":{}},{"name":"getTaskName","tagname":"method","owner":"Gnt.model.Assignment","id":"method-getTaskName","meta":{}},{"name":"getTaskStore","tagname":"method","owner":"Gnt.model.Assignment","id":"method-getTaskStore","meta":{}},{"name":"getUnits","tagname":"method","owner":"Gnt.model.Assignment","id":"method-getUnits","meta":{}},{"name":"isPersistable","tagname":"method","owner":"Sch.model.Assignment","id":"method-isPersistable","meta":{}},{"name":"setEventId","tagname":"method","owner":"Gnt.model.Assignment","id":"method-setEventId","meta":{"private":true}},{"name":"setUnits","tagname":"method","owner":"Gnt.model.Assignment","id":"method-setUnits","meta":{}}],"code_type":"ext_define","id":"class-Gnt.model.Assignment","short_doc":"This class represent a single assignment of a resource to a task in your gantt chart. ...","component":false,"superclasses":["Ext.data.Model","Sch.model.Customizable","Sch.model.Assignment"],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Ext.data.Model<div class='subclass '><a href='#!/api/Sch.model.Customizable' rel='Sch.model.Customizable' class='docClass'>Sch.model.Customizable</a><div class='subclass '><a href='#!/api/Sch.model.Assignment' rel='Sch.model.Assignment' class='docClass'>Sch.model.Assignment</a><div class='subclass '><strong>Gnt.model.Assignment</strong></div></div></div></div><h4>Uses</h4><div class='dependency'><a href='#!/api/Sch.util.Date' rel='Sch.util.Date' class='docClass'>Sch.util.Date</a></div><h4>Files</h4><div class='dependency'><a href='source/Assignment3.html#Gnt-model-Assignment' target='_blank'>Assignment.js</a></div></pre><div class='doc-contents'><p>This class represent a single assignment of a resource to a task in your gantt chart. It is a subclass of the <a href=\"#!/api/Sch.model.Customizable\" rel=\"Sch.model.Customizable\" class=\"docClass\">Sch.model.Customizable</a> class, which in its turn subclasses Ext.data.Model.\nPlease refer to documentation of those classes to become familar with the base interface of this class.</p>\n\n<p>An Assignment has the following fields:</p>\n\n<ul>\n<li><code>Id</code> - The id of the assignment</li>\n<li><code>ResourceId</code> - The id of the resource assigned</li>\n<li><code>TaskId</code> - The id of the task to which the resource is assigned</li>\n<li><code>Units</code> - An integer value representing how much of the resource's availability that is dedicated to this task</li>\n</ul>\n\n\n<p>The names of these fields can be customized by subclassing this class. Please refer to <a href=\"#!/api/Sch.model.Customizable\" rel=\"Sch.model.Customizable\" class=\"docClass\">Sch.model.Customizable</a> for details.</p>\n\n<p>See also: <a href=\"#!/api/Gnt.column.ResourceAssignment\" rel=\"Gnt.column.ResourceAssignment\" class=\"docClass\">Gnt.column.ResourceAssignment</a></p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div id='cfg-customizableFields' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.model.Assignment'>Gnt.model.Assignment</span><br/><a href='source/Assignment3.html#Gnt-model-Assignment-cfg-customizableFields' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.model.Assignment-cfg-customizableFields' class='name expandable'>customizableFields</a> : Array<span class=\"signature\"></span></div><div class='description'><div class='short'>The array of customizale fields definitions. ...</div><div class='long'><p>The array of customizale fields definitions.</p>\n<p>Defaults to: <code>[{name: 'TaskId'}, {name: 'Units', type: 'float', defaultValue: 100}]</code></p><p>Overrides: <a href=\"#!/api/Sch.model.Assignment-cfg-customizableFields\" rel=\"Sch.model.Assignment-cfg-customizableFields\" class=\"docClass\">Sch.model.Assignment.customizableFields</a></p></div></div></div><div id='cfg-eventIdField' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.model.Assignment'>Gnt.model.Assignment</span><br/><a href='source/Assignment3.html#Gnt-model-Assignment-cfg-eventIdField' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.model.Assignment-cfg-eventIdField' class='name expandable'>eventIdField</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'>The name of the field identifying an event to which an assignment belongs. ...</div><div class='long'><p>The name of the field identifying an event to which an assignment belongs.\nDefaults to \"EventId\".</p>\n<p>Defaults to: <code>'TaskId'</code></p><p>Overrides: <a href=\"#!/api/Sch.model.Assignment-cfg-eventIdField\" rel=\"Sch.model.Assignment-cfg-eventIdField\" class=\"docClass\">Sch.model.Assignment.eventIdField</a></p></div></div></div><div id='cfg-resourceIdField' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.model.Assignment' rel='Sch.model.Assignment' class='defined-in docClass'>Sch.model.Assignment</a><br/><a href='source/Assignment.html#Sch-model-Assignment-cfg-resourceIdField' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.model.Assignment-cfg-resourceIdField' class='name expandable'>resourceIdField</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'>The name of the field identifying the resource to which an assignment belongs. ...</div><div class='long'><p>The name of the field identifying the resource to which an assignment belongs.\nDefaults to \"ResourceId\".</p>\n<p>Defaults to: <code>'ResourceId'</code></p></div></div></div><div id='cfg-taskIdField' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.model.Assignment'>Gnt.model.Assignment</span><br/><a href='source/Assignment3.html#Gnt-model-Assignment-cfg-taskIdField' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.model.Assignment-cfg-taskIdField' class='name expandable'>taskIdField</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'>The name of the field identifying the task to which an event belongs. ...</div><div class='long'><p>The name of the field identifying the task to which an event belongs. Defaults to \"TaskId\".</p>\n<p>Defaults to: <code>'TaskId'</code></p></div></div></div><div id='cfg-unitsField' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.model.Assignment'>Gnt.model.Assignment</span><br/><a href='source/Assignment3.html#Gnt-model-Assignment-cfg-unitsField' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.model.Assignment-cfg-unitsField' class='name expandable'>unitsField</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'>The name of the field identifying the units of this assignment. ...</div><div class='long'><p>The name of the field identifying the units of this assignment. Defaults to \"Units\".</p>\n<p>Defaults to: <code>'Units'</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-idProperty' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.model.Assignment' rel='Sch.model.Assignment' class='defined-in docClass'>Sch.model.Assignment</a><br/><a href='source/Assignment.html#Sch-model-Assignment-property-idProperty' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.model.Assignment-property-idProperty' class='name expandable'>idProperty</a> : String<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>'Id'</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.model.Assignment'>Gnt.model.Assignment</span><br/><a href='source/Assignment3.html#Gnt-model-Assignment-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/Gnt.model.Assignment-method-constructor' class='name expandable'>Gnt.model.Assignment</a>( <span class='pre'>data, session</span> ) : <a href=\"#!/api/Gnt.model.Assignment\" rel=\"Gnt.model.Assignment\" class=\"docClass\">Gnt.model.Assignment</a><span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>data</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>session</span> : Object<div class='sub-desc'></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Gnt.model.Assignment\" rel=\"Gnt.model.Assignment\" class=\"docClass\">Gnt.model.Assignment</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-fullCopy' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.model.Assignment' rel='Sch.model.Assignment' class='defined-in docClass'>Sch.model.Assignment</a><br/><a href='source/Assignment.html#Sch-model-Assignment-method-fullCopy' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.model.Assignment-method-fullCopy' class='name expandable'>fullCopy</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-getAssignmentStore' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.model.Assignment' rel='Sch.model.Assignment' class='defined-in docClass'>Sch.model.Assignment</a><br/><a href='source/Assignment.html#Sch-model-Assignment-method-getAssignmentStore' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.model.Assignment-method-getAssignmentStore' class='name expandable'>getAssignmentStore</a>( <span class='pre'></span> ) : <a href=\"#!/api/Sch.data.AssignmentStore\" rel=\"Sch.data.AssignmentStore\" class=\"docClass\">Sch.data.AssignmentStore</a>|null<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns an assigment store this assignment is part of. ...</div><div class='long'><p>Returns an assigment store this assignment is part of. Assignment must be part of an assigment store\nto be able to retrieve it.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Sch.data.AssignmentStore\" rel=\"Sch.data.AssignmentStore\" class=\"docClass\">Sch.data.AssignmentStore</a>|null</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getEffort' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.model.Assignment'>Gnt.model.Assignment</span><br/><a href='source/Assignment3.html#Gnt-model-Assignment-method-getEffort' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.model.Assignment-method-getEffort' class='name expandable'>getEffort</a>( <span class='pre'>unit</span> ) : Number<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns the effort, contributed by the resource of this assignment to a task of this assignment. ...</div><div class='long'><p>Returns the effort, contributed by the resource of this assignment to a task of this assignment.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>unit</span> : String<div class='sub-desc'><p>Unit to return the effort in. Defaults to the <code>EffortUnit</code> field of the task</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Number</span><div class='sub-desc'><p>effort</p>\n</div></li></ul></div></div></div><div id='method-getEffortAtDate' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.model.Assignment'>Gnt.model.Assignment</span><br/><a href='source/Assignment3.html#Gnt-model-Assignment-method-getEffortAtDate' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.model.Assignment-method-getEffortAtDate' class='name expandable'>getEffortAtDate</a>( <span class='pre'>date, [unit]</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns an effort which will be spent by the resource assignment designated resource on the assignment\ndesignated tas...</div><div class='long'><p>Returns an effort which will be spent by the resource assignment designated resource on the assignment\ndesignated task at the given date.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>date</span> : Date<div class='sub-desc'>\n</div></li><li><span class='pre'>unit</span> : String (optional)<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getEvent' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.model.Assignment' rel='Sch.model.Assignment' class='defined-in docClass'>Sch.model.Assignment</a><br/><a href='source/Assignment.html#Sch-model-Assignment-method-getEvent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.model.Assignment-method-getEvent' class='name expandable'>getEvent</a>( <span class='pre'>eventStore</span> ) : <a href=\"#!/api/Sch.model.Range\" rel=\"Sch.model.Range\" class=\"docClass\">Sch.model.Range</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Returns an event associated with this assignment. ...</div><div class='long'><p>Returns an event associated with this assignment.</p>\n\n<p>@privateparam  {<a href=\"#!/api/Sch.data.EventStore\" rel=\"Sch.data.EventStore\" class=\"docClass\">Sch.data.EventStore</a>} [eventStore]</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>eventStore</span> : Object<div class='sub-desc'></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Sch.model.Range\" rel=\"Sch.model.Range\" class=\"docClass\">Sch.model.Range</a></span><div class='sub-desc'><p>Event instance</p>\n</div></li></ul></div></div></div><div id='method-getEventId' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.model.Assignment'>Gnt.model.Assignment</span><br/><a href='source/Assignment3.html#Gnt-model-Assignment-method-getEventId' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.model.Assignment-method-getEventId' class='name expandable'>getEventId</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-getEventName' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.model.Assignment' rel='Sch.model.Assignment' class='defined-in docClass'>Sch.model.Assignment</a><br/><a href='source/Assignment.html#Sch-model-Assignment-method-getEventName' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.model.Assignment-method-getEventName' class='name expandable'>getEventName</a>( <span class='pre'>eventStore</span> ) : String<span class=\"signature\"></span></div><div class='description'><div class='short'>Convenience method to get a name of the associated event. ...</div><div class='long'><p>Convenience method to get a name of the associated event.</p>\n\n<p>@privateparam  {<a href=\"#!/api/Sch.data.EventStore\" rel=\"Sch.data.EventStore\" class=\"docClass\">Sch.data.EventStore</a>} [eventStore]</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>eventStore</span> : Object<div class='sub-desc'></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'><p>name</p>\n</div></li></ul></div></div></div><div id='method-getEventStore' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.model.Assignment'>Gnt.model.Assignment</span><br/><a href='source/Assignment3.html#Gnt-model-Assignment-method-getEventStore' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.model.Assignment-method-getEventStore' class='name expandable'>getEventStore</a>( <span class='pre'></span> ) : <a href=\"#!/api/Sch.data.EventStore\" rel=\"Sch.data.EventStore\" class=\"docClass\">Sch.data.EventStore</a>|null<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns an event store this assignment uses as default event store. ...</div><div class='long'><p>Returns an event store this assignment uses as default event store. Assignment must be part\nof an assignment store to be able to retrieve default event store.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Sch.data.EventStore\" rel=\"Sch.data.EventStore\" class=\"docClass\">Sch.data.EventStore</a>|null</span><div class='sub-desc'>\n</div></li></ul><p>Overrides: <a href=\"#!/api/Sch.model.Assignment-method-getEventStore\" rel=\"Sch.model.Assignment-method-getEventStore\" class=\"docClass\">Sch.model.Assignment.getEventStore</a></p></div></div></div><div id='method-getInternalId' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.model.Assignment' rel='Sch.model.Assignment' class='defined-in docClass'>Sch.model.Assignment</a><br/><a href='source/Assignment.html#Sch-model-Assignment-method-getInternalId' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.model.Assignment-method-getInternalId' class='name expandable'>getInternalId</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-getResource' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.model.Assignment' rel='Sch.model.Assignment' class='defined-in docClass'>Sch.model.Assignment</a><br/><a href='source/Assignment.html#Sch-model-Assignment-method-getResource' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.model.Assignment-method-getResource' class='name expandable'>getResource</a>( <span class='pre'>resourceStore</span> ) : <a href=\"#!/api/Sch.model.Resource\" rel=\"Sch.model.Resource\" class=\"docClass\">Sch.model.Resource</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Returns the resource associated with this assignment. ...</div><div class='long'><p>Returns the resource associated with this assignment.</p>\n\n<p>@privateparam {<a href=\"#!/api/Sch.data.ResourceStore\" rel=\"Sch.data.ResourceStore\" class=\"docClass\">Sch.data.ResourceStore</a>} [resourceStore]</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>resourceStore</span> : Object<div class='sub-desc'></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Sch.model.Resource\" rel=\"Sch.model.Resource\" class=\"docClass\">Sch.model.Resource</a></span><div class='sub-desc'><p>Instance of resource</p>\n</div></li></ul></div></div></div><div id='method-getResourceName' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.model.Assignment' rel='Sch.model.Assignment' class='defined-in docClass'>Sch.model.Assignment</a><br/><a href='source/Assignment.html#Sch-model-Assignment-method-getResourceName' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.model.Assignment-method-getResourceName' class='name expandable'>getResourceName</a>( <span class='pre'>resourceStore</span> ) : String<span class=\"signature\"></span></div><div class='description'><div class='short'>Convenience method to get a name of the associated resource. ...</div><div class='long'><p>Convenience method to get a name of the associated resource.</p>\n\n<p>@privateparam {<a href=\"#!/api/Sch.data.ResourceStore\" rel=\"Sch.data.ResourceStore\" class=\"docClass\">Sch.data.ResourceStore</a>} [resourceStore]</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>resourceStore</span> : Object<div class='sub-desc'></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'><p>name</p>\n</div></li></ul></div></div></div><div id='method-getResourceStore' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.model.Assignment' rel='Sch.model.Assignment' class='defined-in docClass'>Sch.model.Assignment</a><br/><a href='source/Assignment.html#Sch-model-Assignment-method-getResourceStore' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.model.Assignment-method-getResourceStore' class='name expandable'>getResourceStore</a>( <span class='pre'></span> ) : <a href=\"#!/api/Sch.data.ResourceStore\" rel=\"Sch.data.ResourceStore\" class=\"docClass\">Sch.data.ResourceStore</a>|null<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns a resource store this assignment uses as default resource store. ...</div><div class='long'><p>Returns a resource store this assignment uses as default resource store. Assignment must be part\nof an assignment store to be able to retrieve default resource store.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Sch.data.ResourceStore\" rel=\"Sch.data.ResourceStore\" class=\"docClass\">Sch.data.ResourceStore</a>|null</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getTask' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.model.Assignment'>Gnt.model.Assignment</span><br/><a href='source/Assignment3.html#Gnt-model-Assignment-method-getTask' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.model.Assignment-method-getTask' class='name expandable'>getTask</a>( <span class='pre'>taskStore</span> ) : <a href=\"#!/api/Gnt.model.Task\" rel=\"Gnt.model.Task\" class=\"docClass\">Gnt.model.Task</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Returns the task associated with this assignment. ...</div><div class='long'><p>Returns the task associated with this assignment.</p>\n\n<p>@privateparam {<a href=\"#!/api/Gnt.data.TaskStore\" rel=\"Gnt.data.TaskStore\" class=\"docClass\">Gnt.data.TaskStore</a>} [taskStore]</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>taskStore</span> : Object<div class='sub-desc'></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Gnt.model.Task\" rel=\"Gnt.model.Task\" class=\"docClass\">Gnt.model.Task</a></span><div class='sub-desc'><p>Instance of task</p>\n</div></li></ul></div></div></div><div id='method-getTaskName' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.model.Assignment'>Gnt.model.Assignment</span><br/><a href='source/Assignment3.html#Gnt-model-Assignment-method-getTaskName' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.model.Assignment-method-getTaskName' class='name expandable'>getTaskName</a>( <span class='pre'>taskStore</span> ) : String<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns associated task name\n\n@privateparam {Gnt.data.TaskStore} [taskStore] ...</div><div class='long'><p>Returns associated task name</p>\n\n<p>@privateparam {<a href=\"#!/api/Gnt.data.TaskStore\" rel=\"Gnt.data.TaskStore\" class=\"docClass\">Gnt.data.TaskStore</a>} [taskStore]</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>taskStore</span> : Object<div class='sub-desc'></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getTaskStore' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.model.Assignment'>Gnt.model.Assignment</span><br/><a href='source/Assignment3.html#Gnt-model-Assignment-method-getTaskStore' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.model.Assignment-method-getTaskStore' class='name expandable'>getTaskStore</a>( <span class='pre'></span> ) : <a href=\"#!/api/Gnt.data.TaskStore\" rel=\"Gnt.data.TaskStore\" class=\"docClass\">Gnt.data.TaskStore</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Returns the associated task store instance ...</div><div class='long'><p>Returns the associated task store instance</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Gnt.data.TaskStore\" rel=\"Gnt.data.TaskStore\" class=\"docClass\">Gnt.data.TaskStore</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getUnits' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.model.Assignment'>Gnt.model.Assignment</span><br/><a href='source/Assignment3.html#Gnt-model-Assignment-method-getUnits' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.model.Assignment-method-getUnits' class='name expandable'>getUnits</a>( <span class='pre'></span> ) : Number<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns the units of this assignment ...</div><div class='long'><p>Returns the units of this assignment</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Number</span><div class='sub-desc'><p>units</p>\n</div></li></ul></div></div></div><div id='method-isPersistable' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.model.Assignment' rel='Sch.model.Assignment' class='defined-in docClass'>Sch.model.Assignment</a><br/><a href='source/Assignment.html#Sch-model-Assignment-method-isPersistable' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.model.Assignment-method-isPersistable' class='name expandable'>isPersistable</a>( <span class='pre'></span> ) : Boolean<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns true if the Assignment can be persisted (e.g. ...</div><div class='long'><p>Returns true if the Assignment can be persisted (e.g. task and resource are not 'phantoms')</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'><p>true if this model can be persisted to server.</p>\n</div></li></ul></div></div></div><div id='method-setEventId' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.model.Assignment'>Gnt.model.Assignment</span><br/><a href='source/Assignment3.html#Gnt-model-Assignment-method-setEventId' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.model.Assignment-method-setEventId' class='name expandable'>setEventId</a>( <span class='pre'>eventId</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>eventId</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-setUnits' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.model.Assignment'>Gnt.model.Assignment</span><br/><a href='source/Assignment3.html#Gnt-model-Assignment-method-setUnits' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.model.Assignment-method-setUnits' class='name expandable'>setUnits</a>( <span class='pre'>value</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Sets the units of this assignment ...</div><div class='long'><p>Sets the units of this assignment</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>value</span> : Number<div class='sub-desc'><p>The new value for units</p>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});