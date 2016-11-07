Ext.data.JsonP.Gnt_widget_ConstraintResolutionWindow({"tagname":"class","name":"Gnt.widget.ConstraintResolutionWindow","autodetected":{"aliases":true,"alternateClassNames":true,"mixins":true,"requires":true,"uses":true,"members":true,"code_type":true},"files":[{"filename":"ConstraintResolutionWindow.js","href":"ConstraintResolutionWindow.html#Gnt-widget-ConstraintResolutionWindow"}],"extends":"Ext.window.Window","aliases":{"widget":["constraintresolutionwindow"]},"alternateClassNames":[],"mixins":["Gnt.mixin.Localizable"],"requires":["Gnt.widget.ConstraintResolutionForm"],"uses":[],"members":[{"name":"dateFormat","tagname":"cfg","owner":"Gnt.widget.ConstraintResolutionWindow","id":"cfg-dateFormat","meta":{}},{"name":"l10n","tagname":"cfg","owner":"Gnt.widget.ConstraintResolutionWindow","id":"cfg-l10n","meta":{}},{"name":"resolutionContext","tagname":"cfg","owner":"Gnt.widget.ConstraintResolutionWindow","id":"cfg-resolutionContext","meta":{}},{"name":"activeLocaleId","tagname":"property","owner":"Sch.mixin.Localizable","id":"property-activeLocaleId","meta":{"private":true}},{"name":"bodyBorder","tagname":"property","owner":"Gnt.widget.ConstraintResolutionWindow","id":"property-bodyBorder","meta":{"private":true}},{"name":"border","tagname":"property","owner":"Gnt.widget.ConstraintResolutionWindow","id":"property-border","meta":{"private":true}},{"name":"closable","tagname":"property","owner":"Gnt.widget.ConstraintResolutionWindow","id":"property-closable","meta":{"private":true}},{"name":"collapsible","tagname":"property","owner":"Gnt.widget.ConstraintResolutionWindow","id":"property-collapsible","meta":{"private":true}},{"name":"form","tagname":"property","owner":"Gnt.widget.ConstraintResolutionWindow","id":"property-form","meta":{"private":true}},{"name":"legacyMode","tagname":"property","owner":"Sch.mixin.Localizable","id":"property-legacyMode","meta":{"private":true}},{"name":"modal","tagname":"property","owner":"Gnt.widget.ConstraintResolutionWindow","id":"property-modal","meta":{"private":true}},{"name":"resizable","tagname":"property","owner":"Gnt.widget.ConstraintResolutionWindow","id":"property-resizable","meta":{"private":true}},{"name":"L","tagname":"method","owner":"Sch.mixin.Localizable","id":"method-L","meta":{}},{"name":"applyLocale","tagname":"method","owner":"Sch.mixin.Localizable","id":"method-applyLocale","meta":{"private":true}},{"name":"getDateFormat","tagname":"method","owner":"Gnt.widget.ConstraintResolutionWindow","id":"method-getDateFormat","meta":{}},{"name":"getResolutionContext","tagname":"method","owner":"Gnt.widget.ConstraintResolutionWindow","id":"method-getResolutionContext","meta":{}},{"name":"initComponent","tagname":"method","owner":"Gnt.widget.ConstraintResolutionWindow","id":"method-initComponent","meta":{"private":true}},{"name":"isLocaleApplied","tagname":"method","owner":"Sch.mixin.Localizable","id":"method-isLocaleApplied","meta":{"private":true}},{"name":"localize","tagname":"method","owner":"Sch.mixin.Localizable","id":"method-localize","meta":{}},{"name":"onAfterOptimalLayout","tagname":"method","owner":"Gnt.widget.ConstraintResolutionWindow","id":"method-onAfterOptimalLayout","meta":{"private":true}},{"name":"setDateFormat","tagname":"method","owner":"Gnt.widget.ConstraintResolutionWindow","id":"method-setDateFormat","meta":{}},{"name":"setResolutionContext","tagname":"method","owner":"Gnt.widget.ConstraintResolutionWindow","id":"method-setResolutionContext","meta":{}},{"name":"setupItems","tagname":"method","owner":"Gnt.widget.ConstraintResolutionWindow","id":"method-setupItems","meta":{"private":true}}],"code_type":"ext_define","id":"class-Gnt.widget.ConstraintResolutionWindow","component":false,"superclasses":["Ext.window.Window"],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Ext.window.Window<div class='subclass '><strong>Gnt.widget.ConstraintResolutionWindow</strong></div></div><h4>Mixins</h4><div class='dependency'><a href='#!/api/Gnt.mixin.Localizable' rel='Gnt.mixin.Localizable' class='docClass'>Gnt.mixin.Localizable</a></div><h4>Requires</h4><div class='dependency'><a href='#!/api/Gnt.widget.ConstraintResolutionForm' rel='Gnt.widget.ConstraintResolutionForm' class='docClass'>Gnt.widget.ConstraintResolutionForm</a></div><h4>Files</h4><div class='dependency'><a href='source/ConstraintResolutionWindow.html#Gnt-widget-ConstraintResolutionWindow' target='_blank'>ConstraintResolutionWindow.js</a></div></pre><div class='doc-contents'>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div id='cfg-dateFormat' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.widget.ConstraintResolutionWindow'>Gnt.widget.ConstraintResolutionWindow</span><br/><a href='source/ConstraintResolutionWindow.html#Gnt-widget-ConstraintResolutionWindow-cfg-dateFormat' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.widget.ConstraintResolutionWindow-cfg-dateFormat' class='name expandable'>dateFormat</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'><p>Date format to pass to <a href=\"#!/api/Gnt.widget.ConstraintResolutionForm\" rel=\"Gnt.widget.ConstraintResolutionForm\" class=\"docClass\">Gnt.widget.ConstraintResolutionForm</a></p>\n</div><div class='long'><p>Date format to pass to <a href=\"#!/api/Gnt.widget.ConstraintResolutionForm\" rel=\"Gnt.widget.ConstraintResolutionForm\" class=\"docClass\">Gnt.widget.ConstraintResolutionForm</a></p>\n</div></div></div><div id='cfg-l10n' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.widget.ConstraintResolutionWindow'>Gnt.widget.ConstraintResolutionWindow</span><br/><a href='source/ConstraintResolutionWindow.html#Gnt-widget-ConstraintResolutionWindow-cfg-l10n' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.widget.ConstraintResolutionWindow-cfg-l10n' class='name expandable'>l10n</a> : Object<span class=\"signature\"></span></div><div class='description'><div class='short'>Object containing localication strings\nAn object, purposed for the class localization. ...</div><div class='long'><p>Object containing localication strings\nAn object, purposed for the class localization. Contains the following keys/values:</p>\n\n<pre><code>        - \"Constraint violation\" : \"Constraint violation\"\n</code></pre>\n<p>Overrides: <a href=\"#!/api/Sch.mixin.Localizable-cfg-l10n\" rel=\"Sch.mixin.Localizable-cfg-l10n\" class=\"docClass\">Sch.mixin.Localizable.l10n</a></p></div></div></div><div id='cfg-resolutionContext' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.widget.ConstraintResolutionWindow'>Gnt.widget.ConstraintResolutionWindow</span><br/><a href='source/ConstraintResolutionWindow.html#Gnt-widget-ConstraintResolutionWindow-cfg-resolutionContext' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.widget.ConstraintResolutionWindow-cfg-resolutionContext' class='name expandable'>resolutionContext</a> : Object<span class=\"signature\"></span></div><div class='description'><div class='short'><p>Object containing a set of possible resolutions provided by Gnt.constraint.Base.getResolution().</p>\n</div><div class='long'><p>Object containing a set of possible resolutions provided by Gnt.constraint.Base.getResolution().</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-activeLocaleId' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.mixin.Localizable' rel='Sch.mixin.Localizable' class='defined-in docClass'>Sch.mixin.Localizable</a><br/><a href='source/Localizable.html#Sch-mixin-Localizable-property-activeLocaleId' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.mixin.Localizable-property-activeLocaleId' class='name expandable'>activeLocaleId</a> : String<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>''</code></p></div></div></div><div id='property-bodyBorder' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.widget.ConstraintResolutionWindow'>Gnt.widget.ConstraintResolutionWindow</span><br/><a href='source/ConstraintResolutionWindow.html#Gnt-widget-ConstraintResolutionWindow-property-bodyBorder' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.widget.ConstraintResolutionWindow-property-bodyBorder' class='name expandable'>bodyBorder</a> : Boolean<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>false</code></p></div></div></div><div id='property-border' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.widget.ConstraintResolutionWindow'>Gnt.widget.ConstraintResolutionWindow</span><br/><a href='source/ConstraintResolutionWindow.html#Gnt-widget-ConstraintResolutionWindow-property-border' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.widget.ConstraintResolutionWindow-property-border' class='name expandable'>border</a> : Boolean<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>false</code></p></div></div></div><div id='property-closable' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.widget.ConstraintResolutionWindow'>Gnt.widget.ConstraintResolutionWindow</span><br/><a href='source/ConstraintResolutionWindow.html#Gnt-widget-ConstraintResolutionWindow-property-closable' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.widget.ConstraintResolutionWindow-property-closable' class='name expandable'>closable</a> : Boolean<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>true</code></p></div></div></div><div id='property-collapsible' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.widget.ConstraintResolutionWindow'>Gnt.widget.ConstraintResolutionWindow</span><br/><a href='source/ConstraintResolutionWindow.html#Gnt-widget-ConstraintResolutionWindow-property-collapsible' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.widget.ConstraintResolutionWindow-property-collapsible' class='name expandable'>collapsible</a> : Boolean<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>false</code></p></div></div></div><div id='property-form' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.widget.ConstraintResolutionWindow'>Gnt.widget.ConstraintResolutionWindow</span><br/><a href='source/ConstraintResolutionWindow.html#Gnt-widget-ConstraintResolutionWindow-property-form' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.widget.ConstraintResolutionWindow-property-form' class='name expandable'>form</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div><div id='property-legacyMode' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.mixin.Localizable' rel='Sch.mixin.Localizable' class='defined-in docClass'>Sch.mixin.Localizable</a><br/><a href='source/Localizable.html#Sch-mixin-Localizable-property-legacyMode' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.mixin.Localizable-property-legacyMode' class='name expandable'>legacyMode</a> : Boolean<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>false</code></p></div></div></div><div id='property-modal' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.widget.ConstraintResolutionWindow'>Gnt.widget.ConstraintResolutionWindow</span><br/><a href='source/ConstraintResolutionWindow.html#Gnt-widget-ConstraintResolutionWindow-property-modal' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.widget.ConstraintResolutionWindow-property-modal' class='name expandable'>modal</a> : Boolean<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>true</code></p></div></div></div><div id='property-resizable' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.widget.ConstraintResolutionWindow'>Gnt.widget.ConstraintResolutionWindow</span><br/><a href='source/ConstraintResolutionWindow.html#Gnt-widget-ConstraintResolutionWindow-property-resizable' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.widget.ConstraintResolutionWindow-property-resizable' class='name expandable'>resizable</a> : Boolean<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>true</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-L' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.mixin.Localizable' rel='Sch.mixin.Localizable' class='defined-in docClass'>Sch.mixin.Localizable</a><br/><a href='source/Localizable.html#Sch-mixin-Localizable-method-L' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.mixin.Localizable-method-L' class='name expandable'>L</a>( <span class='pre'>id, [legacyHolderProp], [skipLocalizedCheck]</span> ) : String<span class=\"signature\"></span></div><div class='description'><div class='short'>This is shorthand reference to localize. ...</div><div class='long'><p>This is shorthand reference to <a href=\"#!/api/Sch.mixin.Localizable-method-localize\" rel=\"Sch.mixin.Localizable-method-localize\" class=\"docClass\">localize</a>. Retrieves translation of a phrase.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>id</span> : String<div class='sub-desc'><p>Identifier of phrase.</p>\n</div></li><li><span class='pre'>legacyHolderProp</span> : String (optional)<div class='sub-desc'><p>Legacy class property name containing locales.</p>\n<p>Defaults to: <code>this.legacyHolderProp</code></p></div></li><li><span class='pre'>skipLocalizedCheck</span> : Boolean (optional)<div class='sub-desc'><p>Do not localize class if it's not localized yet.</p>\n<p>Defaults to: <code>false</code></p></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'><p>Translation of specified phrase.</p>\n</div></li></ul></div></div></div><div id='method-applyLocale' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.mixin.Localizable' rel='Sch.mixin.Localizable' class='defined-in docClass'>Sch.mixin.Localizable</a><br/><a href='source/Localizable.html#Sch-mixin-Localizable-method-applyLocale' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.mixin.Localizable-method-applyLocale' class='name expandable'>applyLocale</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-getDateFormat' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.widget.ConstraintResolutionWindow'>Gnt.widget.ConstraintResolutionWindow</span><br/><a href='source/ConstraintResolutionWindow.html#Gnt-widget-ConstraintResolutionWindow-cfg-dateFormat' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.widget.ConstraintResolutionWindow-method-getDateFormat' class='name expandable'>getDateFormat</a>( <span class='pre'></span> ) : String<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns the value of dateFormat. ...</div><div class='long'><p>Returns the value of <a href=\"#!/api/Gnt.widget.ConstraintResolutionWindow-cfg-dateFormat\" rel=\"Gnt.widget.ConstraintResolutionWindow-cfg-dateFormat\" class=\"docClass\">dateFormat</a>.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getResolutionContext' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.widget.ConstraintResolutionWindow'>Gnt.widget.ConstraintResolutionWindow</span><br/><a href='source/ConstraintResolutionWindow.html#Gnt-widget-ConstraintResolutionWindow-cfg-resolutionContext' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.widget.ConstraintResolutionWindow-method-getResolutionContext' class='name expandable'>getResolutionContext</a>( <span class='pre'></span> ) : Object<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns the value of resolutionContext. ...</div><div class='long'><p>Returns the value of <a href=\"#!/api/Gnt.widget.ConstraintResolutionWindow-cfg-resolutionContext\" rel=\"Gnt.widget.ConstraintResolutionWindow-cfg-resolutionContext\" class=\"docClass\">resolutionContext</a>.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-initComponent' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.widget.ConstraintResolutionWindow'>Gnt.widget.ConstraintResolutionWindow</span><br/><a href='source/ConstraintResolutionWindow.html#Gnt-widget-ConstraintResolutionWindow-method-initComponent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.widget.ConstraintResolutionWindow-method-initComponent' class='name expandable'>initComponent</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-isLocaleApplied' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.mixin.Localizable' rel='Sch.mixin.Localizable' class='defined-in docClass'>Sch.mixin.Localizable</a><br/><a href='source/Localizable.html#Sch-mixin-Localizable-method-isLocaleApplied' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.mixin.Localizable-method-isLocaleApplied' class='name expandable'>isLocaleApplied</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-localize' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.mixin.Localizable' rel='Sch.mixin.Localizable' class='defined-in docClass'>Sch.mixin.Localizable</a><br/><a href='source/Localizable.html#Sch-mixin-Localizable-method-localize' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.mixin.Localizable-method-localize' class='name expandable'>localize</a>( <span class='pre'>id, [legacyHolderProp], [skipLocalizedCheck]</span> ) : String<span class=\"signature\"></span></div><div class='description'><div class='short'>Retrieves translation of a phrase. ...</div><div class='long'><p>Retrieves translation of a phrase. There is a shorthand <a href=\"#!/api/Sch.mixin.Localizable-method-L\" rel=\"Sch.mixin.Localizable-method-L\" class=\"docClass\">L</a> for this method.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>id</span> : String<div class='sub-desc'><p>Identifier of phrase.</p>\n</div></li><li><span class='pre'>legacyHolderProp</span> : String (optional)<div class='sub-desc'><p>Legacy class property name containing locales.</p>\n<p>Defaults to: <code>this.legacyHolderProp</code></p></div></li><li><span class='pre'>skipLocalizedCheck</span> : Boolean (optional)<div class='sub-desc'><p>Do not localize class if it's not localized yet.</p>\n<p>Defaults to: <code>false</code></p></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'><p>Translation of specified phrase.</p>\n</div></li></ul></div></div></div><div id='method-onAfterOptimalLayout' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.widget.ConstraintResolutionWindow'>Gnt.widget.ConstraintResolutionWindow</span><br/><a href='source/ConstraintResolutionWindow.html#Gnt-widget-ConstraintResolutionWindow-method-onAfterOptimalLayout' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.widget.ConstraintResolutionWindow-method-onAfterOptimalLayout' class='name expandable'>onAfterOptimalLayout</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-setDateFormat' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.widget.ConstraintResolutionWindow'>Gnt.widget.ConstraintResolutionWindow</span><br/><a href='source/ConstraintResolutionWindow.html#Gnt-widget-ConstraintResolutionWindow-cfg-dateFormat' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.widget.ConstraintResolutionWindow-method-setDateFormat' class='name expandable'>setDateFormat</a>( <span class='pre'>dateFormat</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Sets the value of dateFormat. ...</div><div class='long'><p>Sets the value of <a href=\"#!/api/Gnt.widget.ConstraintResolutionWindow-cfg-dateFormat\" rel=\"Gnt.widget.ConstraintResolutionWindow-cfg-dateFormat\" class=\"docClass\">dateFormat</a>.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>dateFormat</span> : String<div class='sub-desc'><p>The new value.</p>\n</div></li></ul></div></div></div><div id='method-setResolutionContext' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.widget.ConstraintResolutionWindow'>Gnt.widget.ConstraintResolutionWindow</span><br/><a href='source/ConstraintResolutionWindow.html#Gnt-widget-ConstraintResolutionWindow-cfg-resolutionContext' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.widget.ConstraintResolutionWindow-method-setResolutionContext' class='name expandable'>setResolutionContext</a>( <span class='pre'>resolutionContext</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Sets the value of resolutionContext. ...</div><div class='long'><p>Sets the value of <a href=\"#!/api/Gnt.widget.ConstraintResolutionWindow-cfg-resolutionContext\" rel=\"Gnt.widget.ConstraintResolutionWindow-cfg-resolutionContext\" class=\"docClass\">resolutionContext</a>.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>resolutionContext</span> : Object<div class='sub-desc'><p>The new value.</p>\n</div></li></ul></div></div></div><div id='method-setupItems' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.widget.ConstraintResolutionWindow'>Gnt.widget.ConstraintResolutionWindow</span><br/><a href='source/ConstraintResolutionWindow.html#Gnt-widget-ConstraintResolutionWindow-method-setupItems' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.widget.ConstraintResolutionWindow-method-setupItems' class='name expandable'>setupItems</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div></div></div></div></div>","meta":{}});