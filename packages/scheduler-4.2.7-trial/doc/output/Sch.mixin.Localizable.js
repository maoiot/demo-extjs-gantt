Ext.data.JsonP.Sch_mixin_Localizable({"tagname":"class","name":"Sch.mixin.Localizable","autodetected":{"aliases":true,"alternateClassNames":true,"extends":true,"mixins":true,"requires":true,"uses":true,"members":true,"code_type":true},"files":[{"filename":"Localizable.js","href":"Localizable.html#Sch-mixin-Localizable"}],"aliases":{},"alternateClassNames":[],"extends":"Ext.Base","mixins":[],"requires":["Sch.locale.En"],"uses":[],"members":[{"name":"l10n","tagname":"cfg","owner":"Sch.mixin.Localizable","id":"cfg-l10n","meta":{}},{"name":"activeLocaleId","tagname":"property","owner":"Sch.mixin.Localizable","id":"property-activeLocaleId","meta":{"private":true}},{"name":"legacyMode","tagname":"property","owner":"Sch.mixin.Localizable","id":"property-legacyMode","meta":{"private":true}},{"name":"L","tagname":"method","owner":"Sch.mixin.Localizable","id":"method-L","meta":{}},{"name":"applyLocale","tagname":"method","owner":"Sch.mixin.Localizable","id":"method-applyLocale","meta":{"private":true}},{"name":"isLocaleApplied","tagname":"method","owner":"Sch.mixin.Localizable","id":"method-isLocaleApplied","meta":{"private":true}},{"name":"localize","tagname":"method","owner":"Sch.mixin.Localizable","id":"method-localize","meta":{}}],"code_type":"ext_define","id":"class-Sch.mixin.Localizable","short_doc":"A mixin providing localization functionality to the consuming class. ...","component":false,"superclasses":["Ext.Base"],"subclasses":[],"mixedInto":["Sch.mixin.SchedulerView","Sch.plugin.CurrentTimeLine","Sch.plugin.EventEditor","Sch.plugin.Export","Sch.plugin.SimpleEditor","Sch.plugin.exporter.AbstractExporter","Sch.preset.Manager","Sch.util.Date","Sch.widget.ExportDialog","Sch.widget.ExportDialogForm"],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Ext.Base<div class='subclass '><strong>Sch.mixin.Localizable</strong></div></div><h4>Requires</h4><div class='dependency'><a href='#!/api/Sch.locale.En' rel='Sch.locale.En' class='docClass'>Sch.locale.En</a></div><h4>Mixed into</h4><div class='dependency'><a href='#!/api/Sch.mixin.SchedulerView' rel='Sch.mixin.SchedulerView' class='docClass'>Sch.mixin.SchedulerView</a></div><div class='dependency'><a href='#!/api/Sch.plugin.CurrentTimeLine' rel='Sch.plugin.CurrentTimeLine' class='docClass'>Sch.plugin.CurrentTimeLine</a></div><div class='dependency'><a href='#!/api/Sch.plugin.EventEditor' rel='Sch.plugin.EventEditor' class='docClass'>Sch.plugin.EventEditor</a></div><div class='dependency'><a href='#!/api/Sch.plugin.Export' rel='Sch.plugin.Export' class='docClass'>Sch.plugin.Export</a></div><div class='dependency'><a href='#!/api/Sch.plugin.SimpleEditor' rel='Sch.plugin.SimpleEditor' class='docClass'>Sch.plugin.SimpleEditor</a></div><div class='dependency'><a href='#!/api/Sch.plugin.exporter.AbstractExporter' rel='Sch.plugin.exporter.AbstractExporter' class='docClass'>Sch.plugin.exporter.AbstractExporter</a></div><div class='dependency'><a href='#!/api/Sch.preset.Manager' rel='Sch.preset.Manager' class='docClass'>Sch.preset.Manager</a></div><div class='dependency'><a href='#!/api/Sch.util.Date' rel='Sch.util.Date' class='docClass'>Sch.util.Date</a></div><div class='dependency'><a href='#!/api/Sch.widget.ExportDialog' rel='Sch.widget.ExportDialog' class='docClass'>Sch.widget.ExportDialog</a></div><div class='dependency'><a href='#!/api/Sch.widget.ExportDialogForm' rel='Sch.widget.ExportDialogForm' class='docClass'>Sch.widget.ExportDialogForm</a></div><h4>Files</h4><div class='dependency'><a href='source/Localizable.html#Sch-mixin-Localizable' target='_blank'>Localizable.js</a></div></pre><div class='doc-contents'><p>A mixin providing localization functionality to the consuming class.</p>\n\n<pre><code>Ext.define('My.Toolbar', {\n    extend      : 'Ext.Toolbar',\n    mixins      : [ '<a href=\"#!/api/Sch.mixin.Localizable\" rel=\"Sch.mixin.Localizable\" class=\"docClass\">Sch.mixin.Localizable</a>' ],\n\n    initComponent   : function () {\n        Ext.apply(this, {\n            items   : [\n                {\n                    xtype       : 'button',\n\n                    // get the button label from the current locale\n                    text        : this.L('loginText')\n                }\n            ]\n        });\n\n        this.callParent(arguments);\n    }\n});\n</code></pre>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div id='cfg-l10n' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.mixin.Localizable'>Sch.mixin.Localizable</span><br/><a href='source/Localizable.html#Sch-mixin-Localizable-cfg-l10n' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.mixin.Localizable-cfg-l10n' class='name expandable'>l10n</a> : Object<span class=\"signature\"></span></div><div class='description'><div class='short'><p>Container of locales for the class.</p>\n</div><div class='long'><p>Container of locales for the class.</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-activeLocaleId' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.mixin.Localizable'>Sch.mixin.Localizable</span><br/><a href='source/Localizable.html#Sch-mixin-Localizable-property-activeLocaleId' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.mixin.Localizable-property-activeLocaleId' class='name expandable'>activeLocaleId</a> : String<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>''</code></p></div></div></div><div id='property-legacyMode' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.mixin.Localizable'>Sch.mixin.Localizable</span><br/><a href='source/Localizable.html#Sch-mixin-Localizable-property-legacyMode' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.mixin.Localizable-property-legacyMode' class='name expandable'>legacyMode</a> : Boolean<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>false</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-L' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.mixin.Localizable'>Sch.mixin.Localizable</span><br/><a href='source/Localizable.html#Sch-mixin-Localizable-method-L' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.mixin.Localizable-method-L' class='name expandable'>L</a>( <span class='pre'>id, [legacyHolderProp], [skipLocalizedCheck]</span> ) : String<span class=\"signature\"></span></div><div class='description'><div class='short'>This is shorthand reference to localize. ...</div><div class='long'><p>This is shorthand reference to <a href=\"#!/api/Sch.mixin.Localizable-method-localize\" rel=\"Sch.mixin.Localizable-method-localize\" class=\"docClass\">localize</a>. Retrieves translation of a phrase.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>id</span> : String<div class='sub-desc'><p>Identifier of phrase.</p>\n</div></li><li><span class='pre'>legacyHolderProp</span> : String (optional)<div class='sub-desc'><p>Legacy class property name containing locales.</p>\n<p>Defaults to: <code>this.legacyHolderProp</code></p></div></li><li><span class='pre'>skipLocalizedCheck</span> : Boolean (optional)<div class='sub-desc'><p>Do not localize class if it's not localized yet.</p>\n<p>Defaults to: <code>false</code></p></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'><p>Translation of specified phrase.</p>\n</div></li></ul></div></div></div><div id='method-applyLocale' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.mixin.Localizable'>Sch.mixin.Localizable</span><br/><a href='source/Localizable.html#Sch-mixin-Localizable-method-applyLocale' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.mixin.Localizable-method-applyLocale' class='name expandable'>applyLocale</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-isLocaleApplied' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.mixin.Localizable'>Sch.mixin.Localizable</span><br/><a href='source/Localizable.html#Sch-mixin-Localizable-method-isLocaleApplied' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.mixin.Localizable-method-isLocaleApplied' class='name expandable'>isLocaleApplied</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-localize' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.mixin.Localizable'>Sch.mixin.Localizable</span><br/><a href='source/Localizable.html#Sch-mixin-Localizable-method-localize' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.mixin.Localizable-method-localize' class='name expandable'>localize</a>( <span class='pre'>id, [legacyHolderProp], [skipLocalizedCheck]</span> ) : String<span class=\"signature\"></span></div><div class='description'><div class='short'>Retrieves translation of a phrase. ...</div><div class='long'><p>Retrieves translation of a phrase. There is a shorthand <a href=\"#!/api/Sch.mixin.Localizable-method-L\" rel=\"Sch.mixin.Localizable-method-L\" class=\"docClass\">L</a> for this method.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>id</span> : String<div class='sub-desc'><p>Identifier of phrase.</p>\n</div></li><li><span class='pre'>legacyHolderProp</span> : String (optional)<div class='sub-desc'><p>Legacy class property name containing locales.</p>\n<p>Defaults to: <code>this.legacyHolderProp</code></p></div></li><li><span class='pre'>skipLocalizedCheck</span> : Boolean (optional)<div class='sub-desc'><p>Do not localize class if it's not localized yet.</p>\n<p>Defaults to: <code>false</code></p></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'><p>Translation of specified phrase.</p>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});