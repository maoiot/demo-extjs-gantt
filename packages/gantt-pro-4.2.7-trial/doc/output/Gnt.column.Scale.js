Ext.data.JsonP.Gnt_column_Scale({"tagname":"class","name":"Gnt.column.Scale","autodetected":{"aliases":true,"alternateClassNames":true,"mixins":true,"requires":true,"uses":true,"members":true,"code_type":true},"files":[{"filename":"Scale.js","href":"Scale.html#Gnt-column-Scale"}],"extends":"Ext.grid.column.Template","aliases":{"widget":["scalecolumn"]},"alternateClassNames":[],"mixins":[],"requires":[],"uses":[],"members":[{"name":"scaleLabelStep","tagname":"cfg","owner":"Gnt.column.Scale","id":"cfg-scaleLabelStep","meta":{}},{"name":"scaleMax","tagname":"cfg","owner":"Gnt.column.Scale","id":"cfg-scaleMax","meta":{}},{"name":"scaleMin","tagname":"cfg","owner":"Gnt.column.Scale","id":"cfg-scaleMin","meta":{}},{"name":"scalePoints","tagname":"cfg","owner":"Gnt.column.Scale","id":"cfg-scalePoints","meta":{}},{"name":"scaleStep","tagname":"cfg","owner":"Gnt.column.Scale","id":"cfg-scaleStep","meta":{}},{"name":"scaleCellCls","tagname":"property","owner":"Gnt.column.Scale","id":"property-scaleCellCls","meta":{"private":true}},{"name":"sortable","tagname":"property","owner":"Gnt.column.Scale","id":"property-sortable","meta":{"private":true}},{"name":"tpl","tagname":"property","owner":"Gnt.column.Scale","id":"property-tpl","meta":{"private":true}},{"name":"width","tagname":"property","owner":"Gnt.column.Scale","id":"property-width","meta":{"private":true}},{"name":"buildScalePoints","tagname":"method","owner":"Gnt.column.Scale","id":"method-buildScalePoints","meta":{"private":true}},{"name":"defaultRenderer","tagname":"method","owner":"Gnt.column.Scale","id":"method-defaultRenderer","meta":{"private":true}},{"name":"initComponent","tagname":"method","owner":"Gnt.column.Scale","id":"method-initComponent","meta":{"private":true}},{"name":"onAdded","tagname":"method","owner":"Gnt.column.Scale","id":"method-onAdded","meta":{"private":true}},{"name":"setAvailableHeight","tagname":"method","owner":"Gnt.column.Scale","id":"method-setAvailableHeight","meta":{"private":true}},{"name":"updateScalePoints","tagname":"method","owner":"Gnt.column.Scale","id":"method-updateScalePoints","meta":{"private":true}}],"code_type":"ext_define","id":"class-Gnt.column.Scale","short_doc":"A Column used to to display a vertical coordinate axis (numeric scale). ...","component":false,"superclasses":["Ext.grid.column.Template"],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Ext.grid.column.Template<div class='subclass '><strong>Gnt.column.Scale</strong></div></div><h4>Files</h4><div class='dependency'><a href='source/Scale.html#Gnt-column-Scale' target='_blank'>Scale.js</a></div></pre><div class='doc-contents'><p>A Column used to to display a vertical coordinate axis (numeric scale). This column is used by the <a href=\"#!/api/Gnt.panel.ResourceHistogram\" rel=\"Gnt.panel.ResourceHistogram\" class=\"docClass\">ResourceHistogram</a> panel.</p>\n\n<p>Usage example:</p>\n\n<pre><code>var histogram = Ext.create('<a href=\"#!/api/Gnt.panel.ResourceHistogram\" rel=\"Gnt.panel.ResourceHistogram\" class=\"docClass\">Gnt.panel.ResourceHistogram</a>', {\n    taskStore           : taskStore,\n    resourceStore       : resourceStore,\n    startDate           : new Date(2010, 0, 11),\n    endDate             : new Date(2010, 0, 21),\n    renderTo            : Ext.getBody(),\n    columns             : [\n        {\n            flex      : 1,\n            dataIndex : 'Name'\n        },\n        {\n            xtype           : 'scalecolumn'\n        }\n    ]\n});\n</code></pre>\n\n<h1>Defining the scale</h1>\n\n<p>The column supports two configuration modes for the numeric scale. The first one is incremental and the second one is using a fixed set of points.</p>\n\n<h1>Incremental approach</h1>\n\n<p>To use this approach you must define the following parameters: <a href=\"#!/api/Gnt.column.Scale-cfg-scaleMin\" rel=\"Gnt.column.Scale-cfg-scaleMin\" class=\"docClass\">scaleMin</a>, <a href=\"#!/api/Gnt.column.Scale-cfg-scaleMax\" rel=\"Gnt.column.Scale-cfg-scaleMax\" class=\"docClass\">scaleMax</a>, <a href=\"#!/api/Gnt.column.Scale-cfg-scaleStep\" rel=\"Gnt.column.Scale-cfg-scaleStep\" class=\"docClass\">scaleStep</a>.\nBased on them, the column will build scale points taking the <a href=\"#!/api/Gnt.column.Scale-cfg-scaleMin\" rel=\"Gnt.column.Scale-cfg-scaleMin\" class=\"docClass\">scaleMin</a> value as a start value and the <a href=\"#!/api/Gnt.column.Scale-cfg-scaleMax\" rel=\"Gnt.column.Scale-cfg-scaleMax\" class=\"docClass\">scaleMax</a> as the last scale point.\nValues between <a href=\"#!/api/Gnt.column.Scale-cfg-scaleMin\" rel=\"Gnt.column.Scale-cfg-scaleMin\" class=\"docClass\">scaleMin</a> and <a href=\"#!/api/Gnt.column.Scale-cfg-scaleMax\" rel=\"Gnt.column.Scale-cfg-scaleMax\" class=\"docClass\">scaleMax</a> will be calculated as:</p>\n\n<pre><code>valueN = scaleMin + N * scaleStep\n</code></pre>\n\n<p>Normally this approach is meant to be used for linear scales.</p>\n\n<h1>Fixed set of points</h1>\n\n<p>As an option to the earlier approach, you can use the <a href=\"#!/api/Gnt.column.Scale-cfg-scalePoints\" rel=\"Gnt.column.Scale-cfg-scalePoints\" class=\"docClass\">scalePoints</a> config. This config can be used to specify an array af scale points.\nThe array should contain objects describing the scale points, having the following properties:</p>\n\n<ul>\n<li><code>value</code>   Scale point value. <strong>This property is required</strong>.</li>\n<li><code>label</code>   Label for the scale point</li>\n<li><code>cls</code>     CSS class for corresponding scale point.</li>\n</ul>\n\n\n<p>For example:</p>\n\n<pre><code>var scaleColumn = new <a href=\"#!/api/Gnt.column.Scale\" rel=\"Gnt.column.Scale\" class=\"docClass\">Gnt.column.Scale</a>({\n    scalePoints : [\n        {\n            value   : 0\n        },\n        {\n            value   : 1,\n            label   : 'Day',\n            cls     : 'dayend'\n        },\n        {\n            value   : 0.5\n        }\n    ]\n});\n</code></pre>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div id='cfg-scaleLabelStep' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.Scale'>Gnt.column.Scale</span><br/><a href='source/Scale.html#Gnt-column-Scale-cfg-scaleLabelStep' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.Scale-cfg-scaleLabelStep' class='name expandable'>scaleLabelStep</a> : Number<span class=\"signature\"></span></div><div class='description'><div class='short'>Defines the interval between the scale points with labels. ...</div><div class='long'><p>Defines the interval between the scale points with labels.\nBy default the scale values are used for the labels. To use custom labels please use the <a href=\"#!/api/Gnt.column.Scale-cfg-scalePoints\" rel=\"Gnt.column.Scale-cfg-scalePoints\" class=\"docClass\">scalePoints</a> config.</p>\n<p>Defaults to: <code>4</code></p></div></div></div><div id='cfg-scaleMax' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.Scale'>Gnt.column.Scale</span><br/><a href='source/Scale.html#Gnt-column-Scale-cfg-scaleMax' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.Scale-cfg-scaleMax' class='name expandable'>scaleMax</a> : Number<span class=\"signature\"></span></div><div class='description'><div class='short'>Maximum scale point value. ...</div><div class='long'><p>Maximum scale point value.</p>\n<p>Defaults to: <code>24</code></p></div></div></div><div id='cfg-scaleMin' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.Scale'>Gnt.column.Scale</span><br/><a href='source/Scale.html#Gnt-column-Scale-cfg-scaleMin' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.Scale-cfg-scaleMin' class='name expandable'>scaleMin</a> : Number<span class=\"signature\"></span></div><div class='description'><div class='short'>Minimum scale point value. ...</div><div class='long'><p>Minimum scale point value.</p>\n<p>Defaults to: <code>0</code></p></div></div></div><div id='cfg-scalePoints' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.Scale'>Gnt.column.Scale</span><br/><a href='source/Scale.html#Gnt-column-Scale-cfg-scalePoints' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.Scale-cfg-scalePoints' class='name expandable'>scalePoints</a> : Object[]<span class=\"signature\"></span></div><div class='description'><div class='short'>An array of scale points. ...</div><div class='long'><p>An array of scale points. Each point should be represented as an object containing the following properties:</p>\n\n<ul>\n<li><code>value</code>   Scale point value <strong>(required)</strong>.</li>\n<li><code>label</code>   Label for the scale point</li>\n<li><code>cls</code>     CSS class for corresponding scale point.</li>\n</ul>\n\n</div></div></div><div id='cfg-scaleStep' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.Scale'>Gnt.column.Scale</span><br/><a href='source/Scale.html#Gnt-column-Scale-cfg-scaleStep' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.Scale-cfg-scaleStep' class='name expandable'>scaleStep</a> : Number<span class=\"signature\"></span></div><div class='description'><div class='short'>Defines the interval between two adjacent scale points. ...</div><div class='long'><p>Defines the interval between two adjacent scale points.</p>\n\n<p><strong>Also,</strong> this value is used as the margin between the top scale line (defined by <a href=\"#!/api/Gnt.column.Scale-cfg-scaleMax\" rel=\"Gnt.column.Scale-cfg-scaleMax\" class=\"docClass\">scaleMax</a> option) and the top border of the cell.</p>\n<p>Defaults to: <code>2</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-scaleCellCls' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.Scale'>Gnt.column.Scale</span><br/><a href='source/Scale.html#Gnt-column-Scale-property-scaleCellCls' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.Scale-property-scaleCellCls' class='name expandable'>scaleCellCls</a> : String<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>availableHeight     : 48, ...</div><div class='long'><p>availableHeight     : 48,</p>\n<p>Defaults to: <code>'gnt-scalecolumn'</code></p></div></div></div><div id='property-sortable' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.Scale'>Gnt.column.Scale</span><br/><a href='source/Scale.html#Gnt-column-Scale-property-sortable' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.Scale-property-sortable' class='name expandable'>sortable</a> : Boolean<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>false</code></p></div></div></div><div id='property-tpl' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.Scale'>Gnt.column.Scale</span><br/><a href='source/Scale.html#Gnt-column-Scale-property-tpl' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.Scale-property-tpl' class='name expandable'>tpl</a> : String<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>'&lt;div class=&quot;gnt-scalecolumn-wrap&quot; style=&quot;height:{scaleHeight}px;&quot;&gt;' + '&lt;tpl for=&quot;scalePoints&quot;&gt;' + '&lt;tpl if=&quot;label !== \\'\\'&quot;&gt;' + '&lt;span class=&quot;gnt-scalecolumn-label-line {cls}&quot; style=&quot;bottom:{bottom}px&quot;&gt;&lt;span class=&quot;gnt-scalecolumn-label&quot;&gt;{label}&lt;/span&gt;&lt;/span&gt;' + '&lt;tpl else&gt;' + '&lt;span class=&quot;gnt-scalecolumn-line {cls}&quot; style=&quot;bottom:{bottom}px&quot;&gt;&lt;/span&gt;' + '&lt;/tpl&gt;' + '&lt;/tpl&gt;' + '&lt;/div&gt;'</code></p></div></div></div><div id='property-width' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.Scale'>Gnt.column.Scale</span><br/><a href='source/Scale.html#Gnt-column-Scale-property-width' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.Scale-property-width' class='name expandable'>width</a> : Number<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>40</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-buildScalePoints' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.Scale'>Gnt.column.Scale</span><br/><a href='source/Scale.html#Gnt-column-Scale-method-buildScalePoints' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.Scale-method-buildScalePoints' class='name expandable'>buildScalePoints</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-defaultRenderer' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.Scale'>Gnt.column.Scale</span><br/><a href='source/Scale.html#Gnt-column-Scale-method-defaultRenderer' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.Scale-method-defaultRenderer' class='name expandable'>defaultRenderer</a>( <span class='pre'>value, meta, record</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>value</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>meta</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>record</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-initComponent' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.Scale'>Gnt.column.Scale</span><br/><a href='source/Scale.html#Gnt-column-Scale-method-initComponent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.Scale-method-initComponent' class='name expandable'>initComponent</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-onAdded' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.Scale'>Gnt.column.Scale</span><br/><a href='source/Scale.html#Gnt-column-Scale-method-onAdded' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.Scale-method-onAdded' class='name expandable'>onAdded</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-setAvailableHeight' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.Scale'>Gnt.column.Scale</span><br/><a href='source/Scale.html#Gnt-column-Scale-method-setAvailableHeight' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.Scale-method-setAvailableHeight' class='name expandable'>setAvailableHeight</a>( <span class='pre'>height, initial</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>height</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>initial</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-updateScalePoints' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.column.Scale'>Gnt.column.Scale</span><br/><a href='source/Scale.html#Gnt-column-Scale-method-updateScalePoints' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.column.Scale-method-updateScalePoints' class='name expandable'>updateScalePoints</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div></div></div></div></div>","meta":{}});