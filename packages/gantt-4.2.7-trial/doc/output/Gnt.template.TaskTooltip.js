Ext.data.JsonP.Gnt_template_TaskTooltip({"tagname":"class","name":"Gnt.template.TaskTooltip","autodetected":{"aliases":true,"alternateClassNames":true,"mixins":true,"requires":true,"uses":true,"members":true,"code_type":true},"files":[{"filename":"TaskTooltip.js","href":"TaskTooltip.html#Gnt-template-TaskTooltip"}],"extends":"Ext.XTemplate","aliases":{},"alternateClassNames":[],"mixins":["Gnt.mixin.Localizable"],"requires":[],"uses":[],"members":[{"name":"l10n","tagname":"cfg","owner":"Sch.mixin.Localizable","id":"cfg-l10n","meta":{}},{"name":"markup","tagname":"cfg","owner":"Gnt.template.TaskTooltip","id":"cfg-markup","meta":{}},{"name":"activeLocaleId","tagname":"property","owner":"Sch.mixin.Localizable","id":"property-activeLocaleId","meta":{"private":true}},{"name":"dateFormat","tagname":"property","owner":"Gnt.template.TaskTooltip","id":"property-dateFormat","meta":{"private":true}},{"name":"disableFormats","tagname":"property","owner":"Gnt.template.TaskTooltip","id":"property-disableFormats","meta":{"private":true}},{"name":"legacyMode","tagname":"property","owner":"Sch.mixin.Localizable","id":"property-legacyMode","meta":{"private":true}},{"name":"constructor","tagname":"method","owner":"Gnt.template.TaskTooltip","id":"method-constructor","meta":{}},{"name":"L","tagname":"method","owner":"Sch.mixin.Localizable","id":"method-L","meta":{}},{"name":"applyLocale","tagname":"method","owner":"Sch.mixin.Localizable","id":"method-applyLocale","meta":{"private":true}},{"name":"getEndDateString","tagname":"method","owner":"Gnt.template.TaskTooltip","id":"method-getEndDateString","meta":{"private":true}},{"name":"getPercentDoneString","tagname":"method","owner":"Gnt.template.TaskTooltip","id":"method-getPercentDoneString","meta":{"private":true}},{"name":"getStartDateString","tagname":"method","owner":"Gnt.template.TaskTooltip","id":"method-getStartDateString","meta":{"private":true}},{"name":"isLocaleApplied","tagname":"method","owner":"Sch.mixin.Localizable","id":"method-isLocaleApplied","meta":{"private":true}},{"name":"localize","tagname":"method","owner":"Sch.mixin.Localizable","id":"method-localize","meta":{}}],"code_type":"ext_define","id":"class-Gnt.template.TaskTooltip","component":false,"superclasses":["Ext.XTemplate"],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Ext.XTemplate<div class='subclass '><strong>Gnt.template.TaskTooltip</strong></div></div><h4>Mixins</h4><div class='dependency'><a href='#!/api/Gnt.mixin.Localizable' rel='Gnt.mixin.Localizable' class='docClass'>Gnt.mixin.Localizable</a></div><h4>Files</h4><div class='dependency'><a href='source/TaskTooltip.html#Gnt-template-TaskTooltip' target='_blank'>TaskTooltip.js</a></div></pre><div class='doc-contents'><p>Template class for rendering the task tooltip.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div id='cfg-l10n' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.mixin.Localizable' rel='Sch.mixin.Localizable' class='defined-in docClass'>Sch.mixin.Localizable</a><br/><a href='source/Localizable.html#Sch-mixin-Localizable-cfg-l10n' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.mixin.Localizable-cfg-l10n' class='name expandable'>l10n</a> : Object<span class=\"signature\"></span></div><div class='description'><div class='short'><p>Container of locales for the class.</p>\n</div><div class='long'><p>Container of locales for the class.</p>\n<p>Overrides: <a href=\"#!/api/Sch.mixin.TimelinePanel-cfg-l10n\" rel=\"Sch.mixin.TimelinePanel-cfg-l10n\" class=\"docClass\">Sch.mixin.TimelinePanel.l10n</a>, <a href=\"#!/api/Gnt.field.Duration-cfg-l10n\" rel=\"Gnt.field.Duration-cfg-l10n\" class=\"docClass\">Gnt.field.Duration.l10n</a>, <a href=\"#!/api/Gnt.widget.taskeditor.TaskForm-cfg-l10n\" rel=\"Gnt.widget.taskeditor.TaskForm-cfg-l10n\" class=\"docClass\">Gnt.widget.taskeditor.TaskForm.l10n</a></p></div></div></div><div id='cfg-markup' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.template.TaskTooltip'>Gnt.template.TaskTooltip</span><br/><a href='source/TaskTooltip.html#Gnt-template-TaskTooltip-cfg-markup' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.template.TaskTooltip-cfg-markup' class='name expandable'>markup</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'>The tpl markup that will be passed to the XTemplate. ...</div><div class='long'><p>The tpl markup that will be passed to the XTemplate. Default <code>_startText_</code>, <code>_endText_</code>, <code>_percentText</code> and <code>_format_</code> will be localised in the constructor.</p>\n<p>Defaults to: <code>'&lt;h2 class=&quot;sch-task-tip-header&quot;&gt;{Name}&lt;/h2&gt;' + '&lt;table class=&quot;sch-task-tip&quot;&gt;' + '&lt;tr&gt;&lt;td&gt;_startText_:&lt;/td&gt; &lt;td align=&quot;right&quot;&gt;{[this.getStartDateString(values)]}&lt;/td&gt;&lt;/tr&gt;' + '&lt;tr&gt;&lt;td&gt;_endText_:&lt;/td&gt; &lt;td align=&quot;right&quot;&gt;{[this.getEndDateString(values)]}&lt;/td&gt;&lt;/tr&gt;' + '&lt;tr&gt;&lt;td&gt;_percentText_:&lt;/td&gt;&lt;td align=&quot;right&quot;&gt;{[this.getPercentDoneString(values)]}%&lt;/td&gt;&lt;/tr&gt;' + '&lt;/table&gt;'</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-activeLocaleId' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.mixin.Localizable' rel='Sch.mixin.Localizable' class='defined-in docClass'>Sch.mixin.Localizable</a><br/><a href='source/Localizable.html#Sch-mixin-Localizable-property-activeLocaleId' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.mixin.Localizable-property-activeLocaleId' class='name expandable'>activeLocaleId</a> : String<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>''</code></p></div></div></div><div id='property-dateFormat' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.template.TaskTooltip'>Gnt.template.TaskTooltip</span><br/><a href='source/TaskTooltip.html#Gnt-template-TaskTooltip-property-dateFormat' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.template.TaskTooltip-property-dateFormat' class='name expandable'>dateFormat</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div><div id='property-disableFormats' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.template.TaskTooltip'>Gnt.template.TaskTooltip</span><br/><a href='source/TaskTooltip.html#Gnt-template-TaskTooltip-property-disableFormats' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.template.TaskTooltip-property-disableFormats' class='name expandable'>disableFormats</a> : Boolean<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>true</code></p></div></div></div><div id='property-legacyMode' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.mixin.Localizable' rel='Sch.mixin.Localizable' class='defined-in docClass'>Sch.mixin.Localizable</a><br/><a href='source/Localizable.html#Sch-mixin-Localizable-property-legacyMode' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.mixin.Localizable-property-legacyMode' class='name expandable'>legacyMode</a> : Boolean<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>false</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.template.TaskTooltip'>Gnt.template.TaskTooltip</span><br/><a href='source/TaskTooltip.html#Gnt-template-TaskTooltip-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/Gnt.template.TaskTooltip-method-constructor' class='name expandable'>Gnt.template.TaskTooltip</a>( <span class='pre'>markup</span> ) : <a href=\"#!/api/Gnt.template.TaskTooltip\" rel=\"Gnt.template.TaskTooltip\" class=\"docClass\">Gnt.template.TaskTooltip</a><span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>markup</span> : Object<div class='sub-desc'></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Gnt.template.TaskTooltip\" rel=\"Gnt.template.TaskTooltip\" class=\"docClass\">Gnt.template.TaskTooltip</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-L' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.mixin.Localizable' rel='Sch.mixin.Localizable' class='defined-in docClass'>Sch.mixin.Localizable</a><br/><a href='source/Localizable.html#Sch-mixin-Localizable-method-L' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.mixin.Localizable-method-L' class='name expandable'>L</a>( <span class='pre'>id, [legacyHolderProp], [skipLocalizedCheck]</span> ) : String<span class=\"signature\"></span></div><div class='description'><div class='short'>This is shorthand reference to localize. ...</div><div class='long'><p>This is shorthand reference to <a href=\"#!/api/Sch.mixin.Localizable-method-localize\" rel=\"Sch.mixin.Localizable-method-localize\" class=\"docClass\">localize</a>. Retrieves translation of a phrase.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>id</span> : String<div class='sub-desc'><p>Identifier of phrase.</p>\n</div></li><li><span class='pre'>legacyHolderProp</span> : String (optional)<div class='sub-desc'><p>Legacy class property name containing locales.</p>\n<p>Defaults to: <code>this.legacyHolderProp</code></p></div></li><li><span class='pre'>skipLocalizedCheck</span> : Boolean (optional)<div class='sub-desc'><p>Do not localize class if it's not localized yet.</p>\n<p>Defaults to: <code>false</code></p></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'><p>Translation of specified phrase.</p>\n</div></li></ul></div></div></div><div id='method-applyLocale' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.mixin.Localizable' rel='Sch.mixin.Localizable' class='defined-in docClass'>Sch.mixin.Localizable</a><br/><a href='source/Localizable.html#Sch-mixin-Localizable-method-applyLocale' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.mixin.Localizable-method-applyLocale' class='name expandable'>applyLocale</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-getEndDateString' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.template.TaskTooltip'>Gnt.template.TaskTooltip</span><br/><a href='source/TaskTooltip.html#Gnt-template-TaskTooltip-method-getEndDateString' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.template.TaskTooltip-method-getEndDateString' class='name expandable'>getEndDateString</a>( <span class='pre'>data</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>data</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-getPercentDoneString' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.template.TaskTooltip'>Gnt.template.TaskTooltip</span><br/><a href='source/TaskTooltip.html#Gnt-template-TaskTooltip-method-getPercentDoneString' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.template.TaskTooltip-method-getPercentDoneString' class='name expandable'>getPercentDoneString</a>( <span class='pre'>data</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>data</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-getStartDateString' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.template.TaskTooltip'>Gnt.template.TaskTooltip</span><br/><a href='source/TaskTooltip.html#Gnt-template-TaskTooltip-method-getStartDateString' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.template.TaskTooltip-method-getStartDateString' class='name expandable'>getStartDateString</a>( <span class='pre'>data</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>data</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-isLocaleApplied' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.mixin.Localizable' rel='Sch.mixin.Localizable' class='defined-in docClass'>Sch.mixin.Localizable</a><br/><a href='source/Localizable.html#Sch-mixin-Localizable-method-isLocaleApplied' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.mixin.Localizable-method-isLocaleApplied' class='name expandable'>isLocaleApplied</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-localize' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.mixin.Localizable' rel='Sch.mixin.Localizable' class='defined-in docClass'>Sch.mixin.Localizable</a><br/><a href='source/Localizable.html#Sch-mixin-Localizable-method-localize' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.mixin.Localizable-method-localize' class='name expandable'>localize</a>( <span class='pre'>id, [legacyHolderProp], [skipLocalizedCheck]</span> ) : String<span class=\"signature\"></span></div><div class='description'><div class='short'>Retrieves translation of a phrase. ...</div><div class='long'><p>Retrieves translation of a phrase. There is a shorthand <a href=\"#!/api/Sch.mixin.Localizable-method-L\" rel=\"Sch.mixin.Localizable-method-L\" class=\"docClass\">L</a> for this method.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>id</span> : String<div class='sub-desc'><p>Identifier of phrase.</p>\n</div></li><li><span class='pre'>legacyHolderProp</span> : String (optional)<div class='sub-desc'><p>Legacy class property name containing locales.</p>\n<p>Defaults to: <code>this.legacyHolderProp</code></p></div></li><li><span class='pre'>skipLocalizedCheck</span> : Boolean (optional)<div class='sub-desc'><p>Do not localize class if it's not localized yet.</p>\n<p>Defaults to: <code>false</code></p></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'><p>Translation of specified phrase.</p>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});