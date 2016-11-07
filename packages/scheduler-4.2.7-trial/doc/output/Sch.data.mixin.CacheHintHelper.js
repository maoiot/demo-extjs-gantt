Ext.data.JsonP.Sch_data_mixin_CacheHintHelper({"tagname":"class","name":"Sch.data.mixin.CacheHintHelper","autodetected":{"aliases":true,"alternateClassNames":true,"extends":true,"mixins":true,"requires":true,"uses":true,"members":true,"code_type":true},"files":[{"filename":"CacheHintHelper.js","href":"CacheHintHelper.html#Sch-data-mixin-CacheHintHelper"}],"private":true,"aliases":{},"alternateClassNames":[],"extends":"Ext.Mixin","mixins":[],"requires":[],"uses":[],"members":[{"name":"mixinConfig","tagname":"property","owner":"Sch.data.mixin.CacheHintHelper","id":"property-mixinConfig","meta":{"private":true}},{"name":"loadRecords","tagname":"method","owner":"Sch.data.mixin.CacheHintHelper","id":"method-loadRecords","meta":{"private":true}},{"name":"removeAll","tagname":"method","owner":"Sch.data.mixin.CacheHintHelper","id":"method-removeAll","meta":{"private":true}}],"code_type":"ext_define","id":"class-Sch.data.mixin.CacheHintHelper","short_doc":"This mixin intercepts a set of store methods and firing a set of events providing a cache with a better hint\nwhen to ...","component":false,"superclasses":["Ext.Mixin"],"subclasses":[],"mixedInto":["Sch.data.AssignmentStore","Sch.data.DependencyStore"],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Ext.Mixin<div class='subclass '><strong>Sch.data.mixin.CacheHintHelper</strong></div></div><h4>Mixed into</h4><div class='dependency'><a href='#!/api/Sch.data.AssignmentStore' rel='Sch.data.AssignmentStore' class='docClass'>Sch.data.AssignmentStore</a></div><div class='dependency'><a href='#!/api/Sch.data.DependencyStore' rel='Sch.data.DependencyStore' class='docClass'>Sch.data.DependencyStore</a></div><h4>Files</h4><div class='dependency'><a href='source/CacheHintHelper.html#Sch-data-mixin-CacheHintHelper' target='_blank'>CacheHintHelper.js</a></div></pre><div class='doc-contents'><div class='rounded-box private-box'><p><strong>NOTE:</strong> This is a private utility class for internal use by the framework. Don't rely on its existence.</p></div><p>This mixin intercepts a set of store methods and firing a set of events providing a cache with a better hint\nwhen to update itself.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-mixinConfig' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.data.mixin.CacheHintHelper'>Sch.data.mixin.CacheHintHelper</span><br/><a href='source/CacheHintHelper.html#Sch-data-mixin-CacheHintHelper-property-mixinConfig' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.data.mixin.CacheHintHelper-property-mixinConfig' class='name expandable'>mixinConfig</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>{before: {loadRecords: 'loadRecords', removeAll: 'removeAll'}}</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-loadRecords' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.data.mixin.CacheHintHelper'>Sch.data.mixin.CacheHintHelper</span><br/><a href='source/CacheHintHelper.html#Sch-data-mixin-CacheHintHelper-method-loadRecords' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.data.mixin.CacheHintHelper-method-loadRecords' class='name expandable'>loadRecords</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>Call to loadRecords() results in 'datachanged' and 'refresh' events, but 'datachanged' is also fired upon\ncall to add...</div><div class='long'><p>Call to loadRecords() results in 'datachanged' and 'refresh' events, but 'datachanged' is also fired upon\ncall to add/remove/write/filter/sort/removeAll so a cache cannot detect what method call results in 'datachanged'\nin case of previosly mentioned methods a cache shouldn't handle 'datachanged' event it is not affected by\nwrite/filter/sort at all, as for add/remove/removeAll it listens to preceding events like 'add'/'remove'/'clear'\nand reflects updates correspondingly. But in case of loadRecords() the sequence of events fired 'datachanged' and\n'refresh' provides too little information to make right decision whether to reset a cache or not, moreover resetting\na cache on 'refresh' is to late since a lot of logic (rendering logic especially) start quering the store\nupon 'datachanged' event and thus if cache wasn't reset it will provide that logic with outdated data.\nThus I have to override loadRecords() and make it fire private 'cacheresethint' event to provide a cache with\na way to reset itself beforehand.</p>\n<h3 class='pa'>Fires</h3><ul><li>cacheresethint</li></ul></div></div></div><div id='method-removeAll' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.data.mixin.CacheHintHelper'>Sch.data.mixin.CacheHintHelper</span><br/><a href='source/CacheHintHelper.html#Sch-data-mixin-CacheHintHelper-method-removeAll' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.data.mixin.CacheHintHelper-method-removeAll' class='name expandable'>removeAll</a>( <span class='pre'>silent</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>If no event is fired for the removal, we need to clear cache manually ...</div><div class='long'><p>If no event is fired for the removal, we need to clear cache manually</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>silent</span> : Object<div class='sub-desc'></div></li></ul><h3 class='pa'>Fires</h3><ul><li>cacheresethint</li></ul></div></div></div></div></div></div></div>","meta":{"private":true}});