Ext.data.JsonP.Sch_template_Dependency({"tagname":"class","name":"Sch.template.Dependency","autodetected":{"aliases":true,"alternateClassNames":true,"extends":true,"mixins":true,"requires":true,"uses":true,"members":true,"code_type":true},"files":[{"filename":"Dependency.js","href":"Dependency.html#Sch-template-Dependency"}],"aliases":{},"alternateClassNames":[],"extends":"Ext.XTemplate","mixins":[],"requires":[],"uses":[],"members":[{"name":"disableFormats","tagname":"property","owner":"Sch.template.Dependency","id":"property-disableFormats","meta":{"private":true}},{"name":"rtl","tagname":"property","owner":"Sch.template.Dependency","id":"property-rtl","meta":{"private":true}},{"name":"text","tagname":"property","owner":"Sch.template.Dependency","id":"property-text","meta":{"private":true}},{"name":"constructor","tagname":"method","owner":"Sch.template.Dependency","id":"method-constructor","meta":{}},{"name":"getSuffixedCls","tagname":"method","owner":"Sch.template.Dependency","id":"method-getSuffixedCls","meta":{"private":true}}],"code_type":"ext_define","id":"class-Sch.template.Dependency","component":false,"superclasses":["Ext.XTemplate"],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Ext.XTemplate<div class='subclass '><strong>Sch.template.Dependency</strong></div></div><h4>Files</h4><div class='dependency'><a href='source/Dependency.html#Sch-template-Dependency' target='_blank'>Dependency.js</a></div></pre><div class='doc-contents'><p>The HTML template used to visualise a line between two tasks.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-disableFormats' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.template.Dependency'>Sch.template.Dependency</span><br/><a href='source/Dependency.html#Sch-template-Dependency-property-disableFormats' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.template.Dependency-property-disableFormats' class='name expandable'>disableFormats</a> : Boolean<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>true</code></p></div></div></div><div id='property-rtl' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.template.Dependency'>Sch.template.Dependency</span><br/><a href='source/Dependency.html#Sch-template-Dependency-property-rtl' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.template.Dependency-property-rtl' class='name expandable'>rtl</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div><div id='property-text' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.template.Dependency'>Sch.template.Dependency</span><br/><a href='source/Dependency.html#Sch-template-Dependency-property-text' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.template.Dependency-property-text' class='name expandable'>text</a> : String<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>'&lt;tpl if=&quot;startArrow&quot;&gt;' + '&lt;div style=&quot;__SIDE__:{startArrow.side}px;top:{startArrow.top}px&quot; class=&quot;sch-dependency sch-dependency-arrow sch-dependency-start-arrow sch-dependency-arrow-{startArrow.dir} {[ this.getSuffixedCls(values.cls, &quot;-arrow&quot;) ]} {[ values.isHighlighted ? &quot;sch-dependency-selected&quot; : &quot;&quot; ]}&quot; &lt;tpl if=&quot;dependencyId&quot;&gt;data-sch-dependency-id=&quot;{[values.dependencyId]}&quot;&lt;/tpl&gt;&gt;&lt;/div&gt;' + '&lt;/tpl&gt;' + '&lt;tpl for=&quot;segments&quot;&gt;' + '&lt;div class=&quot;sch-dependency sch-dependency-line sch-dependency-line-{dir} {[ parent.isHighlighted ? &quot;sch-dependency-selected&quot; : &quot;&quot; ]} {[ this.getSuffixedCls(parent.cls, &quot;-line&quot;) ]}&quot; style=&quot;__SIDE__:{side}px;top:{top}px;&lt;tpl if=&quot;width !== null &amp;&amp; width !== undefined&quot;&gt;width:{width}px;&lt;/tpl&gt;&lt;tpl if=&quot;height !== null &amp;&amp; height !== undefined&quot;&gt;height:{height}px&lt;/tpl&gt;&quot; &lt;tpl if=&quot;parent.dependencyId&quot;&gt;data-sch-dependency-id=&quot;{parent.dependencyId}&quot;&lt;/tpl&gt;&gt;&lt;/div&gt;' + '&lt;/tpl&gt;' + '&lt;tpl if=&quot;endArrow&quot;&gt;' + '&lt;div style=&quot;__SIDE__:{endArrow.side}px;top:{endArrow.top}px&quot; class=&quot;sch-dependency sch-dependency-arrow sch-dependency-end-arrow sch-dependency-arrow-{endArrow.dir} {[ this.getSuffixedCls(values.cls, &quot;-arrow&quot;) ]} {[ values.isHighlighted ? &quot;sch-dependency-selected&quot; : &quot;&quot; ]}&quot; &lt;tpl if=&quot;dependencyId&quot;&gt;data-sch-dependency-id=&quot;{dependencyId}&quot;&lt;/tpl&gt;&gt;&lt;/div&gt;' + '&lt;/tpl&gt;'</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.template.Dependency'>Sch.template.Dependency</span><br/><a href='source/Dependency.html#Sch-template-Dependency-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/Sch.template.Dependency-method-constructor' class='name expandable'>Sch.template.Dependency</a>( <span class='pre'>config</span> ) : <a href=\"#!/api/Sch.template.Dependency\" rel=\"Sch.template.Dependency\" class=\"docClass\">Sch.template.Dependency</a><span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : Object<div class='sub-desc'></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Sch.template.Dependency\" rel=\"Sch.template.Dependency\" class=\"docClass\">Sch.template.Dependency</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getSuffixedCls' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Sch.template.Dependency'>Sch.template.Dependency</span><br/><a href='source/Dependency.html#Sch-template-Dependency-method-getSuffixedCls' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Sch.template.Dependency-method-getSuffixedCls' class='name expandable'>getSuffixedCls</a>( <span class='pre'>cls, suffix</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>cls</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>suffix</span> : Object<div class='sub-desc'></div></li></ul></div></div></div></div></div></div></div>","meta":{}});