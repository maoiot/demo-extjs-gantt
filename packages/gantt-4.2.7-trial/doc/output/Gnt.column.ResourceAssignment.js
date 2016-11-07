Ext.data.JsonP.Gnt_column_ResourceAssignment({"tagname":"class","name":"Gnt.column.ResourceAssignment","autodetected":{"aliases":true,"alternateClassNames":true,"mixins":true,"requires":true,"uses":true,"members":true,"code_type":true},"files":[{"filename":"ResourceAssignment.js","href":"ResourceAssignment.html#Gnt-column-ResourceAssignment"}],"extends":"Ext.grid.column.Column","aliases":{"widget":["resourceassignmentcolumn","ganttcolumn.resourceassignment"]},"alternateClassNames":[],"mixins":["Gnt.mixin.Localizable"],"requires":["Gnt.field.Assignment"],"uses":[],"members":[{"name":"l10n","tagname":"cfg","owner":"Sch.mixin.Localizable","id":"cfg-l10n","meta":{}},{"name":"showUnits","tagname":"cfg","owner":"Gnt.column.ResourceAssignment","id":"cfg-showUnits","meta":{}},{"name":"activeLocaleId","tagname":"property","owner":"Sch.mixin.Localizable","id":"property-activeLocaleId","meta":{"private":true}},{"name":"dirtyCls","tagname":"property","owner":"Gnt.column.ResourceAssignment","id":"property-dirtyCls","meta":{"private":true}},{"name":"field","tagname":"property","owner":"Gnt.column.ResourceAssignment","id":"property-field","meta":{"private":true}},{"name":"legacyMode","tagname":"property","owner":"Sch.mixin.Localizable","id":"property-legacyMode","meta":{"private":true}},{"name":"tdCls","tagname":"property","owner":"Gnt.column.ResourceAssignment","id":"property-tdCls","meta":{"private":true}},{"name":"constructor","tagname":"method","owner":"Gnt.column.ResourceAssignment","id":"method-constructor","meta":{}},{"name":"L","tagname":"method","owner":"Sch.mixin.Localizable","id":"method-L","meta":{}},{"name":"afterRender","tagname":"method","owner":"Gnt.column.ResourceAssignment","id":"method-afterRender","meta":{"private":true}},{"name":"applyLocale","tagname":"method","owner":"Sch.mixin.Localizable","id":"method-applyLocale","meta":{"private":true}},{"name":"getRawData","tagname":"method","owner":"Gnt.column.ResourceAssignment","id":"method-getRawData","meta":{}},{"name":"isLocaleApplied","tagname":"method","owner":"Sch.mixin.Localizable","id":"method-isLocaleApplied","meta":{"private":true}},{"name":"localize","tagname":"method","owner":"Sch.mixin.Localizable","id":"method-localize","meta":{}},{"name":"onAfterEdit","tagname":"method","owner":"Gnt.column.ResourceAssignment","id":"method-onAfterEdit","meta":{"private":true}},{"name":"putRawData","tagname":"method","owner":"Gnt.column.ResourceAssignment","id":"method-putRawData","meta":{}},{"name":"renderer","tagname":"method","owner":"Gnt.column.ResourceAssignment","id":"method-renderer","meta":{"private":true}},{"name":"sorterFn","tagname":"method","owner":"Gnt.column.ResourceAssignment","id":"method-sorterFn","meta":{"private":true}}],"code_type":"ext_define","id":"class-Gnt.column.ResourceAssignment","short_doc":"A Column showing the resource assignments of a task. ...","component":false,"superclasses":["Ext.grid.column.Column"],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Ext.grid.column.Column<div class='subclass '><strong>Gnt.column.ResourceAssignment</strong></div></div><h4>Mixins</h4><div class='dependency'><a href='#!/api/Gnt.mixin.Localizable' rel='Gnt.mixin.Localizable' class='docClass'>Gnt.mixin.Localizable</a></div><h4>Requires</h4><div class='dependency'><a href='#!/api/Gnt.field.Assignment' rel='Gnt.field.Assignment' class='docClass'>Gnt.field.Assignment</a></div><h4>Files</h4><div class='dependency'><a href='source/ResourceAssignment.html#Gnt-column-ResourceAssignment' target='_blank'>ResourceAssignment.js</a></div></pre><div class='doc-contents'><p>A Column showing the resource assignments of a task. To make the column editable,\nadd the <a href=\"#!/api/Sch.plugin.TreeCellEditing\" rel=\"Sch.plugin.TreeCellEditing\" class=\"docClass\">Sch.plugin.TreeCellEditing</a> plugin to your gantt panel:</p>\n\n<pre><code>var gantt = Ext.create('<a href=\"#!/api/Gnt.panel.Gantt\" rel=\"Gnt.panel.Gantt\" class=\"docClass\">Gnt.panel.Gantt</a>', {\n    height      : 600,\n    width       : 1000,\n\n    columns         : [\n        ...\n        {\n            xtype       : 'resourceassignmentcolumn',\n            width       : 80\n        }\n        ...\n    ],\n\n    plugins             : [\n        Ext.create('<a href=\"#!/api/Sch.plugin.TreeCellEditing\" rel=\"Sch.plugin.TreeCellEditing\" class=\"docClass\">Sch.plugin.TreeCellEditing</a>', {\n            clicksToEdit: 1\n        })\n    ],\n    ...\n})\n</code></pre>\n\n<p> <p><img src=\"images/gantt/images/resource-assignment.png\" alt=\"2x\" width=\"1270\" height=\"784\"></p></p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div id='cfg-l10n' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.mixin.Localizable' rel='Sch.mixin.Localizable' class='defined-in docClass'>Sch.mixin.Localizable</a><br/><a href='source/Localizable.html#Sch-mixin-Localizable-cfg-l10n' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.mixin.Localizable-cfg-l10n' class='name expandable'>l10n</a> : Object<span class=\"signature\"></span></div><div class='description'><div class='short'><p>Container of locales for the class.</p>\n</div><div class='long'><p>Container of locales for the class.</p>\n<p>Overrides: <a href=\"#!/api/Sch.mixin.TimelinePanel-cfg-l10n\" rel=\"Sch.mixin.TimelinePanel-cfg-l10n\" class=\"docClass\">Sch.mixin.TimelinePanel.l10n</a>, <a href=\"#!/api/Gnt.field.Duration-cfg-l10n\" rel=\"Gnt.field.Duration-cfg-l10n\" class=\"docClass\">Gnt.field.Duration.l10n</a>, <a href=\"#!/api/Gnt.widget.taskeditor.TaskForm-cfg-l10n\" rel=\"Gnt.widget.taskeditor.TaskForm-cfg-l10n\" class=\"docClass\">Gnt.widget.taskeditor.TaskForm.l10n</a></p></div></div></div><div id='cfg-showUnits' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.ResourceAssignment'>Gnt.column.ResourceAssignment</span><br/><a href='source/ResourceAssignment.html#Gnt-column-ResourceAssignment-cfg-showUnits' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.ResourceAssignment-cfg-showUnits' class='name expandable'>showUnits</a> : Boolean<span class=\"signature\"></span></div><div class='description'><div class='short'>Set to true to show the assignment units (in percent). ...</div><div class='long'><p>Set to <code>true</code> to show the assignment units (in percent). Default value is <code>true</code>.</p>\n<p>Defaults to: <code>true</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-activeLocaleId' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.mixin.Localizable' rel='Sch.mixin.Localizable' class='defined-in docClass'>Sch.mixin.Localizable</a><br/><a href='source/Localizable.html#Sch-mixin-Localizable-property-activeLocaleId' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.mixin.Localizable-property-activeLocaleId' class='name expandable'>activeLocaleId</a> : String<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>''</code></p></div></div></div><div id='property-dirtyCls' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.ResourceAssignment'>Gnt.column.ResourceAssignment</span><br/><a href='source/ResourceAssignment.html#Gnt-column-ResourceAssignment-property-dirtyCls' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.ResourceAssignment-property-dirtyCls' class='name expandable'>dirtyCls</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'><p>Copied from the panel view if cells for this columns should be marked dirty</p>\n</div><div class='long'><p>Copied from the panel view if cells for this columns should be marked dirty</p>\n</div></div></div><div id='property-field' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.ResourceAssignment'>Gnt.column.ResourceAssignment</span><br/><a href='source/ResourceAssignment.html#Gnt-column-ResourceAssignment-property-field' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.ResourceAssignment-property-field' class='name expandable'>field</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'><p>Reference to the field used by the Editor</p>\n</div><div class='long'><p>Reference to the field used by the Editor</p>\n</div></div></div><div id='property-legacyMode' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.mixin.Localizable' rel='Sch.mixin.Localizable' class='defined-in docClass'>Sch.mixin.Localizable</a><br/><a href='source/Localizable.html#Sch-mixin-Localizable-property-legacyMode' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.mixin.Localizable-property-legacyMode' class='name expandable'>legacyMode</a> : Boolean<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>false</code></p></div></div></div><div id='property-tdCls' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.ResourceAssignment'>Gnt.column.ResourceAssignment</span><br/><a href='source/ResourceAssignment.html#Gnt-column-ResourceAssignment-property-tdCls' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.ResourceAssignment-property-tdCls' class='name expandable'>tdCls</a> : String<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>'sch-assignment-cell'</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.ResourceAssignment'>Gnt.column.ResourceAssignment</span><br/><a href='source/ResourceAssignment.html#Gnt-column-ResourceAssignment-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/Gnt.column.ResourceAssignment-method-constructor' class='name expandable'>Gnt.column.ResourceAssignment</a>( <span class='pre'>config</span> ) : <a href=\"#!/api/Gnt.column.ResourceAssignment\" rel=\"Gnt.column.ResourceAssignment\" class=\"docClass\">Gnt.column.ResourceAssignment</a><span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : Object<div class='sub-desc'></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Gnt.column.ResourceAssignment\" rel=\"Gnt.column.ResourceAssignment\" class=\"docClass\">Gnt.column.ResourceAssignment</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-L' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.mixin.Localizable' rel='Sch.mixin.Localizable' class='defined-in docClass'>Sch.mixin.Localizable</a><br/><a href='source/Localizable.html#Sch-mixin-Localizable-method-L' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.mixin.Localizable-method-L' class='name expandable'>L</a>( <span class='pre'>id, [legacyHolderProp], [skipLocalizedCheck]</span> ) : String<span class=\"signature\"></span></div><div class='description'><div class='short'>This is shorthand reference to localize. ...</div><div class='long'><p>This is shorthand reference to <a href=\"#!/api/Sch.mixin.Localizable-method-localize\" rel=\"Sch.mixin.Localizable-method-localize\" class=\"docClass\">localize</a>. Retrieves translation of a phrase.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>id</span> : String<div class='sub-desc'><p>Identifier of phrase.</p>\n</div></li><li><span class='pre'>legacyHolderProp</span> : String (optional)<div class='sub-desc'><p>Legacy class property name containing locales.</p>\n<p>Defaults to: <code>this.legacyHolderProp</code></p></div></li><li><span class='pre'>skipLocalizedCheck</span> : Boolean (optional)<div class='sub-desc'><p>Do not localize class if it's not localized yet.</p>\n<p>Defaults to: <code>false</code></p></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'><p>Translation of specified phrase.</p>\n</div></li></ul></div></div></div><div id='method-afterRender' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.ResourceAssignment'>Gnt.column.ResourceAssignment</span><br/><a href='source/ResourceAssignment.html#Gnt-column-ResourceAssignment-method-afterRender' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.ResourceAssignment-method-afterRender' class='name expandable'>afterRender</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-applyLocale' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.mixin.Localizable' rel='Sch.mixin.Localizable' class='defined-in docClass'>Sch.mixin.Localizable</a><br/><a href='source/Localizable.html#Sch-mixin-Localizable-method-applyLocale' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.mixin.Localizable-method-applyLocale' class='name expandable'>applyLocale</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-getRawData' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.ResourceAssignment'>Gnt.column.ResourceAssignment</span><br/><a href='source/ResourceAssignment.html#Gnt-column-ResourceAssignment-method-getRawData' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.ResourceAssignment-method-getRawData' class='name expandable'>getRawData</a>( <span class='pre'>task</span> ) : Object[]<span class=\"signature\"></span></div><div class='description'><div class='short'>Return assignment data to be saved to memory, only works with 'raw' format ...</div><div class='long'><p>Return assignment data to be saved to memory, only works with 'raw' format</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>task</span> : <a href=\"#!/api/Gnt.model.Task\" rel=\"Gnt.model.Task\" class=\"docClass\">Gnt.model.Task</a><div class='sub-desc'><p>Task being copied</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object[]</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-isLocaleApplied' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.mixin.Localizable' rel='Sch.mixin.Localizable' class='defined-in docClass'>Sch.mixin.Localizable</a><br/><a href='source/Localizable.html#Sch-mixin-Localizable-method-isLocaleApplied' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.mixin.Localizable-method-isLocaleApplied' class='name expandable'>isLocaleApplied</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-localize' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.mixin.Localizable' rel='Sch.mixin.Localizable' class='defined-in docClass'>Sch.mixin.Localizable</a><br/><a href='source/Localizable.html#Sch-mixin-Localizable-method-localize' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.mixin.Localizable-method-localize' class='name expandable'>localize</a>( <span class='pre'>id, [legacyHolderProp], [skipLocalizedCheck]</span> ) : String<span class=\"signature\"></span></div><div class='description'><div class='short'>Retrieves translation of a phrase. ...</div><div class='long'><p>Retrieves translation of a phrase. There is a shorthand <a href=\"#!/api/Sch.mixin.Localizable-method-L\" rel=\"Sch.mixin.Localizable-method-L\" class=\"docClass\">L</a> for this method.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>id</span> : String<div class='sub-desc'><p>Identifier of phrase.</p>\n</div></li><li><span class='pre'>legacyHolderProp</span> : String (optional)<div class='sub-desc'><p>Legacy class property name containing locales.</p>\n<p>Defaults to: <code>this.legacyHolderProp</code></p></div></li><li><span class='pre'>skipLocalizedCheck</span> : Boolean (optional)<div class='sub-desc'><p>Do not localize class if it's not localized yet.</p>\n<p>Defaults to: <code>false</code></p></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'><p>Translation of specified phrase.</p>\n</div></li></ul></div></div></div><div id='method-onAfterEdit' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.ResourceAssignment'>Gnt.column.ResourceAssignment</span><br/><a href='source/ResourceAssignment.html#Gnt-column-ResourceAssignment-method-onAfterEdit' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.ResourceAssignment-method-onAfterEdit' class='name expandable'>onAfterEdit</a>( <span class='pre'>editor, context</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>Restore focus to original Gantt cell after editing is done ...</div><div class='long'><p>Restore focus to original Gantt cell after editing is done</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>editor</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>context</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-putRawData' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.ResourceAssignment'>Gnt.column.ResourceAssignment</span><br/><a href='source/ResourceAssignment.html#Gnt-column-ResourceAssignment-method-putRawData' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.ResourceAssignment-method-putRawData' class='name expandable'>putRawData</a>( <span class='pre'>data, task</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Will validate and insert previously prepared assignment data ...</div><div class='long'><p>Will validate and insert previously prepared assignment data</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>data</span> : Object[]<div class='sub-desc'><p>Data to insert, should be valid input for store.add method</p>\n</div></li><li><span class='pre'>task</span> : <a href=\"#!/api/Gnt.model.Task\" rel=\"Gnt.model.Task\" class=\"docClass\">Gnt.model.Task</a><div class='sub-desc'><p>Record being populated with this data</p>\n</div></li></ul></div></div></div><div id='method-renderer' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.ResourceAssignment'>Gnt.column.ResourceAssignment</span><br/><a href='source/ResourceAssignment.html#Gnt-column-ResourceAssignment-method-renderer' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.ResourceAssignment-method-renderer' class='name expandable'>renderer</a>( <span class='pre'>value, meta, task</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>value</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>meta</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>task</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-sorterFn' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.ResourceAssignment'>Gnt.column.ResourceAssignment</span><br/><a href='source/ResourceAssignment.html#Gnt-column-ResourceAssignment-method-sorterFn' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.ResourceAssignment-method-sorterFn' class='name expandable'>sorterFn</a>( <span class='pre'>task1, task2</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>task1</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>task2</span> : Object<div class='sub-desc'></div></li></ul></div></div></div></div></div></div></div>","meta":{}});