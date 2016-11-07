Ext.data.JsonP.Gnt_column_SchedulingMode({"tagname":"class","name":"Gnt.column.SchedulingMode","autodetected":{"aliases":true,"alternateClassNames":true,"mixins":true,"requires":true,"uses":true,"members":true,"code_type":true},"files":[{"filename":"SchedulingMode.js","href":"SchedulingMode2.html#Gnt-column-SchedulingMode"}],"extends":"Ext.grid.column.Column","aliases":{"widget":["schedulingmodecolumn","ganttcolumn.schedulingmode"]},"alternateClassNames":[],"mixins":["Gnt.column.mixin.TaskFieldColumn"],"requires":["Gnt.field.SchedulingMode"],"uses":[],"members":[{"name":"align","tagname":"cfg","owner":"Gnt.column.SchedulingMode","id":"cfg-align","meta":{}},{"name":"data","tagname":"cfg","owner":"Gnt.column.SchedulingMode","id":"cfg-data","meta":{}},{"name":"instantUpdate","tagname":"cfg","owner":"Gnt.column.SchedulingMode","id":"cfg-instantUpdate","meta":{}},{"name":"l10n","tagname":"cfg","owner":"Gnt.column.SchedulingMode","id":"cfg-l10n","meta":{}},{"name":"width","tagname":"cfg","owner":"Gnt.column.SchedulingMode","id":"cfg-width","meta":{}},{"name":"Reference","tagname":"property","owner":"Gnt.column.mixin.TaskFieldColumn","id":"property-Reference","meta":{}},{"name":"activeLocaleId","tagname":"property","owner":"Sch.mixin.Localizable","id":"property-activeLocaleId","meta":{"private":true}},{"name":"defaultEditor","tagname":"property","owner":"Gnt.column.SchedulingMode","id":"property-defaultEditor","meta":{"private":true}},{"name":"editor","tagname":"property","owner":"Gnt.column.SchedulingMode","id":"property-editor","meta":{"private":true}},{"name":"fieldConfigs","tagname":"property","owner":"Gnt.column.mixin.TaskFieldColumn","id":"property-fieldConfigs","meta":{"private":true}},{"name":"fieldProperty","tagname":"property","owner":"Gnt.column.SchedulingMode","id":"property-fieldProperty","meta":{"private":true}},{"name":"legacyMode","tagname":"property","owner":"Sch.mixin.Localizable","id":"property-legacyMode","meta":{"private":true}},{"name":"mixinConfig","tagname":"property","owner":"Gnt.column.mixin.TaskFieldColumn","id":"property-mixinConfig","meta":{"private":true}},{"name":"useRenderer","tagname":"property","owner":"Gnt.column.mixin.TaskFieldColumn","id":"property-useRenderer","meta":{"private":true}},{"name":"L","tagname":"method","owner":"Sch.mixin.Localizable","id":"method-L","meta":{}},{"name":"_beforeRender","tagname":"method","owner":"Gnt.column.mixin.TaskFieldColumn","id":"method-_beforeRender","meta":{"private":true}},{"name":"afterClassMixedIn","tagname":"method","owner":"Gnt.column.mixin.TaskFieldColumn","id":"method-afterClassMixedIn","meta":{"private":true}},{"name":"afterInitComponent","tagname":"method","owner":"Gnt.column.mixin.TaskFieldColumn","id":"method-afterInitComponent","meta":{"private":true}},{"name":"applyColumnCls","tagname":"method","owner":"Gnt.column.mixin.TaskFieldColumn","id":"method-applyColumnCls","meta":{"private":true}},{"name":"applyLocale","tagname":"method","owner":"Sch.mixin.Localizable","id":"method-applyLocale","meta":{"private":true}},{"name":"getValueToRender","tagname":"method","owner":"Gnt.column.mixin.TaskFieldColumn","id":"method-getValueToRender","meta":{"private":true}},{"name":"initColumnEditor","tagname":"method","owner":"Gnt.column.mixin.TaskFieldColumn","id":"method-initColumnEditor","meta":{"private":true}},{"name":"initComponent","tagname":"method","owner":"Gnt.column.SchedulingMode","id":"method-initComponent","meta":{"private":true}},{"name":"initTaskFieldColumn","tagname":"method","owner":"Gnt.column.mixin.TaskFieldColumn","id":"method-initTaskFieldColumn","meta":{"private":true}},{"name":"isLocaleApplied","tagname":"method","owner":"Sch.mixin.Localizable","id":"method-isLocaleApplied","meta":{"private":true}},{"name":"localize","tagname":"method","owner":"Sch.mixin.Localizable","id":"method-localize","meta":{}},{"name":"onColumnAdded","tagname":"method","owner":"Gnt.column.mixin.TaskFieldColumn","id":"method-onColumnAdded","meta":{"private":true}},{"name":"taskFieldRenderer","tagname":"method","owner":"Gnt.column.mixin.TaskFieldColumn","id":"method-taskFieldRenderer","meta":{"private":true}}],"code_type":"ext_define","id":"class-Gnt.column.SchedulingMode","short_doc":"A Column showing the SchedulingMode field of a task. ...","component":false,"superclasses":["Ext.grid.column.Column"],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Ext.grid.column.Column<div class='subclass '><strong>Gnt.column.SchedulingMode</strong></div></div><h4>Mixins</h4><div class='dependency'><a href='#!/api/Gnt.column.mixin.TaskFieldColumn' rel='Gnt.column.mixin.TaskFieldColumn' class='docClass'>Gnt.column.mixin.TaskFieldColumn</a></div><h4>Requires</h4><div class='dependency'><a href='#!/api/Gnt.field.SchedulingMode' rel='Gnt.field.SchedulingMode' class='docClass'>Gnt.field.SchedulingMode</a></div><h4>Files</h4><div class='dependency'><a href='source/SchedulingMode2.html#Gnt-column-SchedulingMode' target='_blank'>SchedulingMode.js</a></div></pre><div class='doc-contents'><p>A Column showing the <code>SchedulingMode</code> field of a task. The column is editable when adding a\n<code><a href=\"#!/api/Sch.plugin.TreeCellEditing\" rel=\"Sch.plugin.TreeCellEditing\" class=\"docClass\">Sch.plugin.TreeCellEditing</a></code> plugin to your Gantt panel. The overall setup will look like this:</p>\n\n<pre><code>var gantt = Ext.create('<a href=\"#!/api/Gnt.panel.Gantt\" rel=\"Gnt.panel.Gantt\" class=\"docClass\">Gnt.panel.Gantt</a>', {\n    height      : 600,\n    width       : 1000,\n\n    columns         : [\n        ...\n        {\n            xtype       : 'schedulingmodecolumn',\n            width       : 80\n        }\n        ...\n    ],\n\n    plugins             : [\n        Ext.create('<a href=\"#!/api/Sch.plugin.TreeCellEditing\" rel=\"Sch.plugin.TreeCellEditing\" class=\"docClass\">Sch.plugin.TreeCellEditing</a>', {\n            clicksToEdit: 1\n        })\n    ],\n    ...\n})\n</code></pre>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div id='cfg-align' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.SchedulingMode'>Gnt.column.SchedulingMode</span><br/><a href='source/SchedulingMode2.html#Gnt-column-SchedulingMode-cfg-align' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.SchedulingMode-cfg-align' class='name expandable'>align</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'>The alignment of the text in the column. ...</div><div class='long'><p>The alignment of the text in the column.</p>\n<p>Defaults to: <code>'left'</code></p></div></div></div><div id='cfg-data' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.SchedulingMode'>Gnt.column.SchedulingMode</span><br/><a href='source/SchedulingMode2.html#Gnt-column-SchedulingMode-cfg-data' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.SchedulingMode-cfg-data' class='name expandable'>data</a> : Array<span class=\"signature\"></span></div><div class='description'><div class='short'>A 2-dimensional array used for editing in combobox. ...</div><div class='long'><p>A 2-dimensional array used for editing in combobox. The first item of inner arrays will be treated as \"value\" and 2nd - as \"display\"</p>\n</div></div></div><div id='cfg-instantUpdate' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.SchedulingMode'>Gnt.column.SchedulingMode</span><br/><a href='source/SchedulingMode2.html#Gnt-column-SchedulingMode-cfg-instantUpdate' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.SchedulingMode-cfg-instantUpdate' class='name expandable'>instantUpdate</a> : Boolean<span class=\"signature\"></span></div><div class='description'><div class='short'>Set to true to instantly apply any changes in the field to the task. ...</div><div class='long'><p>Set to <code>true</code> to instantly apply any changes in the field to the task.\nThis option is just translated to the <a href=\"#!/api/Gnt.field.mixin.TaskField-cfg-instantUpdate\" rel=\"Gnt.field.mixin.TaskField-cfg-instantUpdate\" class=\"docClass\">Gnt.field.mixin.TaskField.instantUpdate</a> config option.</p>\n<p>Defaults to: <code>false</code></p><p>Overrides: <a href=\"#!/api/Gnt.column.mixin.TaskFieldColumn-cfg-instantUpdate\" rel=\"Gnt.column.mixin.TaskFieldColumn-cfg-instantUpdate\" class=\"docClass\">Gnt.column.mixin.TaskFieldColumn.instantUpdate</a></p></div></div></div><div id='cfg-l10n' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.SchedulingMode'>Gnt.column.SchedulingMode</span><br/><a href='source/SchedulingMode2.html#Gnt-column-SchedulingMode-cfg-l10n' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.SchedulingMode-cfg-l10n' class='name expandable'>l10n</a> : Object<span class=\"signature\"></span></div><div class='description'><div class='short'>A object, purposed for the class localization. ...</div><div class='long'><p>A object, purposed for the class localization. Contains the following keys/values:</p>\n\n<pre><code>        - text : 'Mode'\n</code></pre>\n<p>Overrides: <a href=\"#!/api/Sch.mixin.Localizable-cfg-l10n\" rel=\"Sch.mixin.Localizable-cfg-l10n\" class=\"docClass\">Sch.mixin.Localizable.l10n</a></p></div></div></div><div id='cfg-width' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.SchedulingMode'>Gnt.column.SchedulingMode</span><br/><a href='source/SchedulingMode2.html#Gnt-column-SchedulingMode-cfg-width' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.SchedulingMode-cfg-width' class='name expandable'>width</a> : Number<span class=\"signature\"></span></div><div class='description'><div class='short'>The width of the column. ...</div><div class='long'><p>The width of the column.</p>\n<p>Defaults to: <code>100</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-Reference' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Gnt.column.mixin.TaskFieldColumn' rel='Gnt.column.mixin.TaskFieldColumn' class='defined-in docClass'>Gnt.column.mixin.TaskFieldColumn</a><br/><a href='source/TaskFieldColumn.html#Gnt-column-mixin-TaskFieldColumn-property-Reference' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.mixin.TaskFieldColumn-property-Reference' class='name expandable'>Reference</a> : Ext.form.field.Field<span class=\"signature\"></span></div><div class='description'><div class='short'><p>to the field used by the editor</p>\n</div><div class='long'><p>to the field used by the editor</p>\n</div></div></div><div id='property-activeLocaleId' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.mixin.Localizable' rel='Sch.mixin.Localizable' class='defined-in docClass'>Sch.mixin.Localizable</a><br/><a href='source/Localizable.html#Sch-mixin-Localizable-property-activeLocaleId' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.mixin.Localizable-property-activeLocaleId' class='name expandable'>activeLocaleId</a> : String<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>''</code></p></div></div></div><div id='property-defaultEditor' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.SchedulingMode'>Gnt.column.SchedulingMode</span><br/><a href='source/SchedulingMode2.html#Gnt-column-SchedulingMode-property-defaultEditor' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.SchedulingMode-property-defaultEditor' class='name expandable'>defaultEditor</a> : String<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>'schedulingmodefield'</code></p><p>Overrides: <a href=\"#!/api/Gnt.column.mixin.TaskFieldColumn-property-defaultEditor\" rel=\"Gnt.column.mixin.TaskFieldColumn-property-defaultEditor\" class=\"docClass\">Gnt.column.mixin.TaskFieldColumn.defaultEditor</a></p></div></div></div><div id='property-editor' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.SchedulingMode'>Gnt.column.SchedulingMode</span><br/><a href='source/SchedulingMode2.html#Gnt-column-SchedulingMode-property-editor' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.SchedulingMode-property-editor' class='name expandable'>editor</a> : String<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>'schedulingmodefield'</code></p></div></div></div><div id='property-fieldConfigs' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Gnt.column.mixin.TaskFieldColumn' rel='Gnt.column.mixin.TaskFieldColumn' class='defined-in docClass'>Gnt.column.mixin.TaskFieldColumn</a><br/><a href='source/TaskFieldColumn.html#Gnt-column-mixin-TaskFieldColumn-property-fieldConfigs' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.mixin.TaskFieldColumn-property-fieldConfigs' class='name expandable'>fieldConfigs</a> : String<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>'instantUpdate,fieldProperty'</code></p></div></div></div><div id='property-fieldProperty' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.SchedulingMode'>Gnt.column.SchedulingMode</span><br/><a href='source/SchedulingMode2.html#Gnt-column-SchedulingMode-property-fieldProperty' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.SchedulingMode-property-fieldProperty' class='name expandable'>fieldProperty</a> : String<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>'schedulingModeField'</code></p><p>Overrides: <a href=\"#!/api/Gnt.column.mixin.TaskFieldColumn-property-fieldProperty\" rel=\"Gnt.column.mixin.TaskFieldColumn-property-fieldProperty\" class=\"docClass\">Gnt.column.mixin.TaskFieldColumn.fieldProperty</a></p></div></div></div><div id='property-legacyMode' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.mixin.Localizable' rel='Sch.mixin.Localizable' class='defined-in docClass'>Sch.mixin.Localizable</a><br/><a href='source/Localizable.html#Sch-mixin-Localizable-property-legacyMode' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.mixin.Localizable-property-legacyMode' class='name expandable'>legacyMode</a> : Boolean<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>false</code></p></div></div></div><div id='property-mixinConfig' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Gnt.column.mixin.TaskFieldColumn' rel='Gnt.column.mixin.TaskFieldColumn' class='defined-in docClass'>Gnt.column.mixin.TaskFieldColumn</a><br/><a href='source/TaskFieldColumn.html#Gnt-column-mixin-TaskFieldColumn-property-mixinConfig' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.mixin.TaskFieldColumn-property-mixinConfig' class='name expandable'>mixinConfig</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>{after: {initComponent: 'afterInitComponent', onRender: '_beforeRender'}, afterIf: {applyColumnCls: 'applyColumnCls'}}</code></p></div></div></div><div id='property-useRenderer' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Gnt.column.mixin.TaskFieldColumn' rel='Gnt.column.mixin.TaskFieldColumn' class='defined-in docClass'>Gnt.column.mixin.TaskFieldColumn</a><br/><a href='source/TaskFieldColumn.html#Gnt-column-mixin-TaskFieldColumn-property-useRenderer' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.mixin.TaskFieldColumn-property-useRenderer' class='name expandable'>useRenderer</a> : Boolean<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>true</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-L' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.mixin.Localizable' rel='Sch.mixin.Localizable' class='defined-in docClass'>Sch.mixin.Localizable</a><br/><a href='source/Localizable.html#Sch-mixin-Localizable-method-L' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.mixin.Localizable-method-L' class='name expandable'>L</a>( <span class='pre'>id, [legacyHolderProp], [skipLocalizedCheck]</span> ) : String<span class=\"signature\"></span></div><div class='description'><div class='short'>This is shorthand reference to localize. ...</div><div class='long'><p>This is shorthand reference to <a href=\"#!/api/Sch.mixin.Localizable-method-localize\" rel=\"Sch.mixin.Localizable-method-localize\" class=\"docClass\">localize</a>. Retrieves translation of a phrase.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>id</span> : String<div class='sub-desc'><p>Identifier of phrase.</p>\n</div></li><li><span class='pre'>legacyHolderProp</span> : String (optional)<div class='sub-desc'><p>Legacy class property name containing locales.</p>\n<p>Defaults to: <code>this.legacyHolderProp</code></p></div></li><li><span class='pre'>skipLocalizedCheck</span> : Boolean (optional)<div class='sub-desc'><p>Do not localize class if it's not localized yet.</p>\n<p>Defaults to: <code>false</code></p></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'><p>Translation of specified phrase.</p>\n</div></li></ul></div></div></div><div id='method-_beforeRender' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Gnt.column.mixin.TaskFieldColumn' rel='Gnt.column.mixin.TaskFieldColumn' class='defined-in docClass'>Gnt.column.mixin.TaskFieldColumn</a><br/><a href='source/TaskFieldColumn.html#Gnt-column-mixin-TaskFieldColumn-method-_beforeRender' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.mixin.TaskFieldColumn-method-_beforeRender' class='name expandable'>_beforeRender</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-afterClassMixedIn' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Gnt.column.mixin.TaskFieldColumn' rel='Gnt.column.mixin.TaskFieldColumn' class='defined-in docClass'>Gnt.column.mixin.TaskFieldColumn</a><br/><a href='source/TaskFieldColumn.html#Gnt-column-mixin-TaskFieldColumn-method-afterClassMixedIn' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.mixin.TaskFieldColumn-method-afterClassMixedIn' class='name expandable'>afterClassMixedIn</a>( <span class='pre'>cls</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>cls</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-afterInitComponent' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Gnt.column.mixin.TaskFieldColumn' rel='Gnt.column.mixin.TaskFieldColumn' class='defined-in docClass'>Gnt.column.mixin.TaskFieldColumn</a><br/><a href='source/TaskFieldColumn.html#Gnt-column-mixin-TaskFieldColumn-method-afterInitComponent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.mixin.TaskFieldColumn-method-afterInitComponent' class='name expandable'>afterInitComponent</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-applyColumnCls' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Gnt.column.mixin.TaskFieldColumn' rel='Gnt.column.mixin.TaskFieldColumn' class='defined-in docClass'>Gnt.column.mixin.TaskFieldColumn</a><br/><a href='source/TaskFieldColumn.html#Gnt-column-mixin-TaskFieldColumn-method-applyColumnCls' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.mixin.TaskFieldColumn-method-applyColumnCls' class='name expandable'>applyColumnCls</a>( <span class='pre'>value, meta, task</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>value</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>meta</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>task</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-applyLocale' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.mixin.Localizable' rel='Sch.mixin.Localizable' class='defined-in docClass'>Sch.mixin.Localizable</a><br/><a href='source/Localizable.html#Sch-mixin-Localizable-method-applyLocale' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.mixin.Localizable-method-applyLocale' class='name expandable'>applyLocale</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-getValueToRender' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Gnt.column.mixin.TaskFieldColumn' rel='Gnt.column.mixin.TaskFieldColumn' class='defined-in docClass'>Gnt.column.mixin.TaskFieldColumn</a><br/><a href='source/TaskFieldColumn.html#Gnt-column-mixin-TaskFieldColumn-method-getValueToRender' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.mixin.TaskFieldColumn-method-getValueToRender' class='name expandable'>getValueToRender</a>( <span class='pre'>value, meta, task</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>value</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>meta</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>task</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-initColumnEditor' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Gnt.column.mixin.TaskFieldColumn' rel='Gnt.column.mixin.TaskFieldColumn' class='defined-in docClass'>Gnt.column.mixin.TaskFieldColumn</a><br/><a href='source/TaskFieldColumn.html#Gnt-column-mixin-TaskFieldColumn-method-initColumnEditor' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.mixin.TaskFieldColumn-method-initColumnEditor' class='name expandable'>initColumnEditor</a>( <span class='pre'>editorCfg</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>editorCfg</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-initComponent' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.SchedulingMode'>Gnt.column.SchedulingMode</span><br/><a href='source/SchedulingMode2.html#Gnt-column-SchedulingMode-method-initComponent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.SchedulingMode-method-initComponent' class='name expandable'>initComponent</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-initTaskFieldColumn' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Gnt.column.mixin.TaskFieldColumn' rel='Gnt.column.mixin.TaskFieldColumn' class='defined-in docClass'>Gnt.column.mixin.TaskFieldColumn</a><br/><a href='source/TaskFieldColumn.html#Gnt-column-mixin-TaskFieldColumn-method-initTaskFieldColumn' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.mixin.TaskFieldColumn-method-initTaskFieldColumn' class='name expandable'>initTaskFieldColumn</a>( <span class='pre'>editorCfg</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>editorCfg</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-isLocaleApplied' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.mixin.Localizable' rel='Sch.mixin.Localizable' class='defined-in docClass'>Sch.mixin.Localizable</a><br/><a href='source/Localizable.html#Sch-mixin-Localizable-method-isLocaleApplied' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.mixin.Localizable-method-isLocaleApplied' class='name expandable'>isLocaleApplied</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-localize' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.mixin.Localizable' rel='Sch.mixin.Localizable' class='defined-in docClass'>Sch.mixin.Localizable</a><br/><a href='source/Localizable.html#Sch-mixin-Localizable-method-localize' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.mixin.Localizable-method-localize' class='name expandable'>localize</a>( <span class='pre'>id, [legacyHolderProp], [skipLocalizedCheck]</span> ) : String<span class=\"signature\"></span></div><div class='description'><div class='short'>Retrieves translation of a phrase. ...</div><div class='long'><p>Retrieves translation of a phrase. There is a shorthand <a href=\"#!/api/Sch.mixin.Localizable-method-L\" rel=\"Sch.mixin.Localizable-method-L\" class=\"docClass\">L</a> for this method.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>id</span> : String<div class='sub-desc'><p>Identifier of phrase.</p>\n</div></li><li><span class='pre'>legacyHolderProp</span> : String (optional)<div class='sub-desc'><p>Legacy class property name containing locales.</p>\n<p>Defaults to: <code>this.legacyHolderProp</code></p></div></li><li><span class='pre'>skipLocalizedCheck</span> : Boolean (optional)<div class='sub-desc'><p>Do not localize class if it's not localized yet.</p>\n<p>Defaults to: <code>false</code></p></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'><p>Translation of specified phrase.</p>\n</div></li></ul></div></div></div><div id='method-onColumnAdded' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Gnt.column.mixin.TaskFieldColumn' rel='Gnt.column.mixin.TaskFieldColumn' class='defined-in docClass'>Gnt.column.mixin.TaskFieldColumn</a><br/><a href='source/TaskFieldColumn.html#Gnt-column-mixin-TaskFieldColumn-method-onColumnAdded' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.mixin.TaskFieldColumn-method-onColumnAdded' class='name expandable'>onColumnAdded</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-taskFieldRenderer' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Gnt.column.mixin.TaskFieldColumn' rel='Gnt.column.mixin.TaskFieldColumn' class='defined-in docClass'>Gnt.column.mixin.TaskFieldColumn</a><br/><a href='source/TaskFieldColumn.html#Gnt-column-mixin-TaskFieldColumn-method-taskFieldRenderer' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.mixin.TaskFieldColumn-method-taskFieldRenderer' class='name expandable'>taskFieldRenderer</a>( <span class='pre'>value, meta, task</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>value</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>meta</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>task</span> : Object<div class='sub-desc'></div></li></ul></div></div></div></div></div></div></div>","meta":{}});