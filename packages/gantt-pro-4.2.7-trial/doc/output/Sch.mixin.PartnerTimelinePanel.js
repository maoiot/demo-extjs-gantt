Ext.data.JsonP.Sch_mixin_PartnerTimelinePanel({"tagname":"class","name":"Sch.mixin.PartnerTimelinePanel","autodetected":{"aliases":true,"alternateClassNames":true,"extends":true,"mixins":true,"requires":true,"uses":true,"members":true,"code_type":true},"files":[{"filename":"PartnerTimelinePanel.js","href":"PartnerTimelinePanel.html#Sch-mixin-PartnerTimelinePanel"}],"aliases":{},"alternateClassNames":[],"extends":"Ext.Mixin","mixins":[],"requires":[],"uses":[],"members":[{"name":"onBeforeZoomChange","tagname":"method","owner":"Sch.mixin.PartnerTimelinePanel","id":"method-onBeforeZoomChange","meta":{"private":true}},{"name":"onLockedGridResize","tagname":"method","owner":"Sch.mixin.PartnerTimelinePanel","id":"method-onLockedGridResize","meta":{"private":true}},{"name":"onPartnerCollapseExpand","tagname":"method","owner":"Sch.mixin.PartnerTimelinePanel","id":"method-onPartnerCollapseExpand","meta":{"private":true}},{"name":"onViewChange","tagname":"method","owner":"Sch.mixin.PartnerTimelinePanel","id":"method-onViewChange","meta":{"private":true}},{"name":"setupPartnerTimelinePanel","tagname":"method","owner":"Sch.mixin.PartnerTimelinePanel","id":"method-setupPartnerTimelinePanel","meta":{"private":true}},{"name":"setupScrollSync","tagname":"method","owner":"Sch.mixin.PartnerTimelinePanel","id":"method-setupScrollSync","meta":{"private":true}}],"code_type":"ext_define","id":"class-Sch.mixin.PartnerTimelinePanel","component":false,"superclasses":["Ext.Mixin"],"subclasses":[],"mixedInto":["Sch.mixin.TimelinePanel"],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Ext.Mixin<div class='subclass '><strong>Sch.mixin.PartnerTimelinePanel</strong></div></div><h4>Mixed into</h4><div class='dependency'><a href='#!/api/Sch.mixin.TimelinePanel' rel='Sch.mixin.TimelinePanel' class='docClass'>Sch.mixin.TimelinePanel</a></div><h4>Files</h4><div class='dependency'><a href='source/PartnerTimelinePanel.html#Sch-mixin-PartnerTimelinePanel' target='_blank'>PartnerTimelinePanel.js</a></div></pre><div class='doc-contents'><p>Internal class syncing size/state of the locked grid in two Timeline panels.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-onBeforeZoomChange' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.mixin.PartnerTimelinePanel'>Sch.mixin.PartnerTimelinePanel</span><br/><a href='source/PartnerTimelinePanel.html#Sch-mixin-PartnerTimelinePanel-method-onBeforeZoomChange' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.mixin.PartnerTimelinePanel-method-onBeforeZoomChange' class='name expandable'>onBeforeZoomChange</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-onLockedGridResize' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.mixin.PartnerTimelinePanel'>Sch.mixin.PartnerTimelinePanel</span><br/><a href='source/PartnerTimelinePanel.html#Sch-mixin-PartnerTimelinePanel-method-onLockedGridResize' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.mixin.PartnerTimelinePanel-method-onLockedGridResize' class='name expandable'>onLockedGridResize</a>( <span class='pre'>cmp, width</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>Scope of 'this' is set to the other panel in the listener ...</div><div class='long'><p>Scope of 'this' is set to the other panel in the listener</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>cmp</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>width</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-onPartnerCollapseExpand' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.mixin.PartnerTimelinePanel'>Sch.mixin.PartnerTimelinePanel</span><br/><a href='source/PartnerTimelinePanel.html#Sch-mixin-PartnerTimelinePanel-method-onPartnerCollapseExpand' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.mixin.PartnerTimelinePanel-method-onPartnerCollapseExpand' class='name expandable'>onPartnerCollapseExpand</a>( <span class='pre'>panel</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>panel</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-onViewChange' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.mixin.PartnerTimelinePanel'>Sch.mixin.PartnerTimelinePanel</span><br/><a href='source/PartnerTimelinePanel.html#Sch-mixin-PartnerTimelinePanel-method-onViewChange' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.mixin.PartnerTimelinePanel-method-onViewChange' class='name expandable'>onViewChange</a>( <span class='pre'>panel</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>Update the 'viewPreset' property manually since it's a public property of the TimelinePanel. ...</div><div class='long'><p>Update the 'viewPreset' property manually since it's a public property of the TimelinePanel.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>panel</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-setupPartnerTimelinePanel' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.mixin.PartnerTimelinePanel'>Sch.mixin.PartnerTimelinePanel</span><br/><a href='source/PartnerTimelinePanel.html#Sch-mixin-PartnerTimelinePanel-method-setupPartnerTimelinePanel' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.mixin.PartnerTimelinePanel-method-setupPartnerTimelinePanel' class='name expandable'>setupPartnerTimelinePanel</a>( <span class='pre'>panel</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>panel</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-setupScrollSync' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.mixin.PartnerTimelinePanel'>Sch.mixin.PartnerTimelinePanel</span><br/><a href='source/PartnerTimelinePanel.html#Sch-mixin-PartnerTimelinePanel-method-setupScrollSync' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.mixin.PartnerTimelinePanel-method-setupScrollSync' class='name expandable'>setupScrollSync</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div></div></div></div></div>","meta":{}});