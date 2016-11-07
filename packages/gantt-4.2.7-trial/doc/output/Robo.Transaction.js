Ext.data.JsonP.Robo_Transaction({"tagname":"class","name":"Robo.Transaction","autodetected":{"aliases":true,"alternateClassNames":true,"extends":true,"mixins":true,"requires":true,"uses":true,"members":true,"code_type":true},"files":[{"filename":"Transaction.js","href":"Transaction.html#Robo-Transaction"}],"aliases":{},"alternateClassNames":[],"extends":"Ext.Base","mixins":[],"requires":[],"uses":[],"members":[{"name":"title","tagname":"cfg","owner":"Robo.Transaction","id":"cfg-title","meta":{}},{"name":"actions","tagname":"property","owner":"Robo.Transaction","id":"property-actions","meta":{"private":true}},{"name":"constructor","tagname":"method","owner":"Robo.Transaction","id":"method-constructor","meta":{}},{"name":"addAction","tagname":"method","owner":"Robo.Transaction","id":"method-addAction","meta":{"private":true}},{"name":"getActions","tagname":"method","owner":"Robo.Transaction","id":"method-getActions","meta":{"private":true}},{"name":"getTitle","tagname":"method","owner":"Robo.Transaction","id":"method-getTitle","meta":{}},{"name":"hasActions","tagname":"method","owner":"Robo.Transaction","id":"method-hasActions","meta":{}},{"name":"redo","tagname":"method","owner":"Robo.Transaction","id":"method-redo","meta":{}},{"name":"undo","tagname":"method","owner":"Robo.Transaction","id":"method-undo","meta":{}}],"code_type":"ext_define","id":"class-Robo.Transaction","short_doc":"This class encapsulates a single undo/redo transaction used with the Robo.Manager. ...","component":false,"superclasses":["Ext.Base"],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Ext.Base<div class='subclass '><strong>Robo.Transaction</strong></div></div><h4>Files</h4><div class='dependency'><a href='source/Transaction.html#Robo-Transaction' target='_blank'>Transaction.js</a></div></pre><div class='doc-contents'><p>This class encapsulates a single undo/redo transaction used with the <a href=\"#!/api/Robo.Manager\" rel=\"Robo.Manager\" class=\"docClass\">Robo.Manager</a>.</p>\n\n<p>Transaction consists from at least one action <a href=\"#!/api/Robo.action.Base\" rel=\"Robo.action.Base\" class=\"docClass\">Robo.action.Base</a></p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div id='cfg-title' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Robo.Transaction'>Robo.Transaction</span><br/><a href='source/Transaction.html#Robo-Transaction-cfg-title' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Robo.Transaction-cfg-title' class='name expandable'>title</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'><p>A human-readable name for this transaction.</p>\n</div><div class='long'><p>A human-readable name for this transaction.</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-actions' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Robo.Transaction'>Robo.Transaction</span><br/><a href='source/Transaction.html#Robo-Transaction-property-actions' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Robo.Transaction-property-actions' class='name expandable'>actions</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Robo.Transaction'>Robo.Transaction</span><br/><a href='source/Transaction.html#Robo-Transaction-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/Robo.Transaction-method-constructor' class='name expandable'>Robo.Transaction</a>( <span class='pre'>config</span> ) : <a href=\"#!/api/Robo.Transaction\" rel=\"Robo.Transaction\" class=\"docClass\">Robo.Transaction</a><span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : Object<div class='sub-desc'></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Robo.Transaction\" rel=\"Robo.Transaction\" class=\"docClass\">Robo.Transaction</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-addAction' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Robo.Transaction'>Robo.Transaction</span><br/><a href='source/Transaction.html#Robo-Transaction-method-addAction' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Robo.Transaction-method-addAction' class='name expandable'>addAction</a>( <span class='pre'>action</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>action</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-getActions' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Robo.Transaction'>Robo.Transaction</span><br/><a href='source/Transaction.html#Robo-Transaction-method-getActions' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Robo.Transaction-method-getActions' class='name expandable'>getActions</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-getTitle' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Robo.Transaction'>Robo.Transaction</span><br/><a href='source/Transaction.html#Robo-Transaction-method-getTitle' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Robo.Transaction-method-getTitle' class='name expandable'>getTitle</a>( <span class='pre'></span> ) : String<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns the title for this transaction. ...</div><div class='long'><p>Returns the title for this transaction. If not provided explicitly, a title of the first action is returned.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-hasActions' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Robo.Transaction'>Robo.Transaction</span><br/><a href='source/Transaction.html#Robo-Transaction-method-hasActions' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Robo.Transaction-method-hasActions' class='name expandable'>hasActions</a>( <span class='pre'></span> ) : Boolean<span class=\"signature\"></span></div><div class='description'><div class='short'>Checks wheither a transaction has any actions recorded ...</div><div class='long'><p>Checks wheither a transaction has any actions recorded</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-redo' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Robo.Transaction'>Robo.Transaction</span><br/><a href='source/Transaction.html#Robo-Transaction-method-redo' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Robo.Transaction-method-redo' class='name expandable'>redo</a>( <span class='pre'></span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Redoes this transaction. ...</div><div class='long'><p>Redoes this transaction. Generally should not be called directly.</p>\n</div></div></div><div id='method-undo' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Robo.Transaction'>Robo.Transaction</span><br/><a href='source/Transaction.html#Robo-Transaction-method-undo' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Robo.Transaction-method-undo' class='name expandable'>undo</a>( <span class='pre'></span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Undoes this transaction. ...</div><div class='long'><p>Undoes this transaction. Generally should not be called directly.</p>\n</div></div></div></div></div></div></div>","meta":{}});