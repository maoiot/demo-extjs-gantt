Ext.data.JsonP.Gnt_feature_DragCreator({"tagname":"class","name":"Gnt.feature.DragCreator","autodetected":{"aliases":true,"alternateClassNames":true,"extends":true,"mixins":true,"requires":true,"uses":true,"members":true,"code_type":true},"files":[{"filename":"DragCreator.js","href":"DragCreator.html#Gnt-feature-DragCreator"}],"private":true,"aliases":{},"alternateClassNames":[],"extends":"Ext.Base","mixins":[],"requires":["Ext.Template","Gnt.Tooltip","Sch.util.DragTracker"],"uses":[],"members":[{"name":"disabled","tagname":"cfg","owner":"Gnt.feature.DragCreator","id":"cfg-disabled","meta":{}},{"name":"dragTolerance","tagname":"cfg","owner":"Gnt.feature.DragCreator","id":"cfg-dragTolerance","meta":{}},{"name":"showDragTip","tagname":"cfg","owner":"Gnt.feature.DragCreator","id":"cfg-showDragTip","meta":{}},{"name":"template","tagname":"cfg","owner":"Gnt.feature.DragCreator","id":"cfg-template","meta":{}},{"name":"tooltipConfig","tagname":"cfg","owner":"Gnt.feature.DragCreator","id":"cfg-tooltipConfig","meta":{}},{"name":"validatorFn","tagname":"cfg","owner":"Gnt.feature.DragCreator","id":"cfg-validatorFn","meta":{}},{"name":"validatorFnScope","tagname":"cfg","owner":"Gnt.feature.DragCreator","id":"cfg-validatorFnScope","meta":{}},{"name":"constructor","tagname":"method","owner":"Gnt.feature.DragCreator","id":"method-constructor","meta":{}},{"name":"finalize","tagname":"method","owner":"Gnt.feature.DragCreator","id":"method-finalize","meta":{"private":true}},{"name":"getProxy","tagname":"method","owner":"Gnt.feature.DragCreator","id":"method-getProxy","meta":{"private":true}},{"name":"init","tagname":"method","owner":"Gnt.feature.DragCreator","id":"method-init","meta":{"private":true}},{"name":"onBeforeDragStart","tagname":"method","owner":"Gnt.feature.DragCreator","id":"method-onBeforeDragStart","meta":{"private":true}},{"name":"onDrag","tagname":"method","owner":"Gnt.feature.DragCreator","id":"method-onDrag","meta":{"private":true}},{"name":"onDragEnd","tagname":"method","owner":"Gnt.feature.DragCreator","id":"method-onDragEnd","meta":{"private":true}},{"name":"onDragStart","tagname":"method","owner":"Gnt.feature.DragCreator","id":"method-onDragStart","meta":{"private":true}},{"name":"onGanttDestroy","tagname":"method","owner":"Gnt.feature.DragCreator","id":"method-onGanttDestroy","meta":{"private":true}},{"name":"setDisabled","tagname":"method","owner":"Gnt.feature.DragCreator","id":"method-setDisabled","meta":{}}],"code_type":"ext_define","id":"class-Gnt.feature.DragCreator","short_doc":"An internal class which shows a drag proxy while clicking and dragging. ...","component":false,"superclasses":["Ext.Base"],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Ext.Base<div class='subclass '><strong>Gnt.feature.DragCreator</strong></div></div><h4>Requires</h4><div class='dependency'>Ext.Template</div><div class='dependency'>Gnt.Tooltip</div><div class='dependency'><a href='#!/api/Sch.util.DragTracker' rel='Sch.util.DragTracker' class='docClass'>Sch.util.DragTracker</a></div><h4>Files</h4><div class='dependency'><a href='source/DragCreator.html#Gnt-feature-DragCreator' target='_blank'>DragCreator.js</a></div></pre><div class='doc-contents'><div class='rounded-box private-box'><p><strong>NOTE:</strong> This is a private utility class for internal use by the framework. Don't rely on its existence.</p></div><p>An internal class which shows a drag proxy while clicking and dragging.\nCreate a new instance of this plugin</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div id='cfg-disabled' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.feature.DragCreator'>Gnt.feature.DragCreator</span><br/><a href='source/DragCreator.html#Gnt-feature-DragCreator-cfg-disabled' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.feature.DragCreator-cfg-disabled' class='name expandable'>disabled</a> : Boolean<span class=\"signature\"></span></div><div class='description'><div class='short'>true to start disabled ...</div><div class='long'><p>true to start disabled</p>\n<p>Defaults to: <code>false</code></p></div></div></div><div id='cfg-dragTolerance' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.feature.DragCreator'>Gnt.feature.DragCreator</span><br/><a href='source/DragCreator.html#Gnt-feature-DragCreator-cfg-dragTolerance' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.feature.DragCreator-cfg-dragTolerance' class='name expandable'>dragTolerance</a> : Number<span class=\"signature\"></span></div><div class='description'><div class='short'>Number of pixels the drag target must be moved before dragging is considered to have started. ...</div><div class='long'><p>Number of pixels the drag target must be moved before dragging is considered to have started.</p>\n<p>Defaults to: <code>2</code></p></div></div></div><div id='cfg-showDragTip' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.feature.DragCreator'>Gnt.feature.DragCreator</span><br/><a href='source/DragCreator.html#Gnt-feature-DragCreator-cfg-showDragTip' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.feature.DragCreator-cfg-showDragTip' class='name expandable'>showDragTip</a> : Boolean<span class=\"signature\"></span></div><div class='description'><div class='short'>true to show a time tooltip when dragging to create a new event ...</div><div class='long'><p>true to show a time tooltip when dragging to create a new event</p>\n<p>Defaults to: <code>true</code></p></div></div></div><div id='cfg-template' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.feature.DragCreator'>Gnt.feature.DragCreator</span><br/><a href='source/DragCreator.html#Gnt-feature-DragCreator-cfg-template' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.feature.DragCreator-cfg-template' class='name expandable'>template</a> : Ext.Template/String<span class=\"signature\"></span></div><div class='description'><div class='short'>The HTML template shown when dragging to create new items ...</div><div class='long'><p>The HTML template shown when dragging to create new items</p>\n<p>Defaults to: <code>'&lt;div class=&quot;sch-gantt-dragcreator-proxy&quot;&gt;&lt;/div&gt;'</code></p></div></div></div><div id='cfg-tooltipConfig' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.feature.DragCreator'>Gnt.feature.DragCreator</span><br/><a href='source/DragCreator.html#Gnt-feature-DragCreator-cfg-tooltipConfig' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.feature.DragCreator-cfg-tooltipConfig' class='name expandable'>tooltipConfig</a> : Object<span class=\"signature\"></span></div><div class='description'><div class='short'><p>A custom config object to apply to the Gnt.Tooltip instance.</p>\n</div><div class='long'><p>A custom config object to apply to the Gnt.Tooltip instance.</p>\n</div></div></div><div id='cfg-validatorFn' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.feature.DragCreator'>Gnt.feature.DragCreator</span><br/><a href='source/DragCreator.html#Gnt-feature-DragCreator-cfg-validatorFn' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.feature.DragCreator-cfg-validatorFn' class='name expandable'>validatorFn</a> : Function<span class=\"signature\"></span></div><div class='description'><div class='short'>An empty function by default. ...</div><div class='long'><p>An empty function by default.\nProvide to perform custom validation on the item being created.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>record</span> : Ext.data.Model<div class='sub-desc'><p>the resource for which the task is being created</p>\n</div></li><li><span class='pre'>startDate</span> : Date<div class='sub-desc'>\n</div></li><li><span class='pre'>endDate</span> : Date<div class='sub-desc'>\n</div></li><li><span class='pre'>e</span> : Event<div class='sub-desc'><p>The event object</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'><p>isValid True if the creation event is valid, else false to cancel</p>\n</div></li></ul></div></div></div><div id='cfg-validatorFnScope' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.feature.DragCreator'>Gnt.feature.DragCreator</span><br/><a href='source/DragCreator.html#Gnt-feature-DragCreator-cfg-validatorFnScope' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.feature.DragCreator-cfg-validatorFnScope' class='name expandable'>validatorFnScope</a> : Object<span class=\"signature\"></span></div><div class='description'><div class='short'><p>The scope for the <a href=\"#!/api/Gnt.feature.DragCreator-cfg-validatorFn\" rel=\"Gnt.feature.DragCreator-cfg-validatorFn\" class=\"docClass\">validatorFn</a></p>\n</div><div class='long'><p>The scope for the <a href=\"#!/api/Gnt.feature.DragCreator-cfg-validatorFn\" rel=\"Gnt.feature.DragCreator-cfg-validatorFn\" class=\"docClass\">validatorFn</a></p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.feature.DragCreator'>Gnt.feature.DragCreator</span><br/><a href='source/DragCreator.html#Gnt-feature-DragCreator-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/Gnt.feature.DragCreator-method-constructor' class='name expandable'>Gnt.feature.DragCreator</a>( <span class='pre'>config</span> ) : <a href=\"#!/api/Gnt.feature.DragCreator\" rel=\"Gnt.feature.DragCreator\" class=\"docClass\">Gnt.feature.DragCreator</a><span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : Object<div class='sub-desc'></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Gnt.feature.DragCreator\" rel=\"Gnt.feature.DragCreator\" class=\"docClass\">Gnt.feature.DragCreator</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-finalize' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.feature.DragCreator'>Gnt.feature.DragCreator</span><br/><a href='source/DragCreator.html#Gnt-feature-DragCreator-method-finalize' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.feature.DragCreator-method-finalize' class='name expandable'>finalize</a>( <span class='pre'>doCreate</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>doCreate</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-getProxy' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.feature.DragCreator'>Gnt.feature.DragCreator</span><br/><a href='source/DragCreator.html#Gnt-feature-DragCreator-method-getProxy' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.feature.DragCreator-method-getProxy' class='name expandable'>getProxy</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-init' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.feature.DragCreator'>Gnt.feature.DragCreator</span><br/><a href='source/DragCreator.html#Gnt-feature-DragCreator-method-init' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.feature.DragCreator-method-init' class='name expandable'>init</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>private ...</div><div class='long'><p>private</p>\n</div></div></div><div id='method-onBeforeDragStart' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.feature.DragCreator'>Gnt.feature.DragCreator</span><br/><a href='source/DragCreator.html#Gnt-feature-DragCreator-method-onBeforeDragStart' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.feature.DragCreator-method-onBeforeDragStart' class='name expandable'>onBeforeDragStart</a>( <span class='pre'>e</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>private ...</div><div class='long'><p>private</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>e</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-onDrag' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.feature.DragCreator'>Gnt.feature.DragCreator</span><br/><a href='source/DragCreator.html#Gnt-feature-DragCreator-method-onDrag' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.feature.DragCreator-method-onDrag' class='name expandable'>onDrag</a>( <span class='pre'>e</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>private ...</div><div class='long'><p>private</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>e</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-onDragEnd' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.feature.DragCreator'>Gnt.feature.DragCreator</span><br/><a href='source/DragCreator.html#Gnt-feature-DragCreator-method-onDragEnd' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.feature.DragCreator-method-onDragEnd' class='name expandable'>onDragEnd</a>( <span class='pre'>e</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>private ...</div><div class='long'><p>private</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>e</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-onDragStart' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.feature.DragCreator'>Gnt.feature.DragCreator</span><br/><a href='source/DragCreator.html#Gnt-feature-DragCreator-method-onDragStart' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.feature.DragCreator-method-onDragStart' class='name expandable'>onDragStart</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>private ...</div><div class='long'><p>private</p>\n</div></div></div><div id='method-onGanttDestroy' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.feature.DragCreator'>Gnt.feature.DragCreator</span><br/><a href='source/DragCreator.html#Gnt-feature-DragCreator-method-onGanttDestroy' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.feature.DragCreator-method-onGanttDestroy' class='name expandable'>onGanttDestroy</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-setDisabled' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.feature.DragCreator'>Gnt.feature.DragCreator</span><br/><a href='source/DragCreator.html#Gnt-feature-DragCreator-method-setDisabled' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.feature.DragCreator-method-setDisabled' class='name expandable'>setDisabled</a>( <span class='pre'>disabled</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Enables/disables the plugin ...</div><div class='long'><p>Enables/disables the plugin</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>disabled</span> : Boolean<div class='sub-desc'><p>True to disable this plugin</p>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{"private":true}});