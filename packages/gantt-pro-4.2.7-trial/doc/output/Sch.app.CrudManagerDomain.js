Ext.data.JsonP.Sch_app_CrudManagerDomain({"tagname":"class","name":"Sch.app.CrudManagerDomain","autodetected":{"aliases":true,"alternateClassNames":true,"extends":true,"mixins":true,"requires":true,"uses":true,"members":true,"code_type":true,"singleton":true},"files":[{"filename":"CrudManagerDomain.js","href":"CrudManagerDomain.html#Sch-app-CrudManagerDomain"}],"aliases":{},"alternateClassNames":[],"extends":"Ext.app.EventDomain","mixins":[],"requires":["Sch.crud.AbstractManager"],"uses":[],"members":[{"name":"prefix","tagname":"property","owner":"Sch.app.CrudManagerDomain","id":"property-prefix","meta":{"private":true}},{"name":"type","tagname":"property","owner":"Sch.app.CrudManagerDomain","id":"property-type","meta":{"private":true}},{"name":"constructor","tagname":"method","owner":"Sch.app.CrudManagerDomain","id":"method-constructor","meta":{}},{"name":"match","tagname":"method","owner":"Sch.app.CrudManagerDomain","id":"method-match","meta":{"private":true}}],"code_type":"ext_define","singleton":true,"id":"class-Sch.app.CrudManagerDomain","short_doc":"This class implements an event domain for CRUD manager instances (classes extending Sch.crud.AbstractManager). ...","component":false,"superclasses":["Ext.app.EventDomain"],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Ext.app.EventDomain<div class='subclass '><strong>Sch.app.CrudManagerDomain</strong></div></div><h4>Requires</h4><div class='dependency'><a href='#!/api/Sch.crud.AbstractManager' rel='Sch.crud.AbstractManager' class='docClass'>Sch.crud.AbstractManager</a></div><h4>Files</h4><div class='dependency'><a href='source/CrudManagerDomain.html#Sch-app-CrudManagerDomain' target='_blank'>CrudManagerDomain.js</a></div></pre><div class='doc-contents'><p>This class implements an event domain for CRUD manager instances (classes extending <a href=\"#!/api/Sch.crud.AbstractManager\" rel=\"Sch.crud.AbstractManager\" class=\"docClass\">Sch.crud.AbstractManager</a>).\nSo that when MVC approach is used a Controller would be able to attach listeners for CRUD manager events in a declarative way.</p>\n\n<pre><code>  Ext.define('MyApplication', {\n      extend          : 'Ext.app.Application',\n\n      requires        : [\n          // we need this to enable CRUD managers domain\n          '<a href=\"#!/api/Sch.app.CrudManagerDomain\" rel=\"Sch.app.CrudManagerDomain\" class=\"docClass\">Sch.app.CrudManagerDomain</a>',\n          'Ext.window.MessageBox'\n      ],\n\n      listen          : {\n          crudmanager : {\n              // listen to all CRUD managers available\n              '*' : {\n                  'loadfail' : 'onCrudException'\n                  'syncfail' : 'onCrudException'\n              },\n\n              // this selector matches to a CRUD manager having an alias set to `crudmanager.specific-crud`\n              'specific-crud' : {\n                  'load' : 'onSpecificCrudLoaded'\n              }\n          }\n      },\n\n      onCrudException : function (crud, response, responseOptions) {\n          Ext.Msg.show({\n              title    : 'Error',\n              msg      : response.message || 'Unknown error',\n              icon     : Ext.Msg.ERROR,\n              buttons  : Ext.Msg.OK,\n              minWidth : Ext.Msg.minWidth\n          });\n      },\n\n      onSpecificCrudLoaded : function () {\n          ...\n      },\n\n      ....\n  });\n</code></pre>\n\n<p>Selectors are either CRUD manager's alias or '*' wildcard for any CRUD manager.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-prefix' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.app.CrudManagerDomain'>Sch.app.CrudManagerDomain</span><br/><a href='source/CrudManagerDomain.html#Sch-app-CrudManagerDomain-property-prefix' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.app.CrudManagerDomain-property-prefix' class='name expandable'>prefix</a> : String<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>'crudmanager.'</code></p></div></div></div><div id='property-type' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.app.CrudManagerDomain'>Sch.app.CrudManagerDomain</span><br/><a href='source/CrudManagerDomain.html#Sch-app-CrudManagerDomain-property-type' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.app.CrudManagerDomain-property-type' class='name expandable'>type</a> : String<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>'crudmanager'</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.app.CrudManagerDomain'>Sch.app.CrudManagerDomain</span><br/><a href='source/CrudManagerDomain.html#Sch-app-CrudManagerDomain-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/Sch.app.CrudManagerDomain-method-constructor' class='name expandable'>Sch.app.CrudManagerDomain</a>( <span class='pre'></span> ) : <a href=\"#!/api/Sch.app.CrudManagerDomain\" rel=\"Sch.app.CrudManagerDomain\" class=\"docClass\">Sch.app.CrudManagerDomain</a><span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Sch.app.CrudManagerDomain\" rel=\"Sch.app.CrudManagerDomain\" class=\"docClass\">Sch.app.CrudManagerDomain</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-match' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.app.CrudManagerDomain'>Sch.app.CrudManagerDomain</span><br/><a href='source/CrudManagerDomain.html#Sch-app-CrudManagerDomain-method-match' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.app.CrudManagerDomain-method-match' class='name expandable'>match</a>( <span class='pre'>target, selector</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>target</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>selector</span> : Object<div class='sub-desc'></div></li></ul></div></div></div></div></div></div></div>","meta":{}});