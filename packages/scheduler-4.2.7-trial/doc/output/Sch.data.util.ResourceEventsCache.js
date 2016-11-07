Ext.data.JsonP.Sch_data_util_ResourceEventsCache({"tagname":"class","name":"Sch.data.util.ResourceEventsCache","autodetected":{"aliases":true,"alternateClassNames":true,"extends":true,"mixins":true,"requires":true,"uses":true,"members":true,"code_type":true},"files":[{"filename":"ResourceEventsCache.js","href":"ResourceEventsCache.html#Sch-data-util-ResourceEventsCache"}],"private":true,"aliases":{},"alternateClassNames":[],"extends":"Sch.util.Cache","mixins":[],"requires":["Ext.data.Model"],"uses":[],"members":[{"name":"cache","tagname":"property","owner":"Sch.util.Cache","id":"property-cache","meta":{"private":true}},{"name":"eventStore","tagname":"property","owner":"Sch.data.util.ResourceEventsCache","id":"property-eventStore","meta":{"private":true}},{"name":"eventStoreDetacher","tagname":"property","owner":"Sch.data.util.ResourceEventsCache","id":"property-eventStoreDetacher","meta":{"private":true}},{"name":"resourceStoreDetacher","tagname":"property","owner":"Sch.data.util.ResourceEventsCache","id":"property-resourceStoreDetacher","meta":{"private":true}},{"name":"constructor","tagname":"method","owner":"Sch.data.util.ResourceEventsCache","id":"method-constructor","meta":{}},{"name":"add","tagname":"method","owner":"Sch.util.Cache","id":"method-add","meta":{"chainable":true}},{"name":"clear","tagname":"method","owner":"Sch.util.Cache","id":"method-clear","meta":{"chainable":true}},{"name":"destroy","tagname":"method","owner":"Sch.data.util.ResourceEventsCache","id":"method-destroy","meta":{"private":true}},{"name":"get","tagname":"method","owner":"Sch.data.util.ResourceEventsCache","id":"method-get","meta":{}},{"name":"key","tagname":"method","owner":"Sch.util.Cache","id":"method-key","meta":{"template":true}},{"name":"move","tagname":"method","owner":"Sch.util.Cache","id":"method-move","meta":{"chainable":true}},{"name":"remove","tagname":"method","owner":"Sch.util.Cache","id":"method-remove","meta":{"chainable":true}},{"name":"uncache","tagname":"method","owner":"Sch.util.Cache","id":"method-uncache","meta":{"chainable":true}}],"code_type":"ext_define","id":"class-Sch.data.util.ResourceEventsCache","short_doc":"Event store's resource->events cache. ...","component":false,"superclasses":["Ext.Base","Sch.util.Cache"],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Ext.Base<div class='subclass '><a href='#!/api/Sch.util.Cache' rel='Sch.util.Cache' class='docClass'>Sch.util.Cache</a><div class='subclass '><strong>Sch.data.util.ResourceEventsCache</strong></div></div></div><h4>Requires</h4><div class='dependency'>Ext.data.Model</div><h4>Files</h4><div class='dependency'><a href='source/ResourceEventsCache.html#Sch-data-util-ResourceEventsCache' target='_blank'>ResourceEventsCache.js</a></div></pre><div class='doc-contents'><div class='rounded-box private-box'><p><strong>NOTE:</strong> This is a private utility class for internal use by the framework. Don't rely on its existence.</p></div><p>Event store's resource->events cache.\nUses resource records or resource record ids as keys.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-cache' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.util.Cache' rel='Sch.util.Cache' class='defined-in docClass'>Sch.util.Cache</a><br/><a href='source/Cache.html#Sch-util-Cache-property-cache' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.util.Cache-property-cache' class='name expandable'>cache</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div><div id='property-eventStore' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.data.util.ResourceEventsCache'>Sch.data.util.ResourceEventsCache</span><br/><a href='source/ResourceEventsCache.html#Sch-data-util-ResourceEventsCache-property-eventStore' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.data.util.ResourceEventsCache-property-eventStore' class='name expandable'>eventStore</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div><div id='property-eventStoreDetacher' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.data.util.ResourceEventsCache'>Sch.data.util.ResourceEventsCache</span><br/><a href='source/ResourceEventsCache.html#Sch-data-util-ResourceEventsCache-property-eventStoreDetacher' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.data.util.ResourceEventsCache-property-eventStoreDetacher' class='name expandable'>eventStoreDetacher</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div><div id='property-resourceStoreDetacher' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.data.util.ResourceEventsCache'>Sch.data.util.ResourceEventsCache</span><br/><a href='source/ResourceEventsCache.html#Sch-data-util-ResourceEventsCache-property-resourceStoreDetacher' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.data.util.ResourceEventsCache-property-resourceStoreDetacher' class='name expandable'>resourceStoreDetacher</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.data.util.ResourceEventsCache'>Sch.data.util.ResourceEventsCache</span><br/><a href='source/ResourceEventsCache.html#Sch-data-util-ResourceEventsCache-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/Sch.data.util.ResourceEventsCache-method-constructor' class='name expandable'>Sch.data.util.ResourceEventsCache</a>( <span class='pre'>eventStore</span> ) : <a href=\"#!/api/Sch.data.util.ResourceEventsCache\" rel=\"Sch.data.util.ResourceEventsCache\" class=\"docClass\">Sch.data.util.ResourceEventsCache</a><span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>eventStore</span> : Object<div class='sub-desc'></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Sch.data.util.ResourceEventsCache\" rel=\"Sch.data.util.ResourceEventsCache\" class=\"docClass\">Sch.data.util.ResourceEventsCache</a></span><div class='sub-desc'>\n</div></li></ul><p>Overrides: <a href=\"#!/api/Sch.util.Cache-method-constructor\" rel=\"Sch.util.Cache-method-constructor\" class=\"docClass\">Sch.util.Cache.constructor</a></p></div></div></div><div id='method-add' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.util.Cache' rel='Sch.util.Cache' class='defined-in docClass'>Sch.util.Cache</a><br/><a href='source/Cache.html#Sch-util-Cache-method-add' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.util.Cache-method-add' class='name expandable'>add</a>( <span class='pre'>k, v</span> ) : <a href=\"#!/api/Sch.util.Cache\" rel=\"Sch.util.Cache\" class=\"docClass\">Sch.util.Cache</a><span class=\"signature\"><span class='chainable' >chainable</span></span></div><div class='description'><div class='short'>Caches a value using either a key provided or a key obtained from key() method. ...</div><div class='long'><p>Caches a value using either a key provided or a key obtained from <a href=\"#!/api/Sch.util.Cache-method-key\" rel=\"Sch.util.Cache-method-key\" class=\"docClass\">key()</a> method.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>k</span> : Mixed<div class='sub-desc'>\n</div></li><li><span class='pre'>v</span> : Mixed<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Sch.util.Cache\" rel=\"Sch.util.Cache\" class=\"docClass\">Sch.util.Cache</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-clear' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.util.Cache' rel='Sch.util.Cache' class='defined-in docClass'>Sch.util.Cache</a><br/><a href='source/Cache.html#Sch-util-Cache-method-clear' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.util.Cache-method-clear' class='name expandable'>clear</a>( <span class='pre'>[k]</span> ) : <a href=\"#!/api/Sch.util.Cache\" rel=\"Sch.util.Cache\" class=\"docClass\">Sch.util.Cache</a><span class=\"signature\"><span class='chainable' >chainable</span></span></div><div class='description'><div class='short'>Clears entire cache, or clears cache for a given key. ...</div><div class='long'><p>Clears entire cache, or clears cache for a given key.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>k</span> : Mixed (optional)<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Sch.util.Cache\" rel=\"Sch.util.Cache\" class=\"docClass\">Sch.util.Cache</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-destroy' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.data.util.ResourceEventsCache'>Sch.data.util.ResourceEventsCache</span><br/><a href='source/ResourceEventsCache.html#Sch-data-util-ResourceEventsCache-method-destroy' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.data.util.ResourceEventsCache-method-destroy' class='name expandable'>destroy</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-get' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.data.util.ResourceEventsCache'>Sch.data.util.ResourceEventsCache</span><br/><a href='source/ResourceEventsCache.html#Sch-data-util-ResourceEventsCache-method-get' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.data.util.ResourceEventsCache-method-get' class='name expandable'>get</a>( <span class='pre'>k, fn</span> ) : [Mixed]<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns all values cached with a given key, or if key isn't present executes a given function, caches\nit's result (wh...</div><div class='long'><p>Returns all values cached with a given key, or if key isn't present executes a given function, caches\nit's result (which should be array) after it's mapped over map and returns it.</p>\n\n<p><em>Warning</em>: the array returned must not be modified otherwise cache integrity will be violated.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>k</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>fn</span> : Object<div class='sub-desc'></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>[Mixed]</span><div class='sub-desc'>\n</div></li></ul><p>Overrides: <a href=\"#!/api/Sch.util.Cache-method-get\" rel=\"Sch.util.Cache-method-get\" class=\"docClass\">Sch.util.Cache.get</a></p></div></div></div><div id='method-key' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.util.Cache' rel='Sch.util.Cache' class='defined-in docClass'>Sch.util.Cache</a><br/><a href='source/Cache.html#Sch-util-Cache-method-key' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.util.Cache-method-key' class='name expandable'>key</a>( <span class='pre'>v</span> ) : String<span class=\"signature\"><span class='template' >template</span></span></div><div class='description'><div class='short'>A function returning a key for given value. ...</div><div class='long'><p>A function returning a key for given value.</p>\n      <div class='rounded-box template-box'>\n      <p>This is a <a href=\"#!/guide/components\">template method</a>.\n         a hook into the functionality of this class.\n         Feel free to override it in child classes.</p>\n      </div>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>v</span> : Mixed<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-move' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.util.Cache' rel='Sch.util.Cache' class='defined-in docClass'>Sch.util.Cache</a><br/><a href='source/Cache.html#Sch-util-Cache-method-move' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.util.Cache-method-move' class='name expandable'>move</a>( <span class='pre'>oldKey, newKey</span> ) : <a href=\"#!/api/Sch.util.Cache\" rel=\"Sch.util.Cache\" class=\"docClass\">Sch.util.Cache</a><span class=\"signature\"><span class='chainable' >chainable</span></span></div><div class='description'><div class='short'>Moves all items or a single item under old key to new key ...</div><div class='long'><p>Moves all items or a single item under old key to new key</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>oldKey</span> : Mixed<div class='sub-desc'>\n</div></li><li><span class='pre'>newKey</span> : Mixed<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Sch.util.Cache\" rel=\"Sch.util.Cache\" class=\"docClass\">Sch.util.Cache</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-remove' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.util.Cache' rel='Sch.util.Cache' class='defined-in docClass'>Sch.util.Cache</a><br/><a href='source/Cache.html#Sch-util-Cache-method-remove' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.util.Cache-method-remove' class='name expandable'>remove</a>( <span class='pre'>k, v</span> ) : <a href=\"#!/api/Sch.util.Cache\" rel=\"Sch.util.Cache\" class=\"docClass\">Sch.util.Cache</a><span class=\"signature\"><span class='chainable' >chainable</span></span></div><div class='description'><div class='short'>Removes cached value from cache under a given key or under a key obtained from key() method. ...</div><div class='long'><p>Removes cached value from cache under a given key or under a key obtained from <a href=\"#!/api/Sch.util.Cache-method-key\" rel=\"Sch.util.Cache-method-key\" class=\"docClass\">key()</a> method.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>k</span> : Mixed<div class='sub-desc'>\n</div></li><li><span class='pre'>v</span> : Mixed<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Sch.util.Cache\" rel=\"Sch.util.Cache\" class=\"docClass\">Sch.util.Cache</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-uncache' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Sch.util.Cache' rel='Sch.util.Cache' class='defined-in docClass'>Sch.util.Cache</a><br/><a href='source/Cache.html#Sch-util-Cache-method-uncache' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.util.Cache-method-uncache' class='name expandable'>uncache</a>( <span class='pre'>v</span> ) : <a href=\"#!/api/Sch.util.Cache\" rel=\"Sch.util.Cache\" class=\"docClass\">Sch.util.Cache</a><span class=\"signature\"><span class='chainable' >chainable</span></span></div><div class='description'><div class='short'>Removes value from entire cache (from every key it exists under). ...</div><div class='long'><p>Removes value from entire cache (from every key it exists under).</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>v</span> : Mixed<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Sch.util.Cache\" rel=\"Sch.util.Cache\" class=\"docClass\">Sch.util.Cache</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{"private":true}});