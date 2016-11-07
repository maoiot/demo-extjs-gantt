Ext.data.JsonP.Sch_model_Dependency({"tagname":"class","name":"Sch.model.Dependency","autodetected":{"aliases":true,"alternateClassNames":true,"mixins":true,"requires":true,"uses":true,"members":true,"code_type":true},"files":[{"filename":"Dependency.js","href":"Dependency2.html#Sch-model-Dependency"}],"extends":"Sch.model.Customizable","aliases":{},"alternateClassNames":[],"mixins":[],"requires":["Sch.model.Range"],"uses":[],"members":[{"name":"clsField","tagname":"cfg","owner":"Sch.model.Dependency","id":"cfg-clsField","meta":{}},{"name":"customizableFields","tagname":"cfg","owner":"Sch.model.Dependency","id":"cfg-customizableFields","meta":{}},{"name":"fromField","tagname":"cfg","owner":"Sch.model.Dependency","id":"cfg-fromField","meta":{}},{"name":"toField","tagname":"cfg","owner":"Sch.model.Dependency","id":"cfg-toField","meta":{}},{"name":"typeField","tagname":"cfg","owner":"Sch.model.Dependency","id":"cfg-typeField","meta":{}},{"name":"idProperty","tagname":"property","owner":"Sch.model.Dependency","id":"property-idProperty","meta":{"private":true}},{"name":"Type","tagname":"property","owner":"Sch.model.Dependency","id":"static-property-Type","meta":{"static":true}},{"name":"constructor","tagname":"method","owner":"Sch.model.Dependency","id":"method-constructor","meta":{}},{"name":"getCls","tagname":"method","owner":"Sch.model.Dependency","id":"method-getCls","meta":{}},{"name":"getDateRange","tagname":"method","owner":"Sch.model.Dependency","id":"method-getDateRange","meta":{"private":true}},{"name":"getEventStore","tagname":"method","owner":"Sch.model.Dependency","id":"method-getEventStore","meta":{"private":true}},{"name":"getFrom","tagname":"method","owner":"Sch.model.Dependency","id":"method-getFrom","meta":{}},{"name":"getSourceEvent","tagname":"method","owner":"Sch.model.Dependency","id":"method-getSourceEvent","meta":{}},{"name":"getSourceId","tagname":"method","owner":"Sch.model.Dependency","id":"method-getSourceId","meta":{}},{"name":"getTargetEvent","tagname":"method","owner":"Sch.model.Dependency","id":"method-getTargetEvent","meta":{}},{"name":"getTargetId","tagname":"method","owner":"Sch.model.Dependency","id":"method-getTargetId","meta":{}},{"name":"getTo","tagname":"method","owner":"Sch.model.Dependency","id":"method-getTo","meta":{}},{"name":"getType","tagname":"method","owner":"Sch.model.Dependency","id":"method-getType","meta":{}},{"name":"isPersistable","tagname":"method","owner":"Sch.model.Dependency","id":"method-isPersistable","meta":{}},{"name":"isValid","tagname":"method","owner":"Sch.model.Dependency","id":"method-isValid","meta":{}},{"name":"setFrom","tagname":"method","owner":"Sch.model.Dependency","id":"method-setFrom","meta":{}},{"name":"setSourceEvent","tagname":"method","owner":"Sch.model.Dependency","id":"method-setSourceEvent","meta":{}},{"name":"setSourceId","tagname":"method","owner":"Sch.model.Dependency","id":"method-setSourceId","meta":{}},{"name":"setTargetEvent","tagname":"method","owner":"Sch.model.Dependency","id":"method-setTargetEvent","meta":{}},{"name":"setTargetId","tagname":"method","owner":"Sch.model.Dependency","id":"method-setTargetId","meta":{}},{"name":"setTo","tagname":"method","owner":"Sch.model.Dependency","id":"method-setTo","meta":{}},{"name":"setType","tagname":"method","owner":"Sch.model.Dependency","id":"method-setType","meta":{}}],"code_type":"ext_define","id":"class-Sch.model.Dependency","short_doc":"This class represents a single Dependency between two events. ...","component":false,"superclasses":["Ext.data.Model","Sch.model.Customizable"],"subclasses":["Gnt.model.Dependency"],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Ext.data.Model<div class='subclass '><a href='#!/api/Sch.model.Customizable' rel='Sch.model.Customizable' class='docClass'>Sch.model.Customizable</a><div class='subclass '><strong>Sch.model.Dependency</strong></div></div></div><h4>Requires</h4><div class='dependency'><a href='#!/api/Sch.model.Range' rel='Sch.model.Range' class='docClass'>Sch.model.Range</a></div><h4>Subclasses</h4><div class='dependency'><a href='#!/api/Gnt.model.Dependency' rel='Gnt.model.Dependency' class='docClass'>Gnt.model.Dependency</a></div><h4>Files</h4><div class='dependency'><a href='source/Dependency2.html#Sch-model-Dependency' target='_blank'>Dependency.js</a></div></pre><div class='doc-contents'><p>This class represents a single Dependency between two events. It is a subclass of the <a href=\"#!/api/Sch.model.Customizable\" rel=\"Sch.model.Customizable\" class=\"docClass\">Sch.model.Customizable</a>\nclass, which in its turn subclasses Ext.data.Model.\nPlease refer to documentation of those classes to become familar with the base interface of this class.</p>\n\n<p>A Dependency has the following fields:</p>\n\n<ul>\n<li><code>Id</code> - The id of the dependency itself</li>\n<li><code>From</code> - The id of the event at which the dependency starts</li>\n<li><code>To</code> - The id of the event at which the dependency ends</li>\n<li><code>Cls</code> - A CSS class that will be applied to each rendered dependency DOM element</li>\n<li><code>Type</code> - An integer constant representing the type of the dependency:\n\n<ul>\n<li>0 - start-to-start dependency</li>\n<li>1 - start-to-end dependency</li>\n<li>2 - end-to-start dependency</li>\n<li>3 - end-to-end dependency</li>\n</ul>\n</li>\n<li><code>Bidirectional</code> - A boolean indicating if a dependency goes both directions (default false)</li>\n</ul>\n\n\n<h2>Subclassing the Dependency class</h2>\n\n<p>The name of any field can be customized in the subclass, see the example below. Please also refer to <a href=\"#!/api/Sch.model.Customizable\" rel=\"Sch.model.Customizable\" class=\"docClass\">Sch.model.Customizable</a>\nfor details.</p>\n\n<pre><code>Ext.define('MyProject.model.Dependency', {\n    extend      : '<a href=\"#!/api/Sch.model.Dependency\" rel=\"Sch.model.Dependency\" class=\"docClass\">Sch.model.Dependency</a>',\n\n    toField     : 'targetId',\n    fromField   : 'sourceId',\n\n    ...\n})\n</code></pre>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div id='cfg-clsField' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.model.Dependency'>Sch.model.Dependency</span><br/><a href='source/Dependency2.html#Sch-model-Dependency-cfg-clsField' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.model.Dependency-cfg-clsField' class='name expandable'>clsField</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'><p>The name of the boolean field that controls if arrows should be drawn at both start and end points.</p>\n</div><div class='long'><p>The name of the boolean field that controls if arrows should be drawn at both start and end points.</p>\n</div></div></div><div id='cfg-customizableFields' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.model.Dependency'>Sch.model.Dependency</span><br/><a href='source/Dependency2.html#Sch-model-Dependency-cfg-customizableFields' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.model.Dependency-cfg-customizableFields' class='name expandable'>customizableFields</a> : Array<span class=\"signature\"></span></div><div class='description'><div class='short'>The array of customizale fields definitions. ...</div><div class='long'><p>The array of customizale fields definitions.</p>\n<p>Defaults to: <code>[{name: 'From'}, {name: 'To'}, {name: 'Type', type: 'int', defaultValue: 2}, {name: 'Cls', defaultValue: ''}, {name: 'Bidirectional', type: 'boolean'}]</code></p><p>Overrides: <a href=\"#!/api/Sch.model.Customizable-cfg-customizableFields\" rel=\"Sch.model.Customizable-cfg-customizableFields\" class=\"docClass\">Sch.model.Customizable.customizableFields</a></p></div></div></div><div id='cfg-fromField' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.model.Dependency'>Sch.model.Dependency</span><br/><a href='source/Dependency2.html#Sch-model-Dependency-cfg-fromField' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.model.Dependency-cfg-fromField' class='name expandable'>fromField</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'>The name of the field that contains the id of the source event. ...</div><div class='long'><p>The name of the field that contains the id of the source event.</p>\n<p>Defaults to: <code>'From'</code></p></div></div></div><div id='cfg-toField' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.model.Dependency'>Sch.model.Dependency</span><br/><a href='source/Dependency2.html#Sch-model-Dependency-cfg-toField' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.model.Dependency-cfg-toField' class='name expandable'>toField</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'>The name of the field that contains the id of the target event. ...</div><div class='long'><p>The name of the field that contains the id of the target event.</p>\n<p>Defaults to: <code>'To'</code></p></div></div></div><div id='cfg-typeField' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.model.Dependency'>Sch.model.Dependency</span><br/><a href='source/Dependency2.html#Sch-model-Dependency-cfg-typeField' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.model.Dependency-cfg-typeField' class='name expandable'>typeField</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'>The name of the field that contains the dependency type. ...</div><div class='long'><p>The name of the field that contains the dependency type.</p>\n<p>Defaults to: <code>'Type'</code></p></div></div></div></div></div><div class='members-section'><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Instance properties</h3><div id='property-idProperty' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.model.Dependency'>Sch.model.Dependency</span><br/><a href='source/Dependency2.html#Sch-model-Dependency-property-idProperty' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.model.Dependency-property-idProperty' class='name expandable'>idProperty</a> : String<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>'Id'</code></p></div></div></div></div><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Static properties</h3><div id='static-property-Type' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.model.Dependency'>Sch.model.Dependency</span><br/><a href='source/Dependency2.html#Sch-model-Dependency-static-property-Type' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.model.Dependency-static-property-Type' class='name expandable'>Type</a> : Object<span class=\"signature\"><span class='static' >static</span></span></div><div class='description'><div class='short'>The enumerable object, containing names for the dependency types integer constants. ...</div><div class='long'><p>The enumerable object, containing names for the dependency types integer constants.</p>\n<p>Defaults to: <code>{StartToStart: 0, StartToEnd: 1, EndToStart: 2, EndToEnd: 3}</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.model.Dependency'>Sch.model.Dependency</span><br/><a href='source/Dependency2.html#Sch-model-Dependency-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/Sch.model.Dependency-method-constructor' class='name expandable'>Sch.model.Dependency</a>( <span class='pre'>config</span> ) : <a href=\"#!/api/Sch.model.Dependency\" rel=\"Sch.model.Dependency\" class=\"docClass\">Sch.model.Dependency</a><span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : Object<div class='sub-desc'></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Sch.model.Dependency\" rel=\"Sch.model.Dependency\" class=\"docClass\">Sch.model.Dependency</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getCls' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.model.Dependency'>Sch.model.Dependency</span><br/><a href='source/Dependency2.html#Sch-model-Dependency-method-getCls' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.model.Dependency-method-getCls' class='name expandable'>getCls</a>( <span class='pre'></span> ) : String<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns the name of field holding the CSS class for each rendered dependency element ...</div><div class='long'><p>Returns the name of field holding the CSS class for each rendered dependency element</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'><p>The cls field</p>\n</div></li></ul></div></div></div><div id='method-getDateRange' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.model.Dependency'>Sch.model.Dependency</span><br/><a href='source/Dependency2.html#Sch-model-Dependency-method-getDateRange' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.model.Dependency-method-getDateRange' class='name expandable'>getDateRange</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-getEventStore' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.model.Dependency'>Sch.model.Dependency</span><br/><a href='source/Dependency2.html#Sch-model-Dependency-method-getEventStore' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.model.Dependency-method-getEventStore' class='name expandable'>getEventStore</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-getFrom' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.model.Dependency'>Sch.model.Dependency</span><br/><a href='source/Dependency2.html#Sch-model-Dependency-method-getFrom' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.model.Dependency-method-getFrom' class='name expandable'>getFrom</a>( <span class='pre'></span> ) : Mixed<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns the source event id of the dependency ...</div><div class='long'><p>Returns the source event id of the dependency</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Mixed</span><div class='sub-desc'><p>The id of the source event for the dependency</p>\n</div></li></ul></div></div></div><div id='method-getSourceEvent' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.model.Dependency'>Sch.model.Dependency</span><br/><a href='source/Dependency2.html#Sch-model-Dependency-method-getSourceEvent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.model.Dependency-method-getSourceEvent' class='name expandable'>getSourceEvent</a>( <span class='pre'>eventStore</span> ) : <a href=\"#!/api/Sch.model.Event\" rel=\"Sch.model.Event\" class=\"docClass\">Sch.model.Event</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Returns the source event of the dependency ...</div><div class='long'><p>Returns the source event of the dependency</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>eventStore</span> : Object<div class='sub-desc'></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Sch.model.Event\" rel=\"Sch.model.Event\" class=\"docClass\">Sch.model.Event</a></span><div class='sub-desc'><p>The source event of this dependency</p>\n</div></li></ul></div></div></div><div id='method-getSourceId' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.model.Dependency'>Sch.model.Dependency</span><br/><a href='source/Dependency2.html#Sch-model-Dependency-method-getSourceId' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.model.Dependency-method-getSourceId' class='name expandable'>getSourceId</a>( <span class='pre'></span> ) : Mixed<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns the source event id of the dependency ...</div><div class='long'><p>Returns the source event id of the dependency</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Mixed</span><div class='sub-desc'><p>The id of the source event for the dependency</p>\n</div></li></ul></div></div></div><div id='method-getTargetEvent' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.model.Dependency'>Sch.model.Dependency</span><br/><a href='source/Dependency2.html#Sch-model-Dependency-method-getTargetEvent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.model.Dependency-method-getTargetEvent' class='name expandable'>getTargetEvent</a>( <span class='pre'>eventStore</span> ) : <a href=\"#!/api/Sch.model.Event\" rel=\"Sch.model.Event\" class=\"docClass\">Sch.model.Event</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Returns the target event of the dependency ...</div><div class='long'><p>Returns the target event of the dependency</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>eventStore</span> : Object<div class='sub-desc'></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Sch.model.Event\" rel=\"Sch.model.Event\" class=\"docClass\">Sch.model.Event</a></span><div class='sub-desc'><p>The target event of this dependency</p>\n</div></li></ul></div></div></div><div id='method-getTargetId' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.model.Dependency'>Sch.model.Dependency</span><br/><a href='source/Dependency2.html#Sch-model-Dependency-method-getTargetId' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.model.Dependency-method-getTargetId' class='name expandable'>getTargetId</a>( <span class='pre'></span> ) : Mixed<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns the target event id of the dependency ...</div><div class='long'><p>Returns the target event id of the dependency</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Mixed</span><div class='sub-desc'><p>The id of the target event for the dependency</p>\n</div></li></ul></div></div></div><div id='method-getTo' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.model.Dependency'>Sch.model.Dependency</span><br/><a href='source/Dependency2.html#Sch-model-Dependency-method-getTo' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.model.Dependency-method-getTo' class='name expandable'>getTo</a>( <span class='pre'></span> ) : Mixed<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns the target event id of the dependency ...</div><div class='long'><p>Returns the target event id of the dependency</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Mixed</span><div class='sub-desc'><p>The id of the target event for the dependency</p>\n</div></li></ul></div></div></div><div id='method-getType' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.model.Dependency'>Sch.model.Dependency</span><br/><a href='source/Dependency2.html#Sch-model-Dependency-method-getType' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.model.Dependency-method-getType' class='name expandable'>getType</a>( <span class='pre'></span> ) : Mixed<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns the dependency type ...</div><div class='long'><p>Returns the dependency type</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Mixed</span><div class='sub-desc'><p>The type of the dependency</p>\n</div></li></ul></div></div></div><div id='method-isPersistable' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.model.Dependency'>Sch.model.Dependency</span><br/><a href='source/Dependency2.html#Sch-model-Dependency-method-isPersistable' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.model.Dependency-method-isPersistable' class='name expandable'>isPersistable</a>( <span class='pre'></span> ) : Boolean<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns true if the linked events have been persisted (e.g. ...</div><div class='long'><p>Returns true if the linked events have been persisted (e.g. neither of them are 'phantoms')</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'><p>true if this model can be persisted to server.</p>\n</div></li></ul></div></div></div><div id='method-isValid' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.model.Dependency'>Sch.model.Dependency</span><br/><a href='source/Dependency2.html#Sch-model-Dependency-method-isValid' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.model.Dependency-method-isValid' class='name expandable'>isValid</a>( <span class='pre'>taskStore</span> ) : Boolean<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns true if the dependency is valid. ...</div><div class='long'><p>Returns <code>true</code> if the dependency is valid. Has valid type and both source and target ids set and not links to itself.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>taskStore</span> : Object<div class='sub-desc'></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-setFrom' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.model.Dependency'>Sch.model.Dependency</span><br/><a href='source/Dependency2.html#Sch-model-Dependency-method-setFrom' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.model.Dependency-method-setFrom' class='name expandable'>setFrom</a>( <span class='pre'>id</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Sets the source event id of the dependency ...</div><div class='long'><p>Sets the source event id of the dependency</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>id</span> : Mixed<div class='sub-desc'><p>The id of the source event for the dependency</p>\n</div></li></ul></div></div></div><div id='method-setSourceEvent' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.model.Dependency'>Sch.model.Dependency</span><br/><a href='source/Dependency2.html#Sch-model-Dependency-method-setSourceEvent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.model.Dependency-method-setSourceEvent' class='name expandable'>setSourceEvent</a>( <span class='pre'>event</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Sets the source event of the dependency ...</div><div class='long'><p>Sets the source event of the dependency</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>event</span> : <a href=\"#!/api/Sch.model.Event\" rel=\"Sch.model.Event\" class=\"docClass\">Sch.model.Event</a><div class='sub-desc'><p>The new source event of this dependency</p>\n</div></li></ul></div></div></div><div id='method-setSourceId' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.model.Dependency'>Sch.model.Dependency</span><br/><a href='source/Dependency2.html#Sch-model-Dependency-method-setSourceId' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.model.Dependency-method-setSourceId' class='name expandable'>setSourceId</a>( <span class='pre'>id</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Sets the source event id of the dependency ...</div><div class='long'><p>Sets the source event id of the dependency</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>id</span> : Mixed<div class='sub-desc'><p>The id of the source event for the dependency</p>\n</div></li></ul></div></div></div><div id='method-setTargetEvent' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.model.Dependency'>Sch.model.Dependency</span><br/><a href='source/Dependency2.html#Sch-model-Dependency-method-setTargetEvent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.model.Dependency-method-setTargetEvent' class='name expandable'>setTargetEvent</a>( <span class='pre'>event</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Sets the target event of the dependency ...</div><div class='long'><p>Sets the target event of the dependency</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>event</span> : <a href=\"#!/api/Sch.model.Event\" rel=\"Sch.model.Event\" class=\"docClass\">Sch.model.Event</a><div class='sub-desc'><p>The new target event of this dependency</p>\n</div></li></ul></div></div></div><div id='method-setTargetId' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.model.Dependency'>Sch.model.Dependency</span><br/><a href='source/Dependency2.html#Sch-model-Dependency-method-setTargetId' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.model.Dependency-method-setTargetId' class='name expandable'>setTargetId</a>( <span class='pre'>id</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Sets the target event id of the dependency ...</div><div class='long'><p>Sets the target event id of the dependency</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>id</span> : Mixed<div class='sub-desc'><p>The id of the target event for the dependency</p>\n</div></li></ul></div></div></div><div id='method-setTo' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.model.Dependency'>Sch.model.Dependency</span><br/><a href='source/Dependency2.html#Sch-model-Dependency-method-setTo' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.model.Dependency-method-setTo' class='name expandable'>setTo</a>( <span class='pre'>id</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Sets the target event id of the dependency ...</div><div class='long'><p>Sets the target event id of the dependency</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>id</span> : Mixed<div class='sub-desc'><p>The id of the target event for the dependency</p>\n</div></li></ul></div></div></div><div id='method-setType' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.model.Dependency'>Sch.model.Dependency</span><br/><a href='source/Dependency2.html#Sch-model-Dependency-method-setType' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.model.Dependency-method-setType' class='name expandable'>setType</a>( <span class='pre'>type</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Sets the dependency type ...</div><div class='long'><p>Sets the dependency type</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>type</span> : Mixed<div class='sub-desc'><p>The type of the dependency</p>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});