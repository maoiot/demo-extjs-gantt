Ext.data.JsonP.Gnt_column_EndDate({"tagname":"class","name":"Gnt.column.EndDate","autodetected":{"aliases":true,"alternateClassNames":true,"mixins":true,"requires":true,"uses":true,"members":true,"code_type":true},"files":[{"filename":"EndDate.js","href":"EndDate2.html#Gnt-column-EndDate"}],"extends":"Ext.grid.column.Date","aliases":{"widget":["enddatecolumn","ganttcolumn.enddate"]},"alternateClassNames":[],"mixins":["Gnt.column.mixin.TaskFieldColumn"],"requires":["Ext.grid.CellEditor","Gnt.field.EndDate"],"uses":[],"members":[{"name":"adjustMilestones","tagname":"cfg","owner":"Gnt.column.EndDate","id":"cfg-adjustMilestones","meta":{}},{"name":"align","tagname":"cfg","owner":"Gnt.column.EndDate","id":"cfg-align","meta":{}},{"name":"editorFormat","tagname":"cfg","owner":"Gnt.column.EndDate","id":"cfg-editorFormat","meta":{}},{"name":"instantUpdate","tagname":"cfg","owner":"Gnt.column.mixin.TaskFieldColumn","id":"cfg-instantUpdate","meta":{}},{"name":"keepDuration","tagname":"cfg","owner":"Gnt.column.EndDate","id":"cfg-keepDuration","meta":{}},{"name":"l10n","tagname":"cfg","owner":"Gnt.column.EndDate","id":"cfg-l10n","meta":{}},{"name":"validateStartDate","tagname":"cfg","owner":"Gnt.column.EndDate","id":"cfg-validateStartDate","meta":{}},{"name":"width","tagname":"cfg","owner":"Gnt.column.EndDate","id":"cfg-width","meta":{}},{"name":"Reference","tagname":"property","owner":"Gnt.column.mixin.TaskFieldColumn","id":"property-Reference","meta":{}},{"name":"activeLocaleId","tagname":"property","owner":"Sch.mixin.Localizable","id":"property-activeLocaleId","meta":{"private":true}},{"name":"defaultEditor","tagname":"property","owner":"Gnt.column.EndDate","id":"property-defaultEditor","meta":{"private":true}},{"name":"editor","tagname":"property","owner":"Gnt.column.EndDate","id":"property-editor","meta":{"private":true}},{"name":"fieldConfigs","tagname":"property","owner":"Gnt.column.EndDate","id":"property-fieldConfigs","meta":{"private":true}},{"name":"fieldProperty","tagname":"property","owner":"Gnt.column.EndDate","id":"property-fieldProperty","meta":{"private":true}},{"name":"legacyMode","tagname":"property","owner":"Sch.mixin.Localizable","id":"property-legacyMode","meta":{"private":true}},{"name":"mixinConfig","tagname":"property","owner":"Gnt.column.mixin.TaskFieldColumn","id":"property-mixinConfig","meta":{"private":true}},{"name":"useRenderer","tagname":"property","owner":"Gnt.column.mixin.TaskFieldColumn","id":"property-useRenderer","meta":{"private":true}},{"name":"L","tagname":"method","owner":"Sch.mixin.Localizable","id":"method-L","meta":{}},{"name":"_beforeRender","tagname":"method","owner":"Gnt.column.mixin.TaskFieldColumn","id":"method-_beforeRender","meta":{"private":true}},{"name":"afterClassMixedIn","tagname":"method","owner":"Gnt.column.mixin.TaskFieldColumn","id":"method-afterClassMixedIn","meta":{"private":true}},{"name":"afterInitComponent","tagname":"method","owner":"Gnt.column.mixin.TaskFieldColumn","id":"method-afterInitComponent","meta":{"private":true}},{"name":"applyColumnCls","tagname":"method","owner":"Gnt.column.mixin.TaskFieldColumn","id":"method-applyColumnCls","meta":{"private":true}},{"name":"applyLocale","tagname":"method","owner":"Sch.mixin.Localizable","id":"method-applyLocale","meta":{"private":true}},{"name":"getValueToRender","tagname":"method","owner":"Gnt.column.EndDate","id":"method-getValueToRender","meta":{"private":true}},{"name":"initColumnEditor","tagname":"method","owner":"Gnt.column.mixin.TaskFieldColumn","id":"method-initColumnEditor","meta":{"private":true}},{"name":"initComponent","tagname":"method","owner":"Gnt.column.EndDate","id":"method-initComponent","meta":{"private":true}},{"name":"initTaskFieldColumn","tagname":"method","owner":"Gnt.column.mixin.TaskFieldColumn","id":"method-initTaskFieldColumn","meta":{"private":true}},{"name":"isLocaleApplied","tagname":"method","owner":"Sch.mixin.Localizable","id":"method-isLocaleApplied","meta":{"private":true}},{"name":"localize","tagname":"method","owner":"Sch.mixin.Localizable","id":"method-localize","meta":{}},{"name":"onColumnAdded","tagname":"method","owner":"Gnt.column.mixin.TaskFieldColumn","id":"method-onColumnAdded","meta":{"private":true}},{"name":"putRawData","tagname":"method","owner":"Gnt.column.EndDate","id":"method-putRawData","meta":{"private":true}},{"name":"taskFieldRenderer","tagname":"method","owner":"Gnt.column.mixin.TaskFieldColumn","id":"method-taskFieldRenderer","meta":{"private":true}}],"code_type":"ext_define","id":"class-Gnt.column.EndDate","short_doc":"A Column showing the EndDate field of the tasks. ...","component":false,"superclasses":["Ext.grid.column.Date"],"subclasses":["Gnt.column.BaselineEndDate"],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Ext.grid.column.Date<div class='subclass '><strong>Gnt.column.EndDate</strong></div></div><h4>Mixins</h4><div class='dependency'><a href='#!/api/Gnt.column.mixin.TaskFieldColumn' rel='Gnt.column.mixin.TaskFieldColumn' class='docClass'>Gnt.column.mixin.TaskFieldColumn</a></div><h4>Requires</h4><div class='dependency'>Ext.grid.CellEditor</div><div class='dependency'><a href='#!/api/Gnt.field.EndDate' rel='Gnt.field.EndDate' class='docClass'>Gnt.field.EndDate</a></div><h4>Subclasses</h4><div class='dependency'><a href='#!/api/Gnt.column.BaselineEndDate' rel='Gnt.column.BaselineEndDate' class='docClass'>Gnt.column.BaselineEndDate</a></div><h4>Files</h4><div class='dependency'><a href='source/EndDate2.html#Gnt-column-EndDate' target='_blank'>EndDate.js</a></div></pre><div class='doc-contents'><p>A Column showing the <code>EndDate</code> field of the tasks. The column is editable when adding a\n<code><a href=\"#!/api/Sch.plugin.TreeCellEditing\" rel=\"Sch.plugin.TreeCellEditing\" class=\"docClass\">Sch.plugin.TreeCellEditing</a></code> plugin to your gantt panel. The overall setup will look like this:</p>\n\n<pre><code>var gantt = Ext.create('<a href=\"#!/api/Gnt.panel.Gantt\" rel=\"Gnt.panel.Gantt\" class=\"docClass\">Gnt.panel.Gantt</a>', {\n    height  : 600,\n    width   : 1000,\n\n    columns : [\n        ...\n        {\n            xtype : 'enddatecolumn',\n            width : 80\n        }\n        ...\n    ],\n\n    plugins : [\n        Ext.create('<a href=\"#!/api/Sch.plugin.TreeCellEditing\" rel=\"Sch.plugin.TreeCellEditing\" class=\"docClass\">Sch.plugin.TreeCellEditing</a>', {\n            clicksToEdit: 1\n        })\n    ],\n    ...\n})\n</code></pre>\n\n<p>Note, that this column will provide only a day-level editor (using a subclassed Ext JS DateField). If you need a more precise editing (ie also specify\nthe start hour/minute) you will need to provide your own field (which should extend <a href=\"#!/api/Gnt.field.EndDate\" rel=\"Gnt.field.EndDate\" class=\"docClass\">Gnt.field.EndDate</a>). See this <a href=\"http://bryntum.com/forum/viewtopic.php?f=16&amp;t=2277&amp;start=10#p13964\">forum thread</a> for more information.</p>\n\n<p>Note that the end date of task in gantt is not inclusive, however, this column will compensate the value when rendering or editing.\nSo for example, if you have a 1 day task which starts at 2011/07/20 and ends at 2011/07/21 (remember end date is not inclusive!),\nthis column will show the <code>2011/07/20</code> when rendering. It will also increase the date by 1 day after being edited.</p>\n\n<p>Also note, that this class inherits from Ext.grid.column.Date and supports its configuration options, notably the \"format\" option.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div id='cfg-adjustMilestones' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.EndDate'>Gnt.column.EndDate</span><br/><a href='source/EndDate2.html#Gnt-column-EndDate-cfg-adjustMilestones' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.EndDate-cfg-adjustMilestones' class='name expandable'>adjustMilestones</a> : Boolean<span class=\"signature\"></span></div><div class='description'><div class='short'>When set to true, the start/end dates of the milestones will be adjusted -1 day during rendering and editing. ...</div><div class='long'><p>When set to <code>true</code>, the start/end dates of the milestones will be adjusted -1 day <em>during rendering and editing</em>. The task model will still hold unmodified date.</p>\n<p>Defaults to: <code>true</code></p></div></div></div><div id='cfg-align' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.EndDate'>Gnt.column.EndDate</span><br/><a href='source/EndDate2.html#Gnt-column-EndDate-cfg-align' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.EndDate-cfg-align' class='name expandable'>align</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'>The alignment of the text in the column. ...</div><div class='long'><p>The alignment of the text in the column.</p>\n<p>Defaults to: <code>'left'</code></p></div></div></div><div id='cfg-editorFormat' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.EndDate'>Gnt.column.EndDate</span><br/><a href='source/EndDate2.html#Gnt-column-EndDate-cfg-editorFormat' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.EndDate-cfg-editorFormat' class='name expandable'>editorFormat</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'>A date format to be used when editing the value of the column. ...</div><div class='long'><p>A date format to be used when editing the value of the column. By default it is the same as <code>format</code> configuration\noption of the column itself.</p>\n</div></div></div><div id='cfg-instantUpdate' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Gnt.column.mixin.TaskFieldColumn' rel='Gnt.column.mixin.TaskFieldColumn' class='defined-in docClass'>Gnt.column.mixin.TaskFieldColumn</a><br/><a href='source/TaskFieldColumn.html#Gnt-column-mixin-TaskFieldColumn-cfg-instantUpdate' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.mixin.TaskFieldColumn-cfg-instantUpdate' class='name expandable'>instantUpdate</a> : Boolean<span class=\"signature\"></span></div><div class='description'><div class='short'>Set to true to instantly apply any changes in the field to the task. ...</div><div class='long'><p>Set to <code>true</code> to instantly apply any changes in the field to the task.\nThis option is just translated to the <a href=\"#!/api/Gnt.field.mixin.TaskField-cfg-instantUpdate\" rel=\"Gnt.field.mixin.TaskField-cfg-instantUpdate\" class=\"docClass\">Gnt.field.mixin.TaskField.instantUpdate</a> config option.</p>\n<p>Defaults to: <code>false</code></p></div></div></div><div id='cfg-keepDuration' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.EndDate'>Gnt.column.EndDate</span><br/><a href='source/EndDate2.html#Gnt-column-EndDate-cfg-keepDuration' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.EndDate-cfg-keepDuration' class='name expandable'>keepDuration</a> : Boolean<span class=\"signature\"></span></div><div class='description'><div class='short'>Pass true to keep the duration of the task (\"move\" the task), false to change the duration (\"resize\" the task). ...</div><div class='long'><p>Pass <code>true</code> to keep the duration of the task (\"move\" the task), <code>false</code> to change the duration (\"resize\" the task).</p>\n<p>Defaults to: <code>false</code></p></div></div></div><div id='cfg-l10n' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.EndDate'>Gnt.column.EndDate</span><br/><a href='source/EndDate2.html#Gnt-column-EndDate-cfg-l10n' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.EndDate-cfg-l10n' class='name expandable'>l10n</a> : Object<span class=\"signature\"></span></div><div class='description'><div class='short'>A object, purposed for the class localization. ...</div><div class='long'><p>A object, purposed for the class localization. Contains the following keys/values:</p>\n\n<pre><code>    - text : 'Finish'\n</code></pre>\n<p>Overrides: <a href=\"#!/api/Sch.mixin.Localizable-cfg-l10n\" rel=\"Sch.mixin.Localizable-cfg-l10n\" class=\"docClass\">Sch.mixin.Localizable.l10n</a></p></div></div></div><div id='cfg-validateStartDate' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.EndDate'>Gnt.column.EndDate</span><br/><a href='source/EndDate2.html#Gnt-column-EndDate-cfg-validateStartDate' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.EndDate-cfg-validateStartDate' class='name expandable'>validateStartDate</a> : Boolean<span class=\"signature\"></span></div><div class='description'><div class='short'>When set to true, the column will validate a \"startDate &lt;= endDate\" condition and won't allow user to save the inv...</div><div class='long'><p>When set to <code>true</code>, the column will validate a \"startDate &lt;= endDate\" condition and won't allow user to save the invalid end date.\nSet it to <code>false</code> if you use different validation mechanism.</p>\n<p>Defaults to: <code>true</code></p></div></div></div><div id='cfg-width' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.EndDate'>Gnt.column.EndDate</span><br/><a href='source/EndDate2.html#Gnt-column-EndDate-cfg-width' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.EndDate-cfg-width' class='name expandable'>width</a> : Number<span class=\"signature\"></span></div><div class='description'><div class='short'>The width of the column. ...</div><div class='long'><p>The width of the column.</p>\n<p>Defaults to: <code>100</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-Reference' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Gnt.column.mixin.TaskFieldColumn' rel='Gnt.column.mixin.TaskFieldColumn' class='defined-in docClass'>Gnt.column.mixin.TaskFieldColumn</a><br/><a href='source/TaskFieldColumn.html#Gnt-column-mixin-TaskFieldColumn-property-Reference' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.mixin.TaskFieldColumn-property-Reference' class='name expandable'>Reference</a> : Ext.form.field.Field<span class=\"signature\"></span></div><div class='description'><div class='short'><p>to the field used by the editor</p>\n</div><div class='long'><p>to the field used by the editor</p>\n</div></div></div><div id='property-activeLocaleId' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.mixin.Localizable' rel='Sch.mixin.Localizable' class='defined-in docClass'>Sch.mixin.Localizable</a><br/><a href='source/Localizable.html#Sch-mixin-Localizable-property-activeLocaleId' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.mixin.Localizable-property-activeLocaleId' class='name expandable'>activeLocaleId</a> : String<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>''</code></p></div></div></div><div id='property-defaultEditor' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.EndDate'>Gnt.column.EndDate</span><br/><a href='source/EndDate2.html#Gnt-column-EndDate-property-defaultEditor' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.EndDate-property-defaultEditor' class='name expandable'>defaultEditor</a> : String<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>'enddatefield'</code></p><p>Overrides: <a href=\"#!/api/Gnt.column.mixin.TaskFieldColumn-property-defaultEditor\" rel=\"Gnt.column.mixin.TaskFieldColumn-property-defaultEditor\" class=\"docClass\">Gnt.column.mixin.TaskFieldColumn.defaultEditor</a></p></div></div></div><div id='property-editor' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.EndDate'>Gnt.column.EndDate</span><br/><a href='source/EndDate2.html#Gnt-column-EndDate-property-editor' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.EndDate-property-editor' class='name expandable'>editor</a> : String<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>'enddatefield'</code></p></div></div></div><div id='property-fieldConfigs' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.EndDate'>Gnt.column.EndDate</span><br/><a href='source/EndDate2.html#Gnt-column-EndDate-property-fieldConfigs' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.EndDate-property-fieldConfigs' class='name expandable'>fieldConfigs</a> : Array<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>['instantUpdate', 'adjustMilestones', 'keepDuration', 'validateStartDate', 'fieldProperty']</code></p><p>Overrides: <a href=\"#!/api/Gnt.column.mixin.TaskFieldColumn-property-fieldConfigs\" rel=\"Gnt.column.mixin.TaskFieldColumn-property-fieldConfigs\" class=\"docClass\">Gnt.column.mixin.TaskFieldColumn.fieldConfigs</a></p></div></div></div><div id='property-fieldProperty' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.EndDate'>Gnt.column.EndDate</span><br/><a href='source/EndDate2.html#Gnt-column-EndDate-property-fieldProperty' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.EndDate-property-fieldProperty' class='name expandable'>fieldProperty</a> : String<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>'endDateField'</code></p><p>Overrides: <a href=\"#!/api/Gnt.column.mixin.TaskFieldColumn-property-fieldProperty\" rel=\"Gnt.column.mixin.TaskFieldColumn-property-fieldProperty\" class=\"docClass\">Gnt.column.mixin.TaskFieldColumn.fieldProperty</a></p></div></div></div><div id='property-legacyMode' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.mixin.Localizable' rel='Sch.mixin.Localizable' class='defined-in docClass'>Sch.mixin.Localizable</a><br/><a href='source/Localizable.html#Sch-mixin-Localizable-property-legacyMode' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.mixin.Localizable-property-legacyMode' class='name expandable'>legacyMode</a> : Boolean<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>false</code></p></div></div></div><div id='property-mixinConfig' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Gnt.column.mixin.TaskFieldColumn' rel='Gnt.column.mixin.TaskFieldColumn' class='defined-in docClass'>Gnt.column.mixin.TaskFieldColumn</a><br/><a href='source/TaskFieldColumn.html#Gnt-column-mixin-TaskFieldColumn-property-mixinConfig' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.mixin.TaskFieldColumn-property-mixinConfig' class='name expandable'>mixinConfig</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>{after: {initComponent: 'afterInitComponent', onRender: '_beforeRender'}, afterIf: {applyColumnCls: 'applyColumnCls'}}</code></p></div></div></div><div id='property-useRenderer' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Gnt.column.mixin.TaskFieldColumn' rel='Gnt.column.mixin.TaskFieldColumn' class='defined-in docClass'>Gnt.column.mixin.TaskFieldColumn</a><br/><a href='source/TaskFieldColumn.html#Gnt-column-mixin-TaskFieldColumn-property-useRenderer' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.mixin.TaskFieldColumn-property-useRenderer' class='name expandable'>useRenderer</a> : Boolean<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>true</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-L' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.mixin.Localizable' rel='Sch.mixin.Localizable' class='defined-in docClass'>Sch.mixin.Localizable</a><br/><a href='source/Localizable.html#Sch-mixin-Localizable-method-L' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.mixin.Localizable-method-L' class='name expandable'>L</a>( <span class='pre'>id, [legacyHolderProp], [skipLocalizedCheck]</span> ) : String<span class=\"signature\"></span></div><div class='description'><div class='short'>This is shorthand reference to localize. ...</div><div class='long'><p>This is shorthand reference to <a href=\"#!/api/Sch.mixin.Localizable-method-localize\" rel=\"Sch.mixin.Localizable-method-localize\" class=\"docClass\">localize</a>. Retrieves translation of a phrase.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>id</span> : String<div class='sub-desc'><p>Identifier of phrase.</p>\n</div></li><li><span class='pre'>legacyHolderProp</span> : String (optional)<div class='sub-desc'><p>Legacy class property name containing locales.</p>\n<p>Defaults to: <code>this.legacyHolderProp</code></p></div></li><li><span class='pre'>skipLocalizedCheck</span> : Boolean (optional)<div class='sub-desc'><p>Do not localize class if it's not localized yet.</p>\n<p>Defaults to: <code>false</code></p></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'><p>Translation of specified phrase.</p>\n</div></li></ul></div></div></div><div id='method-_beforeRender' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Gnt.column.mixin.TaskFieldColumn' rel='Gnt.column.mixin.TaskFieldColumn' class='defined-in docClass'>Gnt.column.mixin.TaskFieldColumn</a><br/><a href='source/TaskFieldColumn.html#Gnt-column-mixin-TaskFieldColumn-method-_beforeRender' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.mixin.TaskFieldColumn-method-_beforeRender' class='name expandable'>_beforeRender</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-afterClassMixedIn' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Gnt.column.mixin.TaskFieldColumn' rel='Gnt.column.mixin.TaskFieldColumn' class='defined-in docClass'>Gnt.column.mixin.TaskFieldColumn</a><br/><a href='source/TaskFieldColumn.html#Gnt-column-mixin-TaskFieldColumn-method-afterClassMixedIn' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.mixin.TaskFieldColumn-method-afterClassMixedIn' class='name expandable'>afterClassMixedIn</a>( <span class='pre'>cls</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>cls</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-afterInitComponent' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Gnt.column.mixin.TaskFieldColumn' rel='Gnt.column.mixin.TaskFieldColumn' class='defined-in docClass'>Gnt.column.mixin.TaskFieldColumn</a><br/><a href='source/TaskFieldColumn.html#Gnt-column-mixin-TaskFieldColumn-method-afterInitComponent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.mixin.TaskFieldColumn-method-afterInitComponent' class='name expandable'>afterInitComponent</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-applyColumnCls' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Gnt.column.mixin.TaskFieldColumn' rel='Gnt.column.mixin.TaskFieldColumn' class='defined-in docClass'>Gnt.column.mixin.TaskFieldColumn</a><br/><a href='source/TaskFieldColumn.html#Gnt-column-mixin-TaskFieldColumn-method-applyColumnCls' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.mixin.TaskFieldColumn-method-applyColumnCls' class='name expandable'>applyColumnCls</a>( <span class='pre'>value, meta, task</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>value</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>meta</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>task</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-applyLocale' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.mixin.Localizable' rel='Sch.mixin.Localizable' class='defined-in docClass'>Sch.mixin.Localizable</a><br/><a href='source/Localizable.html#Sch-mixin-Localizable-method-applyLocale' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.mixin.Localizable-method-applyLocale' class='name expandable'>applyLocale</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-getValueToRender' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.EndDate'>Gnt.column.EndDate</span><br/><a href='source/EndDate2.html#Gnt-column-EndDate-method-getValueToRender' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.EndDate-method-getValueToRender' class='name expandable'>getValueToRender</a>( <span class='pre'>value, meta, task</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>value</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>meta</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>task</span> : Object<div class='sub-desc'></div></li></ul><p>Overrides: <a href=\"#!/api/Gnt.column.mixin.TaskFieldColumn-method-getValueToRender\" rel=\"Gnt.column.mixin.TaskFieldColumn-method-getValueToRender\" class=\"docClass\">Gnt.column.mixin.TaskFieldColumn.getValueToRender</a></p></div></div></div><div id='method-initColumnEditor' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Gnt.column.mixin.TaskFieldColumn' rel='Gnt.column.mixin.TaskFieldColumn' class='defined-in docClass'>Gnt.column.mixin.TaskFieldColumn</a><br/><a href='source/TaskFieldColumn.html#Gnt-column-mixin-TaskFieldColumn-method-initColumnEditor' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.mixin.TaskFieldColumn-method-initColumnEditor' class='name expandable'>initColumnEditor</a>( <span class='pre'>editorCfg</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>editorCfg</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-initComponent' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.EndDate'>Gnt.column.EndDate</span><br/><a href='source/EndDate2.html#Gnt-column-EndDate-method-initComponent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.EndDate-method-initComponent' class='name expandable'>initComponent</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-initTaskFieldColumn' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Gnt.column.mixin.TaskFieldColumn' rel='Gnt.column.mixin.TaskFieldColumn' class='defined-in docClass'>Gnt.column.mixin.TaskFieldColumn</a><br/><a href='source/TaskFieldColumn.html#Gnt-column-mixin-TaskFieldColumn-method-initTaskFieldColumn' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.mixin.TaskFieldColumn-method-initTaskFieldColumn' class='name expandable'>initTaskFieldColumn</a>( <span class='pre'>editorCfg</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>editorCfg</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-isLocaleApplied' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.mixin.Localizable' rel='Sch.mixin.Localizable' class='defined-in docClass'>Sch.mixin.Localizable</a><br/><a href='source/Localizable.html#Sch-mixin-Localizable-method-isLocaleApplied' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.mixin.Localizable-method-isLocaleApplied' class='name expandable'>isLocaleApplied</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-localize' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.mixin.Localizable' rel='Sch.mixin.Localizable' class='defined-in docClass'>Sch.mixin.Localizable</a><br/><a href='source/Localizable.html#Sch-mixin-Localizable-method-localize' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.mixin.Localizable-method-localize' class='name expandable'>localize</a>( <span class='pre'>id, [legacyHolderProp], [skipLocalizedCheck]</span> ) : String<span class=\"signature\"></span></div><div class='description'><div class='short'>Retrieves translation of a phrase. ...</div><div class='long'><p>Retrieves translation of a phrase. There is a shorthand <a href=\"#!/api/Sch.mixin.Localizable-method-L\" rel=\"Sch.mixin.Localizable-method-L\" class=\"docClass\">L</a> for this method.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>id</span> : String<div class='sub-desc'><p>Identifier of phrase.</p>\n</div></li><li><span class='pre'>legacyHolderProp</span> : String (optional)<div class='sub-desc'><p>Legacy class property name containing locales.</p>\n<p>Defaults to: <code>this.legacyHolderProp</code></p></div></li><li><span class='pre'>skipLocalizedCheck</span> : Boolean (optional)<div class='sub-desc'><p>Do not localize class if it's not localized yet.</p>\n<p>Defaults to: <code>false</code></p></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'><p>Translation of specified phrase.</p>\n</div></li></ul></div></div></div><div id='method-onColumnAdded' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Gnt.column.mixin.TaskFieldColumn' rel='Gnt.column.mixin.TaskFieldColumn' class='defined-in docClass'>Gnt.column.mixin.TaskFieldColumn</a><br/><a href='source/TaskFieldColumn.html#Gnt-column-mixin-TaskFieldColumn-method-onColumnAdded' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.mixin.TaskFieldColumn-method-onColumnAdded' class='name expandable'>onColumnAdded</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-putRawData' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.EndDate'>Gnt.column.EndDate</span><br/><a href='source/EndDate2.html#Gnt-column-EndDate-method-putRawData' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.EndDate-method-putRawData' class='name expandable'>putRawData</a>( <span class='pre'>data, task</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>data</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>task</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-taskFieldRenderer' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Gnt.column.mixin.TaskFieldColumn' rel='Gnt.column.mixin.TaskFieldColumn' class='defined-in docClass'>Gnt.column.mixin.TaskFieldColumn</a><br/><a href='source/TaskFieldColumn.html#Gnt-column-mixin-TaskFieldColumn-method-taskFieldRenderer' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.mixin.TaskFieldColumn-method-taskFieldRenderer' class='name expandable'>taskFieldRenderer</a>( <span class='pre'>value, meta, task</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>value</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>meta</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>task</span> : Object<div class='sub-desc'></div></li></ul></div></div></div></div></div></div></div>","meta":{}});