Ext.data.JsonP.Gnt_plugin_ConstraintResolutionGui({"tagname":"class","name":"Gnt.plugin.ConstraintResolutionGui","autodetected":{"aliases":true,"alternateClassNames":true,"mixins":true,"requires":true,"uses":true,"members":true,"code_type":true},"files":[{"filename":"ConstraintResolutionGui.js","href":"ConstraintResolutionGui.html#Gnt-plugin-ConstraintResolutionGui"}],"extends":"Ext.AbstractPlugin","aliases":{"plugin":["constraintresolutiongui"]},"alternateClassNames":[],"mixins":[],"requires":["Gnt.widget.ConstraintResolutionWindow"],"uses":[],"members":[{"name":"dateFormat","tagname":"cfg","owner":"Gnt.plugin.ConstraintResolutionGui","id":"cfg-dateFormat","meta":{}},{"name":"cmpDetacher","tagname":"property","owner":"Gnt.plugin.ConstraintResolutionGui","id":"property-cmpDetacher","meta":{"private":true}},{"name":"storeDetacher","tagname":"property","owner":"Gnt.plugin.ConstraintResolutionGui","id":"property-storeDetacher","meta":{"private":true}},{"name":"storedResolutions","tagname":"property","owner":"Gnt.plugin.ConstraintResolutionGui","id":"property-storedResolutions","meta":{"private":true}},{"name":"attachToTaskStore","tagname":"method","owner":"Gnt.plugin.ConstraintResolutionGui","id":"method-attachToTaskStore","meta":{"private":true}},{"name":"detachFromTaskStore","tagname":"method","owner":"Gnt.plugin.ConstraintResolutionGui","id":"method-detachFromTaskStore","meta":{"private":true}},{"name":"disable","tagname":"method","owner":"Gnt.plugin.ConstraintResolutionGui","id":"method-disable","meta":{"private":true}},{"name":"enable","tagname":"method","owner":"Gnt.plugin.ConstraintResolutionGui","id":"method-enable","meta":{"private":true}},{"name":"getDateFormat","tagname":"method","owner":"Gnt.plugin.ConstraintResolutionGui","id":"method-getDateFormat","meta":{}},{"name":"getStoredResolutionForContext","tagname":"method","owner":"Gnt.plugin.ConstraintResolutionGui","id":"method-getStoredResolutionForContext","meta":{"private":true}},{"name":"getStoredResolutionKeyForContext","tagname":"method","owner":"Gnt.plugin.ConstraintResolutionGui","id":"method-getStoredResolutionKeyForContext","meta":{"private":true}},{"name":"getStoredResolutions","tagname":"method","owner":"Gnt.plugin.ConstraintResolutionGui","id":"method-getStoredResolutions","meta":{"private":true}},{"name":"hasStoredResolutionForContext","tagname":"method","owner":"Gnt.plugin.ConstraintResolutionGui","id":"method-hasStoredResolutionForContext","meta":{"private":true}},{"name":"init","tagname":"method","owner":"Gnt.plugin.ConstraintResolutionGui","id":"method-init","meta":{"private":true}},{"name":"onConstraintConflict","tagname":"method","owner":"Gnt.plugin.ConstraintResolutionGui","id":"method-onConstraintConflict","meta":{"private":true}},{"name":"onUserActionCancel","tagname":"method","owner":"Gnt.plugin.ConstraintResolutionGui","id":"method-onUserActionCancel","meta":{"private":true}},{"name":"onUserActionClose","tagname":"method","owner":"Gnt.plugin.ConstraintResolutionGui","id":"method-onUserActionClose","meta":{"private":true}},{"name":"onUserActionOk","tagname":"method","owner":"Gnt.plugin.ConstraintResolutionGui","id":"method-onUserActionOk","meta":{"private":true}},{"name":"resolveSilently","tagname":"method","owner":"Gnt.plugin.ConstraintResolutionGui","id":"method-resolveSilently","meta":{"private":true}},{"name":"setDateFormat","tagname":"method","owner":"Gnt.plugin.ConstraintResolutionGui","id":"method-setDateFormat","meta":{}},{"name":"storeResolutionForContext","tagname":"method","owner":"Gnt.plugin.ConstraintResolutionGui","id":"method-storeResolutionForContext","meta":{"private":true}}],"code_type":"ext_define","id":"class-Gnt.plugin.ConstraintResolutionGui","component":false,"superclasses":["Ext.AbstractPlugin"],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Ext.AbstractPlugin<div class='subclass '><strong>Gnt.plugin.ConstraintResolutionGui</strong></div></div><h4>Requires</h4><div class='dependency'><a href='#!/api/Gnt.widget.ConstraintResolutionWindow' rel='Gnt.widget.ConstraintResolutionWindow' class='docClass'>Gnt.widget.ConstraintResolutionWindow</a></div><h4>Files</h4><div class='dependency'><a href='source/ConstraintResolutionGui.html#Gnt-plugin-ConstraintResolutionGui' target='_blank'>ConstraintResolutionGui.js</a></div></pre><div class='doc-contents'>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div id='cfg-dateFormat' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.plugin.ConstraintResolutionGui'>Gnt.plugin.ConstraintResolutionGui</span><br/><a href='source/ConstraintResolutionGui.html#Gnt-plugin-ConstraintResolutionGui-cfg-dateFormat' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.plugin.ConstraintResolutionGui-cfg-dateFormat' class='name expandable'>dateFormat</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'><p>Date format to pass to <a href=\"#!/api/Gnt.widget.ConstraintResolutionWindow\" rel=\"Gnt.widget.ConstraintResolutionWindow\" class=\"docClass\">Gnt.widget.ConstraintResolutionWindow</a></p>\n</div><div class='long'><p>Date format to pass to <a href=\"#!/api/Gnt.widget.ConstraintResolutionWindow\" rel=\"Gnt.widget.ConstraintResolutionWindow\" class=\"docClass\">Gnt.widget.ConstraintResolutionWindow</a></p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-cmpDetacher' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.plugin.ConstraintResolutionGui'>Gnt.plugin.ConstraintResolutionGui</span><br/><a href='source/ConstraintResolutionGui.html#Gnt-plugin-ConstraintResolutionGui-property-cmpDetacher' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.plugin.ConstraintResolutionGui-property-cmpDetacher' class='name expandable'>cmpDetacher</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div><div id='property-storeDetacher' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.plugin.ConstraintResolutionGui'>Gnt.plugin.ConstraintResolutionGui</span><br/><a href='source/ConstraintResolutionGui.html#Gnt-plugin-ConstraintResolutionGui-property-storeDetacher' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.plugin.ConstraintResolutionGui-property-storeDetacher' class='name expandable'>storeDetacher</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div><div id='property-storedResolutions' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.plugin.ConstraintResolutionGui'>Gnt.plugin.ConstraintResolutionGui</span><br/><a href='source/ConstraintResolutionGui.html#Gnt-plugin-ConstraintResolutionGui-property-storedResolutions' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.plugin.ConstraintResolutionGui-property-storedResolutions' class='name expandable'>storedResolutions</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-attachToTaskStore' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.plugin.ConstraintResolutionGui'>Gnt.plugin.ConstraintResolutionGui</span><br/><a href='source/ConstraintResolutionGui.html#Gnt-plugin-ConstraintResolutionGui-method-attachToTaskStore' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.plugin.ConstraintResolutionGui-method-attachToTaskStore' class='name expandable'>attachToTaskStore</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-detachFromTaskStore' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.plugin.ConstraintResolutionGui'>Gnt.plugin.ConstraintResolutionGui</span><br/><a href='source/ConstraintResolutionGui.html#Gnt-plugin-ConstraintResolutionGui-method-detachFromTaskStore' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.plugin.ConstraintResolutionGui-method-detachFromTaskStore' class='name expandable'>detachFromTaskStore</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-disable' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.plugin.ConstraintResolutionGui'>Gnt.plugin.ConstraintResolutionGui</span><br/><a href='source/ConstraintResolutionGui.html#Gnt-plugin-ConstraintResolutionGui-method-disable' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.plugin.ConstraintResolutionGui-method-disable' class='name expandable'>disable</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-enable' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.plugin.ConstraintResolutionGui'>Gnt.plugin.ConstraintResolutionGui</span><br/><a href='source/ConstraintResolutionGui.html#Gnt-plugin-ConstraintResolutionGui-method-enable' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.plugin.ConstraintResolutionGui-method-enable' class='name expandable'>enable</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-getDateFormat' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.plugin.ConstraintResolutionGui'>Gnt.plugin.ConstraintResolutionGui</span><br/><a href='source/ConstraintResolutionGui.html#Gnt-plugin-ConstraintResolutionGui-cfg-dateFormat' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.plugin.ConstraintResolutionGui-method-getDateFormat' class='name expandable'>getDateFormat</a>( <span class='pre'></span> ) : String<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns the value of dateFormat. ...</div><div class='long'><p>Returns the value of <a href=\"#!/api/Gnt.plugin.ConstraintResolutionGui-cfg-dateFormat\" rel=\"Gnt.plugin.ConstraintResolutionGui-cfg-dateFormat\" class=\"docClass\">dateFormat</a>.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getStoredResolutionForContext' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.plugin.ConstraintResolutionGui'>Gnt.plugin.ConstraintResolutionGui</span><br/><a href='source/ConstraintResolutionGui.html#Gnt-plugin-ConstraintResolutionGui-method-getStoredResolutionForContext' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.plugin.ConstraintResolutionGui-method-getStoredResolutionForContext' class='name expandable'>getStoredResolutionForContext</a>( <span class='pre'>resolutionContext</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>resolutionContext</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-getStoredResolutionKeyForContext' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.plugin.ConstraintResolutionGui'>Gnt.plugin.ConstraintResolutionGui</span><br/><a href='source/ConstraintResolutionGui.html#Gnt-plugin-ConstraintResolutionGui-method-getStoredResolutionKeyForContext' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.plugin.ConstraintResolutionGui-method-getStoredResolutionKeyForContext' class='name expandable'>getStoredResolutionKeyForContext</a>( <span class='pre'>resolutionContext</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>resolutionContext</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-getStoredResolutions' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.plugin.ConstraintResolutionGui'>Gnt.plugin.ConstraintResolutionGui</span><br/><a href='source/ConstraintResolutionGui.html#Gnt-plugin-ConstraintResolutionGui-method-getStoredResolutions' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.plugin.ConstraintResolutionGui-method-getStoredResolutions' class='name expandable'>getStoredResolutions</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-hasStoredResolutionForContext' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.plugin.ConstraintResolutionGui'>Gnt.plugin.ConstraintResolutionGui</span><br/><a href='source/ConstraintResolutionGui.html#Gnt-plugin-ConstraintResolutionGui-method-hasStoredResolutionForContext' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.plugin.ConstraintResolutionGui-method-hasStoredResolutionForContext' class='name expandable'>hasStoredResolutionForContext</a>( <span class='pre'>resolutionContext</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>resolutionContext</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-init' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.plugin.ConstraintResolutionGui'>Gnt.plugin.ConstraintResolutionGui</span><br/><a href='source/ConstraintResolutionGui.html#Gnt-plugin-ConstraintResolutionGui-method-init' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.plugin.ConstraintResolutionGui-method-init' class='name expandable'>init</a>( <span class='pre'>cmp</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>cmp</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-onConstraintConflict' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.plugin.ConstraintResolutionGui'>Gnt.plugin.ConstraintResolutionGui</span><br/><a href='source/ConstraintResolutionGui.html#Gnt-plugin-ConstraintResolutionGui-method-onConstraintConflict' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.plugin.ConstraintResolutionGui-method-onConstraintConflict' class='name expandable'>onConstraintConflict</a>( <span class='pre'>task, resolutionContext</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>task</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>resolutionContext</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-onUserActionCancel' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.plugin.ConstraintResolutionGui'>Gnt.plugin.ConstraintResolutionGui</span><br/><a href='source/ConstraintResolutionGui.html#Gnt-plugin-ConstraintResolutionGui-method-onUserActionCancel' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.plugin.ConstraintResolutionGui-method-onUserActionCancel' class='name expandable'>onUserActionCancel</a>( <span class='pre'>form, eOpts, resolutionContext, redrawTaskFn, wnd, detacher</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>form</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>eOpts</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>resolutionContext</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>redrawTaskFn</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>wnd</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>detacher</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-onUserActionClose' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.plugin.ConstraintResolutionGui'>Gnt.plugin.ConstraintResolutionGui</span><br/><a href='source/ConstraintResolutionGui.html#Gnt-plugin-ConstraintResolutionGui-method-onUserActionClose' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.plugin.ConstraintResolutionGui-method-onUserActionClose' class='name expandable'>onUserActionClose</a>( <span class='pre'>wnd, eOpts, resolutionContext, redrawTaskFn, detacher</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>wnd</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>eOpts</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>resolutionContext</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>redrawTaskFn</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>detacher</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-onUserActionOk' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.plugin.ConstraintResolutionGui'>Gnt.plugin.ConstraintResolutionGui</span><br/><a href='source/ConstraintResolutionGui.html#Gnt-plugin-ConstraintResolutionGui-method-onUserActionOk' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.plugin.ConstraintResolutionGui-method-onUserActionOk' class='name expandable'>onUserActionOk</a>( <span class='pre'>form, userChoice, eOpts, resolutionContext, redrawTaskFn, wnd, detacher</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>form</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>userChoice</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>eOpts</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>resolutionContext</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>redrawTaskFn</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>wnd</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>detacher</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-resolveSilently' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.plugin.ConstraintResolutionGui'>Gnt.plugin.ConstraintResolutionGui</span><br/><a href='source/ConstraintResolutionGui.html#Gnt-plugin-ConstraintResolutionGui-method-resolveSilently' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.plugin.ConstraintResolutionGui-method-resolveSilently' class='name expandable'>resolveSilently</a>( <span class='pre'>resolutionContext, redrawTaskFn</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>resolutionContext</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>redrawTaskFn</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-setDateFormat' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.plugin.ConstraintResolutionGui'>Gnt.plugin.ConstraintResolutionGui</span><br/><a href='source/ConstraintResolutionGui.html#Gnt-plugin-ConstraintResolutionGui-cfg-dateFormat' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.plugin.ConstraintResolutionGui-method-setDateFormat' class='name expandable'>setDateFormat</a>( <span class='pre'>dateFormat</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Sets the value of dateFormat. ...</div><div class='long'><p>Sets the value of <a href=\"#!/api/Gnt.plugin.ConstraintResolutionGui-cfg-dateFormat\" rel=\"Gnt.plugin.ConstraintResolutionGui-cfg-dateFormat\" class=\"docClass\">dateFormat</a>.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>dateFormat</span> : String<div class='sub-desc'><p>The new value.</p>\n</div></li></ul></div></div></div><div id='method-storeResolutionForContext' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.plugin.ConstraintResolutionGui'>Gnt.plugin.ConstraintResolutionGui</span><br/><a href='source/ConstraintResolutionGui.html#Gnt-plugin-ConstraintResolutionGui-method-storeResolutionForContext' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.plugin.ConstraintResolutionGui-method-storeResolutionForContext' class='name expandable'>storeResolutionForContext</a>( <span class='pre'>resolutionContext, optionIndex</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>resolutionContext</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>optionIndex</span> : Object<div class='sub-desc'></div></li></ul></div></div></div></div></div></div></div>","meta":{}});