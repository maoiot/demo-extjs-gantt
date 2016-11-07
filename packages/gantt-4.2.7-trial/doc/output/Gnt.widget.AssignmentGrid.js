Ext.data.JsonP.Gnt_widget_AssignmentGrid({"tagname":"class","name":"Gnt.widget.AssignmentGrid","autodetected":{"aliases":true,"alternateClassNames":true,"mixins":true,"requires":true,"uses":true,"members":true,"code_type":true},"files":[{"filename":"AssignmentGrid.js","href":"AssignmentGrid.html#Gnt-widget-AssignmentGrid"}],"extends":"Ext.grid.Panel","aliases":{"widget":["assignmentgrid"]},"alternateClassNames":[],"mixins":[],"requires":["Ext.data.Store","Ext.grid.plugin.CellEditing","Gnt.column.AssignmentUnits","Gnt.column.ResourceName"],"uses":[],"members":[{"name":"assignmentStore","tagname":"cfg","owner":"Gnt.widget.AssignmentGrid","id":"cfg-assignmentStore","meta":{}},{"name":"resourceStore","tagname":"cfg","owner":"Gnt.widget.AssignmentGrid","id":"cfg-resourceStore","meta":{}},{"name":"assignmentUnitsEditor","tagname":"property","owner":"Gnt.widget.AssignmentGrid","id":"property-assignmentUnitsEditor","meta":{"private":true}},{"name":"cellEditing","tagname":"property","owner":"Gnt.widget.AssignmentGrid","id":"property-cellEditing","meta":{"private":true}},{"name":"cls","tagname":"property","owner":"Gnt.widget.AssignmentGrid","id":"property-cls","meta":{"private":true}},{"name":"readOnly","tagname":"property","owner":"Gnt.widget.AssignmentGrid","id":"property-readOnly","meta":{"private":true}},{"name":"selModel","tagname":"property","owner":"Gnt.widget.AssignmentGrid","id":"property-selModel","meta":{"private":true}},{"name":"sortResourcesFn","tagname":"property","owner":"Gnt.widget.AssignmentGrid","id":"property-sortResourcesFn","meta":{"private":true}},{"name":"taskId","tagname":"property","owner":"Gnt.widget.AssignmentGrid","id":"property-taskId","meta":{"private":true}},{"name":"viewConfig","tagname":"property","owner":"Gnt.widget.AssignmentGrid","id":"property-viewConfig","meta":{"private":true}},{"name":"buildColumns","tagname":"method","owner":"Gnt.widget.AssignmentGrid","id":"method-buildColumns","meta":{"private":true}},{"name":"buildPlugins","tagname":"method","owner":"Gnt.widget.AssignmentGrid","id":"method-buildPlugins","meta":{"private":true}},{"name":"hide","tagname":"method","owner":"Gnt.widget.AssignmentGrid","id":"method-hide","meta":{"private":true}},{"name":"initComponent","tagname":"method","owner":"Gnt.widget.AssignmentGrid","id":"method-initComponent","meta":{"private":true}},{"name":"isDataChanged","tagname":"method","owner":"Gnt.widget.AssignmentGrid","id":"method-isDataChanged","meta":{"private":true}},{"name":"isDataValid","tagname":"method","owner":"Gnt.widget.AssignmentGrid","id":"method-isDataValid","meta":{"private":true}},{"name":"isEditing","tagname":"method","owner":"Gnt.widget.AssignmentGrid","id":"method-isEditing","meta":{"private":true}},{"name":"loadResources","tagname":"method","owner":"Gnt.widget.AssignmentGrid","id":"method-loadResources","meta":{"private":true}},{"name":"loadTaskAssignments","tagname":"method","owner":"Gnt.widget.AssignmentGrid","id":"method-loadTaskAssignments","meta":{"private":true}},{"name":"onDeselect","tagname":"method","owner":"Gnt.widget.AssignmentGrid","id":"method-onDeselect","meta":{"private":true}},{"name":"onEditingDone","tagname":"method","owner":"Gnt.widget.AssignmentGrid","id":"method-onEditingDone","meta":{"private":true}},{"name":"onSelect","tagname":"method","owner":"Gnt.widget.AssignmentGrid","id":"method-onSelect","meta":{"private":true}},{"name":"saveTaskAssignments","tagname":"method","owner":"Gnt.widget.AssignmentGrid","id":"method-saveTaskAssignments","meta":{"private":true}},{"name":"setEditableFields","tagname":"method","owner":"Gnt.widget.AssignmentGrid","id":"method-setEditableFields","meta":{"private":true}}],"code_type":"ext_define","id":"class-Gnt.widget.AssignmentGrid","short_doc":"A class used to display and edit the task assignments. ...","component":false,"superclasses":["Ext.grid.Panel"],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Ext.grid.Panel<div class='subclass '><strong>Gnt.widget.AssignmentGrid</strong></div></div><h4>Requires</h4><div class='dependency'>Ext.data.Store</div><div class='dependency'>Ext.grid.plugin.CellEditing</div><div class='dependency'>Gnt.column.AssignmentUnits</div><div class='dependency'>Gnt.column.ResourceName</div><h4>Files</h4><div class='dependency'><a href='source/AssignmentGrid.html#Gnt-widget-AssignmentGrid' target='_blank'>AssignmentGrid.js</a></div></pre><div class='doc-contents'><p>A class used to display and edit the task assignments. You can configure this through the <a href=\"#!/api/Gnt.field.Assignment-cfg-gridConfig\" rel=\"Gnt.field.Assignment-cfg-gridConfig\" class=\"docClass\">gridConfig</a> object\navailable on the <a href=\"#!/api/Gnt.field.Assignment\" rel=\"Gnt.field.Assignment\" class=\"docClass\">Gnt.widget.AssignmentField</a> class.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div id='cfg-assignmentStore' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.widget.AssignmentGrid'>Gnt.widget.AssignmentGrid</span><br/><a href='source/AssignmentGrid.html#Gnt-widget-AssignmentGrid-cfg-assignmentStore' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.widget.AssignmentGrid-cfg-assignmentStore' class='name expandable'>assignmentStore</a> : Ext.data.Store<span class=\"signature\"></span></div><div class='description'><div class='short'><p>A store with assignments</p>\n</div><div class='long'><p>A store with assignments</p>\n</div></div></div><div id='cfg-resourceStore' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.widget.AssignmentGrid'>Gnt.widget.AssignmentGrid</span><br/><a href='source/AssignmentGrid.html#Gnt-widget-AssignmentGrid-cfg-resourceStore' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.widget.AssignmentGrid-cfg-resourceStore' class='name expandable'>resourceStore</a> : Ext.data.Store<span class=\"signature\"></span></div><div class='description'><div class='short'><p>A store with resources</p>\n</div><div class='long'><p>A store with resources</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-assignmentUnitsEditor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.widget.AssignmentGrid'>Gnt.widget.AssignmentGrid</span><br/><a href='source/AssignmentGrid.html#Gnt-widget-AssignmentGrid-property-assignmentUnitsEditor' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.widget.AssignmentGrid-property-assignmentUnitsEditor' class='name expandable'>assignmentUnitsEditor</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div><div id='property-cellEditing' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.widget.AssignmentGrid'>Gnt.widget.AssignmentGrid</span><br/><a href='source/AssignmentGrid.html#Gnt-widget-AssignmentGrid-property-cellEditing' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.widget.AssignmentGrid-property-cellEditing' class='name expandable'>cellEditing</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div><div id='property-cls' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.widget.AssignmentGrid'>Gnt.widget.AssignmentGrid</span><br/><a href='source/AssignmentGrid.html#Gnt-widget-AssignmentGrid-property-cls' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.widget.AssignmentGrid-property-cls' class='name expandable'>cls</a> : String<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>'gnt-assignmentgrid'</code></p></div></div></div><div id='property-readOnly' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.widget.AssignmentGrid'>Gnt.widget.AssignmentGrid</span><br/><a href='source/AssignmentGrid.html#Gnt-widget-AssignmentGrid-property-readOnly' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.widget.AssignmentGrid-property-readOnly' class='name expandable'>readOnly</a> : Boolean<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>false</code></p></div></div></div><div id='property-selModel' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.widget.AssignmentGrid'>Gnt.widget.AssignmentGrid</span><br/><a href='source/AssignmentGrid.html#Gnt-widget-AssignmentGrid-property-selModel' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.widget.AssignmentGrid-property-selModel' class='name expandable'>selModel</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>{selType: 'checkboxmodel', mode: 'MULTI', checkOnly: true}</code></p></div></div></div><div id='property-sortResourcesFn' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.widget.AssignmentGrid'>Gnt.widget.AssignmentGrid</span><br/><a href='source/AssignmentGrid.html#Gnt-widget-AssignmentGrid-property-sortResourcesFn' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.widget.AssignmentGrid-property-sortResourcesFn' class='name expandable'>sortResourcesFn</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'><p>The sorting function defining the order of the resources</p>\n</div><div class='long'><p>The sorting function defining the order of the resources</p>\n</div></div></div><div id='property-taskId' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.widget.AssignmentGrid'>Gnt.widget.AssignmentGrid</span><br/><a href='source/AssignmentGrid.html#Gnt-widget-AssignmentGrid-property-taskId' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.widget.AssignmentGrid-property-taskId' class='name expandable'>taskId</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div><div id='property-viewConfig' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.widget.AssignmentGrid'>Gnt.widget.AssignmentGrid</span><br/><a href='source/AssignmentGrid.html#Gnt-widget-AssignmentGrid-property-viewConfig' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.widget.AssignmentGrid-property-viewConfig' class='name expandable'>viewConfig</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>{markDirty: false}</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-buildColumns' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.widget.AssignmentGrid'>Gnt.widget.AssignmentGrid</span><br/><a href='source/AssignmentGrid.html#Gnt-widget-AssignmentGrid-method-buildColumns' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.widget.AssignmentGrid-method-buildColumns' class='name expandable'>buildColumns</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-buildPlugins' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.widget.AssignmentGrid'>Gnt.widget.AssignmentGrid</span><br/><a href='source/AssignmentGrid.html#Gnt-widget-AssignmentGrid-method-buildPlugins' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.widget.AssignmentGrid-method-buildPlugins' class='name expandable'>buildPlugins</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-hide' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.widget.AssignmentGrid'>Gnt.widget.AssignmentGrid</span><br/><a href='source/AssignmentGrid.html#Gnt-widget-AssignmentGrid-method-hide' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.widget.AssignmentGrid-method-hide' class='name expandable'>hide</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-initComponent' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.widget.AssignmentGrid'>Gnt.widget.AssignmentGrid</span><br/><a href='source/AssignmentGrid.html#Gnt-widget-AssignmentGrid-method-initComponent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.widget.AssignmentGrid-method-initComponent' class='name expandable'>initComponent</a>( <span class='pre'>config</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-isDataChanged' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.widget.AssignmentGrid'>Gnt.widget.AssignmentGrid</span><br/><a href='source/AssignmentGrid.html#Gnt-widget-AssignmentGrid-method-isDataChanged' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.widget.AssignmentGrid-method-isDataChanged' class='name expandable'>isDataChanged</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-isDataValid' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.widget.AssignmentGrid'>Gnt.widget.AssignmentGrid</span><br/><a href='source/AssignmentGrid.html#Gnt-widget-AssignmentGrid-method-isDataValid' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.widget.AssignmentGrid-method-isDataValid' class='name expandable'>isDataValid</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-isEditing' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.widget.AssignmentGrid'>Gnt.widget.AssignmentGrid</span><br/><a href='source/AssignmentGrid.html#Gnt-widget-AssignmentGrid-method-isEditing' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.widget.AssignmentGrid-method-isEditing' class='name expandable'>isEditing</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-loadResources' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.widget.AssignmentGrid'>Gnt.widget.AssignmentGrid</span><br/><a href='source/AssignmentGrid.html#Gnt-widget-AssignmentGrid-method-loadResources' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.widget.AssignmentGrid-method-loadResources' class='name expandable'>loadResources</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-loadTaskAssignments' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.widget.AssignmentGrid'>Gnt.widget.AssignmentGrid</span><br/><a href='source/AssignmentGrid.html#Gnt-widget-AssignmentGrid-method-loadTaskAssignments' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.widget.AssignmentGrid-method-loadTaskAssignments' class='name expandable'>loadTaskAssignments</a>( <span class='pre'>taskId</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>taskId</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-onDeselect' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.widget.AssignmentGrid'>Gnt.widget.AssignmentGrid</span><br/><a href='source/AssignmentGrid.html#Gnt-widget-AssignmentGrid-method-onDeselect' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.widget.AssignmentGrid-method-onDeselect' class='name expandable'>onDeselect</a>( <span class='pre'>sm, rec</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>sm</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>rec</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-onEditingDone' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.widget.AssignmentGrid'>Gnt.widget.AssignmentGrid</span><br/><a href='source/AssignmentGrid.html#Gnt-widget-AssignmentGrid-method-onEditingDone' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.widget.AssignmentGrid-method-onEditingDone' class='name expandable'>onEditingDone</a>( <span class='pre'>ed, e</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>ed</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>e</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-onSelect' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.widget.AssignmentGrid'>Gnt.widget.AssignmentGrid</span><br/><a href='source/AssignmentGrid.html#Gnt-widget-AssignmentGrid-method-onSelect' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.widget.AssignmentGrid-method-onSelect' class='name expandable'>onSelect</a>( <span class='pre'>sm, rec</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>sm</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>rec</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-saveTaskAssignments' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.widget.AssignmentGrid'>Gnt.widget.AssignmentGrid</span><br/><a href='source/AssignmentGrid.html#Gnt-widget-AssignmentGrid-method-saveTaskAssignments' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.widget.AssignmentGrid-method-saveTaskAssignments' class='name expandable'>saveTaskAssignments</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-setEditableFields' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.widget.AssignmentGrid'>Gnt.widget.AssignmentGrid</span><br/><a href='source/AssignmentGrid.html#Gnt-widget-AssignmentGrid-method-setEditableFields' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.widget.AssignmentGrid-method-setEditableFields' class='name expandable'>setEditableFields</a>( <span class='pre'>taskId</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>taskId</span> : Object<div class='sub-desc'></div></li></ul></div></div></div></div></div></div></div>","meta":{}});