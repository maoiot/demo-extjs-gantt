Ext.data.JsonP.Gnt_model_Calendar({"tagname":"class","name":"Gnt.model.Calendar","autodetected":{"aliases":true,"alternateClassNames":true,"mixins":true,"requires":true,"uses":true,"members":true,"code_type":true},"files":[{"filename":"Calendar.js","href":"Calendar5.html#Gnt-model-Calendar"}],"extends":"Sch.model.Customizable","aliases":{},"alternateClassNames":[],"mixins":[],"requires":["Ext.data.NodeInterface"],"uses":[],"members":[{"name":"calendarClassField","tagname":"cfg","owner":"Gnt.model.Calendar","id":"cfg-calendarClassField","meta":{}},{"name":"customizableFields","tagname":"cfg","owner":"Gnt.model.Calendar","id":"cfg-customizableFields","meta":{}},{"name":"daysField","tagname":"cfg","owner":"Gnt.model.Calendar","id":"cfg-daysField","meta":{}},{"name":"daysPerMonthField","tagname":"cfg","owner":"Gnt.model.Calendar","id":"cfg-daysPerMonthField","meta":{}},{"name":"daysPerWeekField","tagname":"cfg","owner":"Gnt.model.Calendar","id":"cfg-daysPerWeekField","meta":{}},{"name":"defaultAvailabilityField","tagname":"cfg","owner":"Gnt.model.Calendar","id":"cfg-defaultAvailabilityField","meta":{}},{"name":"hoursPerDayField","tagname":"cfg","owner":"Gnt.model.Calendar","id":"cfg-hoursPerDayField","meta":{}},{"name":"nameField","tagname":"cfg","owner":"Gnt.model.Calendar","id":"cfg-nameField","meta":{}},{"name":"phantomIdField","tagname":"cfg","owner":"Gnt.model.Calendar","id":"cfg-phantomIdField","meta":{}},{"name":"phantomParentIdField","tagname":"cfg","owner":"Gnt.model.Calendar","id":"cfg-phantomParentIdField","meta":{}},{"name":"weekendFirstDayField","tagname":"cfg","owner":"Gnt.model.Calendar","id":"cfg-weekendFirstDayField","meta":{}},{"name":"weekendSecondDayField","tagname":"cfg","owner":"Gnt.model.Calendar","id":"cfg-weekendSecondDayField","meta":{}},{"name":"weekendsAreWorkdaysField","tagname":"cfg","owner":"Gnt.model.Calendar","id":"cfg-weekendsAreWorkdaysField","meta":{}},{"name":"calendar","tagname":"property","owner":"Gnt.model.Calendar","id":"property-calendar","meta":{"private":true}},{"name":"idProperty","tagname":"property","owner":"Gnt.model.Calendar","id":"property-idProperty","meta":{"private":true}},{"name":"constructor","tagname":"method","owner":"Gnt.model.Calendar","id":"method-constructor","meta":{}},{"name":"fillDataFromPrototype","tagname":"method","owner":"Gnt.model.Calendar","id":"method-fillDataFromPrototype","meta":{"private":true}},{"name":"get","tagname":"method","owner":"Gnt.model.Calendar","id":"method-get","meta":{"private":true}},{"name":"getCalendar","tagname":"method","owner":"Gnt.model.Calendar","id":"method-getCalendar","meta":{}},{"name":"getCalendarConfig","tagname":"method","owner":"Gnt.model.Calendar","id":"method-getCalendarConfig","meta":{"private":true}},{"name":"getCalendarManager","tagname":"method","owner":"Gnt.model.Calendar","id":"method-getCalendarManager","meta":{"private":true}},{"name":"getModelConfig","tagname":"method","owner":"Gnt.model.Calendar","id":"method-getModelConfig","meta":{"private":true}},{"name":"getParentCalendarClass","tagname":"method","owner":"Gnt.model.Calendar","id":"method-getParentCalendarClass","meta":{"private":true}},{"name":"prepareCalendarNode","tagname":"method","owner":"Gnt.model.Calendar","id":"method-prepareCalendarNode","meta":{"private":true}},{"name":"set","tagname":"method","owner":"Gnt.model.Calendar","id":"method-set","meta":{"private":true}},{"name":"setCalendar","tagname":"method","owner":"Gnt.model.Calendar","id":"method-setCalendar","meta":{"private":true}},{"name":"setCalendarManager","tagname":"method","owner":"Gnt.model.Calendar","id":"method-setCalendarManager","meta":{"private":true}}],"code_type":"ext_define","id":"class-Gnt.model.Calendar","short_doc":"A model representing a single calendar. ...","component":false,"superclasses":["Ext.data.Model","Sch.model.Customizable"],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Ext.data.Model<div class='subclass '><a href='#!/api/Sch.model.Customizable' rel='Sch.model.Customizable' class='docClass'>Sch.model.Customizable</a><div class='subclass '><strong>Gnt.model.Calendar</strong></div></div></div><h4>Requires</h4><div class='dependency'>Ext.data.NodeInterface</div><h4>Files</h4><div class='dependency'><a href='source/Calendar5.html#Gnt-model-Calendar' target='_blank'>Calendar.js</a></div></pre><div class='doc-contents'><p>A model representing a single calendar.\nEvery model instance will be also decorated with the <a href=\"#!/api/Gnt.data.Calendar\" rel=\"Gnt.data.Calendar\" class=\"docClass\">Gnt.data.Calendar</a> instance, created based on the model field values.\nThe fields of the model correspond to the properties of <a href=\"#!/api/Gnt.data.Calendar\" rel=\"Gnt.data.Calendar\" class=\"docClass\">Gnt.data.Calendar</a> class.</p>\n\n<h2>Fields</h2>\n\n<ul>\n<li><code>Id</code> - record identifier (corresponds to <a href=\"#!/api/Gnt.data.Calendar-cfg-calendarId\" rel=\"Gnt.data.Calendar-cfg-calendarId\" class=\"docClass\">Gnt.data.Calendar.calendarId</a>)</li>\n<li><code>Name</code> - corresponds to <a href=\"#!/api/Gnt.data.Calendar-cfg-name\" rel=\"Gnt.data.Calendar-cfg-name\" class=\"docClass\">Gnt.data.Calendar.name</a></li>\n<li><code>DaysPerMonth</code> - corresponds to <a href=\"#!/api/Gnt.data.Calendar-cfg-daysPerMonth\" rel=\"Gnt.data.Calendar-cfg-daysPerMonth\" class=\"docClass\">Gnt.data.Calendar.daysPerMonth</a></li>\n<li><code>DaysPerWeek</code> - corresponds to <a href=\"#!/api/Gnt.data.Calendar-cfg-daysPerWeek\" rel=\"Gnt.data.Calendar-cfg-daysPerWeek\" class=\"docClass\">Gnt.data.Calendar.daysPerWeek</a></li>\n<li><code>HoursPerDay</code> - corresponds to <a href=\"#!/api/Gnt.data.Calendar-cfg-hoursPerDay\" rel=\"Gnt.data.Calendar-cfg-hoursPerDay\" class=\"docClass\">Gnt.data.Calendar.hoursPerDay</a></li>\n<li><code>WeekendsAreWorkdays</code> - corresponds to <a href=\"#!/api/Gnt.data.Calendar-cfg-weekendsAreWorkdays\" rel=\"Gnt.data.Calendar-cfg-weekendsAreWorkdays\" class=\"docClass\">Gnt.data.Calendar.weekendsAreWorkdays</a></li>\n<li><code>WeekendFirstDay</code> - corresponds to <a href=\"#!/api/Gnt.data.Calendar-cfg-weekendFirstDay\" rel=\"Gnt.data.Calendar-cfg-weekendFirstDay\" class=\"docClass\">Gnt.data.Calendar.weekendFirstDay</a></li>\n<li><code>WeekendSecondDay</code> - corresponds to <a href=\"#!/api/Gnt.data.Calendar-cfg-weekendSecondDay\" rel=\"Gnt.data.Calendar-cfg-weekendSecondDay\" class=\"docClass\">Gnt.data.Calendar.weekendSecondDay</a></li>\n<li><code>DefaultAvailability</code> - corresponds to <a href=\"#!/api/Gnt.data.Calendar-cfg-defaultAvailability\" rel=\"Gnt.data.Calendar-cfg-defaultAvailability\" class=\"docClass\">Gnt.data.Calendar.defaultAvailability</a></li>\n<li><code>Days</code> - stores reference to the <a href=\"#!/api/Gnt.data.Calendar\" rel=\"Gnt.data.Calendar\" class=\"docClass\">Gnt.data.Calendar</a> instance</li>\n<li><code>CalendarClass</code> - calendar class that should be used to create <a href=\"#!/api/Gnt.data.Calendar\" rel=\"Gnt.data.Calendar\" class=\"docClass\">Gnt.data.Calendar</a> instance</li>\n<li><code>PhantomId</code> - phantom record identifier</li>\n<li><code>PhantomParentId</code> - phantom parent record identifier</li>\n</ul>\n\n\n<p>A collection of this models is supposed to be provided for the <a href=\"#!/api/Gnt.data.CalendarManager\" rel=\"Gnt.data.CalendarManager\" class=\"docClass\">calendar manager</a>.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div id='cfg-calendarClassField' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.model.Calendar'>Gnt.model.Calendar</span><br/><a href='source/Calendar5.html#Gnt-model-Calendar-cfg-calendarClassField' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.model.Calendar-cfg-calendarClassField' class='name expandable'>calendarClassField</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'>The name of the fields specifying the class that should be used to\nto create the calendar instance ...</div><div class='long'><p>The name of the fields specifying the class that should be used to\nto create <a href=\"#!/api/Gnt.data.Calendar\" rel=\"Gnt.data.Calendar\" class=\"docClass\">the calendar</a> instance</p>\n<p>Defaults to: <code>'CalendarClass'</code></p></div></div></div><div id='cfg-customizableFields' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.model.Calendar'>Gnt.model.Calendar</span><br/><a href='source/Calendar5.html#Gnt-model-Calendar-cfg-customizableFields' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.model.Calendar-cfg-customizableFields' class='name expandable'>customizableFields</a> : Array<span class=\"signature\"></span></div><div class='description'><div class='short'>The array of customizale fields definitions. ...</div><div class='long'><p>The array of customizale fields definitions.</p>\n<p>Defaults to: <code>[{name: 'Name'}, {name: 'DaysPerMonth', type: 'number'}, {name: 'DaysPerWeek', type: 'number'}, {name: 'HoursPerDay', type: 'number'}, {name: 'WeekendsAreWorkdays', type: 'boolean'}, {name: 'WeekendFirstDay', type: 'integer'}, {name: 'WeekendSecondDay', type: 'integer'}, {name: 'DefaultAvailability'}, {name: 'Days'}, {name: 'CalendarClass', defaultValue: 'Gnt.data.Calendar'}, {name: 'PhantomId'}, {name: 'PhantomParentId'}]</code></p><p>Overrides: <a href=\"#!/api/Sch.model.Customizable-cfg-customizableFields\" rel=\"Sch.model.Customizable-cfg-customizableFields\" class=\"docClass\">Sch.model.Customizable.customizableFields</a></p></div></div></div><div id='cfg-daysField' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.model.Calendar'>Gnt.model.Calendar</span><br/><a href='source/Calendar5.html#Gnt-model-Calendar-cfg-daysField' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.model.Calendar-cfg-daysField' class='name expandable'>daysField</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'>The name of the fields specifying the calendar content (Gnt.data.Calendar instance) ...</div><div class='long'><p>The name of the fields specifying the calendar content (<a href=\"#!/api/Gnt.data.Calendar\" rel=\"Gnt.data.Calendar\" class=\"docClass\">Gnt.data.Calendar</a> instance)</p>\n<p>Defaults to: <code>'Days'</code></p></div></div></div><div id='cfg-daysPerMonthField' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.model.Calendar'>Gnt.model.Calendar</span><br/><a href='source/Calendar5.html#Gnt-model-Calendar-cfg-daysPerMonthField' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.model.Calendar-cfg-daysPerMonthField' class='name expandable'>daysPerMonthField</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'>The name of the field specifying the number of days per month\n(used when converting the big duration units like month...</div><div class='long'><p>The name of the field specifying the number of days per month\n(used when converting the big duration units like month/year to days).</p>\n<p>Defaults to: <code>'DaysPerMonth'</code></p></div></div></div><div id='cfg-daysPerWeekField' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.model.Calendar'>Gnt.model.Calendar</span><br/><a href='source/Calendar5.html#Gnt-model-Calendar-cfg-daysPerWeekField' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.model.Calendar-cfg-daysPerWeekField' class='name expandable'>daysPerWeekField</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'>The name of the field specifying the number of days per week\n(used when converting the duration only). ...</div><div class='long'><p>The name of the field specifying the number of days per week\n(used when converting the duration only).</p>\n<p>Defaults to: <code>'DaysPerWeek'</code></p></div></div></div><div id='cfg-defaultAvailabilityField' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.model.Calendar'>Gnt.model.Calendar</span><br/><a href='source/Calendar5.html#Gnt-model-Calendar-cfg-defaultAvailabilityField' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.model.Calendar-cfg-defaultAvailabilityField' class='name expandable'>defaultAvailabilityField</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'>The name of the fields specifying the calendar default availability ...</div><div class='long'><p>The name of the fields specifying the calendar default availability</p>\n<p>Defaults to: <code>'DefaultAvailability'</code></p></div></div></div><div id='cfg-hoursPerDayField' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.model.Calendar'>Gnt.model.Calendar</span><br/><a href='source/Calendar5.html#Gnt-model-Calendar-cfg-hoursPerDayField' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.model.Calendar-cfg-hoursPerDayField' class='name expandable'>hoursPerDayField</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'>The name of the field specifying the number of hours per day\n(used when converting the duration only). ...</div><div class='long'><p>The name of the field specifying the number of hours per day\n(used when converting the duration only).</p>\n<p>Defaults to: <code>'HoursPerDay'</code></p></div></div></div><div id='cfg-nameField' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.model.Calendar'>Gnt.model.Calendar</span><br/><a href='source/Calendar5.html#Gnt-model-Calendar-cfg-nameField' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.model.Calendar-cfg-nameField' class='name expandable'>nameField</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'>The name of the field specifying the calendar name. ...</div><div class='long'><p>The name of the field specifying the calendar name.</p>\n<p>Defaults to: <code>'Name'</code></p></div></div></div><div id='cfg-phantomIdField' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.model.Calendar'>Gnt.model.Calendar</span><br/><a href='source/Calendar5.html#Gnt-model-Calendar-cfg-phantomIdField' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.model.Calendar-cfg-phantomIdField' class='name expandable'>phantomIdField</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'>The name of the field specifying the phantom id when this record is being 'realized' by the server. ...</div><div class='long'><p>The name of the field specifying the phantom id when this record is being 'realized' by the server.</p>\n<p>Defaults to: <code>'PhantomId'</code></p></div></div></div><div id='cfg-phantomParentIdField' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.model.Calendar'>Gnt.model.Calendar</span><br/><a href='source/Calendar5.html#Gnt-model-Calendar-cfg-phantomParentIdField' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.model.Calendar-cfg-phantomParentIdField' class='name expandable'>phantomParentIdField</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'>The name of the field specifying the parent calendar phantom id when this record is being 'realized' by the server. ...</div><div class='long'><p>The name of the field specifying the parent calendar phantom id when this record is being 'realized' by the server.</p>\n<p>Defaults to: <code>'PhantomParentId'</code></p></div></div></div><div id='cfg-weekendFirstDayField' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.model.Calendar'>Gnt.model.Calendar</span><br/><a href='source/Calendar5.html#Gnt-model-Calendar-cfg-weekendFirstDayField' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.model.Calendar-cfg-weekendFirstDayField' class='name expandable'>weekendFirstDayField</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'>The name of the field specifying the index of the first day in weekend. ...</div><div class='long'><p>The name of the field specifying the index of the first day in weekend.</p>\n<p>Defaults to: <code>'WeekendFirstDay'</code></p></div></div></div><div id='cfg-weekendSecondDayField' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.model.Calendar'>Gnt.model.Calendar</span><br/><a href='source/Calendar5.html#Gnt-model-Calendar-cfg-weekendSecondDayField' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.model.Calendar-cfg-weekendSecondDayField' class='name expandable'>weekendSecondDayField</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'>The name of the field specifying the index of the second day in weekend. ...</div><div class='long'><p>The name of the field specifying the index of the second day in weekend.</p>\n<p>Defaults to: <code>'WeekendSecondDay'</code></p></div></div></div><div id='cfg-weekendsAreWorkdaysField' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.model.Calendar'>Gnt.model.Calendar</span><br/><a href='source/Calendar5.html#Gnt-model-Calendar-cfg-weekendsAreWorkdaysField' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.model.Calendar-cfg-weekendsAreWorkdaysField' class='name expandable'>weekendsAreWorkdaysField</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'>The name of the field specifying if all weekdays are working. ...</div><div class='long'><p>The name of the field specifying if all weekdays are working.</p>\n<p>Defaults to: <code>'WeekendsAreWorkdays'</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-calendar' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.model.Calendar'>Gnt.model.Calendar</span><br/><a href='source/Calendar5.html#Gnt-model-Calendar-property-calendar' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.model.Calendar-property-calendar' class='name expandable'>calendar</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div><div id='property-idProperty' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.model.Calendar'>Gnt.model.Calendar</span><br/><a href='source/Calendar5.html#Gnt-model-Calendar-property-idProperty' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.model.Calendar-property-idProperty' class='name expandable'>idProperty</a> : String<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>'Id'</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.model.Calendar'>Gnt.model.Calendar</span><br/><a href='source/Calendar5.html#Gnt-model-Calendar-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/Gnt.model.Calendar-method-constructor' class='name expandable'>Gnt.model.Calendar</a>( <span class='pre'>config, id, node</span> ) : <a href=\"#!/api/Gnt.model.Calendar\" rel=\"Gnt.model.Calendar\" class=\"docClass\">Gnt.model.Calendar</a><span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>id</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>node</span> : Object<div class='sub-desc'></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Gnt.model.Calendar\" rel=\"Gnt.model.Calendar\" class=\"docClass\">Gnt.model.Calendar</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-fillDataFromPrototype' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.model.Calendar'>Gnt.model.Calendar</span><br/><a href='source/Calendar5.html#Gnt-model-Calendar-method-fillDataFromPrototype' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.model.Calendar-method-fillDataFromPrototype' class='name expandable'>fillDataFromPrototype</a>( <span class='pre'>nodeData</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>nodeData</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-get' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.model.Calendar'>Gnt.model.Calendar</span><br/><a href='source/Calendar5.html#Gnt-model-Calendar-method-get' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.model.Calendar-method-get' class='name expandable'>get</a>( <span class='pre'>field</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>field</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-getCalendar' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.model.Calendar'>Gnt.model.Calendar</span><br/><a href='source/Calendar5.html#Gnt-model-Calendar-method-getCalendar' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.model.Calendar-method-getCalendar' class='name expandable'>getCalendar</a>( <span class='pre'></span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Gets a calendar assigned to the record. ...</div><div class='long'><p>Gets a calendar assigned to the record.</p>\n</div></div></div><div id='method-getCalendarConfig' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.model.Calendar'>Gnt.model.Calendar</span><br/><a href='source/Calendar5.html#Gnt-model-Calendar-method-getCalendarConfig' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.model.Calendar-method-getCalendarConfig' class='name expandable'>getCalendarConfig</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-getCalendarManager' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.model.Calendar'>Gnt.model.Calendar</span><br/><a href='source/Calendar5.html#Gnt-model-Calendar-method-getCalendarManager' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.model.Calendar-method-getCalendarManager' class='name expandable'>getCalendarManager</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-getModelConfig' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.model.Calendar'>Gnt.model.Calendar</span><br/><a href='source/Calendar5.html#Gnt-model-Calendar-method-getModelConfig' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.model.Calendar-method-getModelConfig' class='name expandable'>getModelConfig</a>( <span class='pre'>calendar, isPrototype</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>calendar</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>isPrototype</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-getParentCalendarClass' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.model.Calendar'>Gnt.model.Calendar</span><br/><a href='source/Calendar5.html#Gnt-model-Calendar-method-getParentCalendarClass' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.model.Calendar-method-getParentCalendarClass' class='name expandable'>getParentCalendarClass</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-prepareCalendarNode' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.model.Calendar'>Gnt.model.Calendar</span><br/><a href='source/Calendar5.html#Gnt-model-Calendar-method-prepareCalendarNode' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.model.Calendar-method-prepareCalendarNode' class='name expandable'>prepareCalendarNode</a>( <span class='pre'>node</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>node</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-set' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.model.Calendar'>Gnt.model.Calendar</span><br/><a href='source/Calendar5.html#Gnt-model-Calendar-method-set' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.model.Calendar-method-set' class='name expandable'>set</a>( <span class='pre'>field, value</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>field</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>value</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-setCalendar' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.model.Calendar'>Gnt.model.Calendar</span><br/><a href='source/Calendar5.html#Gnt-model-Calendar-method-setCalendar' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.model.Calendar-method-setCalendar' class='name expandable'>setCalendar</a>( <span class='pre'>calendar</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>Assign a calendar to the record. ...</div><div class='long'><p>Assign a calendar to the record.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>calendar</span> : <a href=\"#!/api/Gnt.data.Calendar\" rel=\"Gnt.data.Calendar\" class=\"docClass\">Gnt.data.Calendar</a><div class='sub-desc'><p>The calendar to assign.</p>\n</div></li></ul></div></div></div><div id='method-setCalendarManager' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Gnt.model.Calendar'>Gnt.model.Calendar</span><br/><a href='source/Calendar5.html#Gnt-model-Calendar-method-setCalendarManager' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Gnt.model.Calendar-method-setCalendarManager' class='name expandable'>setCalendarManager</a>( <span class='pre'>calendarManager</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>calendarManager</span> : Object<div class='sub-desc'></div></li></ul></div></div></div></div></div></div></div>","meta":{}});