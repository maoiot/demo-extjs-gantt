Ext.data.JsonP.gantt_crud_manager({"guide":"<h1 id='gantt_crud_manager-section-using-crud-manager-with-ext-gantt'>Using CRUD manager with Ext Gantt</h1>\n<div class='toc'>\n<p><strong>Contents</strong></p>\n<ol>\n<li><a href='#!/guide/gantt_crud_manager-section-introduction'>Introduction</a></li>\n<li><a href='#!/guide/gantt_crud_manager-section-benefits-of-using-the-crud-manager'>Benefits of using the CRUD manager</a></li>\n<li><a href='#!/guide/gantt_crud_manager-section-stores'>Stores</a></li>\n<li><a href='#!/guide/gantt_crud_manager-section-implementation'>Implementation</a></li>\n<li><a href='#!/guide/gantt_crud_manager-section-calendars'>Calendars</a></li>\n<li><a href='#!/guide/gantt_crud_manager-section-error-handling'>Error handling</a></li>\n<li><a href='#!/guide/gantt_crud_manager-section-writing-own-server-side-implementation.'>Writing own server-side implementation.</a></li>\n</ol>\n</div>\n\n<h2 id='gantt_crud_manager-section-introduction'>Introduction</h2>\n\n<p>This guide describes how to use the CRUD manager with Ext Gantt.\nIt contains only Gantt specific details. For general information on CRUD manager implementation and architecture\nsee <a href=\"#!/guide/crud_manager\">this guide</a>.</p>\n\n<p>The class implementing <em>CRUD manager</em> for Ext Gantt is called <a href=\"#!/api/Gnt.data.CrudManager\" rel=\"Gnt.data.CrudManager\" class=\"docClass\">Gnt.data.CrudManager</a>.\nIt uses <a href=\"#!/api/Sch.crud.transport.Ajax\" rel=\"Sch.crud.transport.Ajax\" class=\"docClass\">AJAX</a> as transport system and <a href=\"#!/api/Sch.crud.encoder.Json\" rel=\"Sch.crud.encoder.Json\" class=\"docClass\">JSON</a> as encoding format.</p>\n\n<h2 id='gantt_crud_manager-section-benefits-of-using-the-crud-manager'>Benefits of using the CRUD manager</h2>\n\n<p>In previous versions of the Ext Gantt, you had to load and save data using the standard Ext JS data package. This would involve\nsetting proxies on data stores and handling load and save on each such store. This approach worked, but had a few drawbacks:</p>\n\n<ul>\n<li>To load data into the Gantt, you had to deal with each store separately. In the worst case, this could mean about 4-5 ajax requests to load the Gantt chart (Tasks, Dependencies, Resources, Assignments, Calendars) depending on which features you used.</li>\n<li>Hard to use database transactions on the server side.</li>\n</ul>\n\n\n<p>For performance reasons, obvisously we'd like the loading process to use a single request that returns the data to be consumed by all the stores used in the Gantt chart.\nThis is now easy to achieve since the CM loads the data in one request. When it comes to saving changes, you normally want to have an\n \"all-or-nothing\" transaction-based approach to persisting updates in your database. This is not feasible if you're using two separate ajax requests.</p>\n\n<h2 id='gantt_crud_manager-section-stores'>Stores</h2>\n\n<p>There are a number of different data entities used in Ext Gantt: calendars, resources, assignments, dependencies and tasks.\nTo register them with a <a href=\"#!/api/Gnt.data.CrudManager\" rel=\"Gnt.data.CrudManager\" class=\"docClass\">Gnt.data.CrudManager</a> instance, the following configs should be used respectively:\n<a href=\"#!/api/Gnt.data.CrudManager-cfg-calendarManager\" rel=\"Gnt.data.CrudManager-cfg-calendarManager\" class=\"docClass\">calendarManager</a>, <a href=\"#!/api/Gnt.data.CrudManager-cfg-resourceStore\" rel=\"Gnt.data.CrudManager-cfg-resourceStore\" class=\"docClass\">resourceStore</a>,\n<a href=\"#!/api/Gnt.data.CrudManager-cfg-assignmentStore\" rel=\"Gnt.data.CrudManager-cfg-assignmentStore\" class=\"docClass\">assignmentStore</a>, <a href=\"#!/api/Gnt.data.CrudManager-cfg-dependencyStore\" rel=\"Gnt.data.CrudManager-cfg-dependencyStore\" class=\"docClass\">dependencyStore</a>,\n<a href=\"#!/api/Gnt.data.CrudManager-cfg-taskStore\" rel=\"Gnt.data.CrudManager-cfg-taskStore\" class=\"docClass\">taskStore</a>.</p>\n\n<p>Here's a how a basic configuration would look:</p>\n\n<pre><code>var crudManager = new <a href=\"#!/api/Gnt.data.CrudManager\" rel=\"Gnt.data.CrudManager\" class=\"docClass\">Gnt.data.CrudManager</a>({\n    autoLoad        : true,\n    calendarManager : calendarManager,\n    resourceStore   : resourceStore,\n    dependencyStore : dependencyStore,\n    assignmentStore : assignmentStore\n    taskStore       : taskStore,\n    transport       : {\n        load    : {\n            url     : 'php/read.php'\n        },\n        sync    : {\n            url     : 'php/save.php'\n        }\n    }\n});\n</code></pre>\n\n<p>The backend, in this case the \"read.php\" should return a JSON similar to the one seen below:</p>\n\n<pre><code>{\n    \"success\"      : true,\n\n    \"dependencies\" : {\n        \"rows\" : [\n            {\"Id\" : 1, \"From\" : 11, \"To\" : 17, \"Type\" : 2, \"Lag\" : 0, \"Cls\" : \"\", \"LagUnit\" : \"d\"},\n            {\"Id\" : 2, \"From\" : 12, \"To\" : 17, \"Type\" : 2, \"Lag\" : 0, \"Cls\" : \"\", \"LagUnit\" : \"d\"},\n            {\"Id\" : 3, \"From\" : 13, \"To\" : 17, \"Type\" : 2, \"Lag\" : 0, \"Cls\" : \"\", \"LagUnit\" : \"d\"}\n        ]\n    },\n\n    \"assignments\" : {\n        \"rows\" : [\n            {\n                \"Id\"         : 1,\n                \"TaskId\"     : 11,\n                \"ResourceId\" : 1,\n                \"Units\"      : 100\n            },\n            {\n                \"Id\"         : 2,\n                \"TaskId\"     : 11,\n                \"ResourceId\" : 2,\n                \"Units\"      : 80\n            }\n        ]\n    },\n\n    \"resources\" : {\n        \"rows\" : [\n            {\"Id\" : 1, \"Name\" : \"Mats\" },\n            {\"Id\" : 2, \"Name\" : \"Nickolay\" },\n            {\"Id\" : 3, \"Name\" : \"Goran\" }\n        ]\n    },\n\n    \"tasks\" : {\n        \"rows\" : [\n            {\n                \"BaselineEndDate\"   : \"2010-01-28\",\n                \"Id\"                : 11,\n                \"leaf\"              : true,\n                \"Name\"              : \"Investigate\",\n                \"PercentDone\"       : 50,\n                \"TaskType\"          : \"LowPrio\",\n                \"StartDate\"         : \"2010-01-18\",\n                \"BaselineStartDate\" : \"2010-01-20\",\n                \"Segments\"          : [\n                    {\n                        \"Id\"                : 1,\n                        \"StartDate\"         : \"2010-01-18\",\n                        \"Duration\"          : 1\n                    },\n                    {\n                        \"Id\"                : 2,\n                        \"StartDate\"         : \"2010-01-20\",\n                        \"Duration\"          : 2\n                    },\n                    {\n                        \"Id\"                : 3,\n                        \"StartDate\"         : \"2010-01-25\",\n                        \"Duration\"          : 5\n                    }\n                ]\n            },\n            {\n                \"BaselineEndDate\"   : \"2010-02-01\",\n                \"Id\"                : 12,\n                \"leaf\"              : true,\n                \"Name\"              : \"Assign resources\",\n                \"PercentDone\"       : 50,\n                \"StartDate\"         : \"2010-01-18\",\n                \"BaselineStartDate\" : \"2010-01-25\",\n                \"Duration\"          : 10\n            },\n            {\n                \"BaselineEndDate\"   : \"2010-02-01\",\n                \"Id\"                : 13,\n                \"leaf\"              : true,\n                \"Name\"              : \"Gather documents (not resizable)\",\n                \"Resizable\"         : false,\n                \"PercentDone\"       : 50,\n                \"StartDate\"         : \"2010-01-18\",\n                \"BaselineStartDate\" : \"2010-01-25\",\n                \"Duration\"          : 10\n            },\n            {\n                \"BaselineEndDate\"   : \"2010-02-04\",\n                \"Id\"                : 17,\n                \"leaf\"              : true,\n                \"Name\"              : \"Report to management\",\n                \"PercentDone\"       : 0,\n                \"StartDate\"         : \"2010-01-30\",\n                \"BaselineStartDate\" : \"2010-01-29\",\n                \"Duration\"          : 0\n            }\n        ]\n    }\n}\n</code></pre>\n\n<p>You should not specify <a href=\"#!/api/Gnt.data.CrudManager-cfg-calendarManager\" rel=\"Gnt.data.CrudManager-cfg-calendarManager\" class=\"docClass\">calendarManager</a>, <a href=\"#!/api/Gnt.data.CrudManager-cfg-resourceStore\" rel=\"Gnt.data.CrudManager-cfg-resourceStore\" class=\"docClass\">resourceStore</a>,\n<a href=\"#!/api/Gnt.data.CrudManager-cfg-dependencyStore\" rel=\"Gnt.data.CrudManager-cfg-dependencyStore\" class=\"docClass\">dependencyStore</a> and <a href=\"#!/api/Gnt.data.CrudManager-cfg-assignmentStore\" rel=\"Gnt.data.CrudManager-cfg-assignmentStore\" class=\"docClass\">assignmentStore</a>\nconfigs if they were already specified for the task store instance. In this case, the CRUD manager will just take them from the provided task store instance:</p>\n\n<pre><code>var taskStore = new <a href=\"#!/api/Gnt.data.TaskStore\" rel=\"Gnt.data.TaskStore\" class=\"docClass\">Gnt.data.TaskStore</a>({\n    calendarManager : calendarManager,\n    resourceStore   : resourceStore,\n    dependencyStore : dependencyStore,\n    assignmentStore : assignmentStore\n});\n\nvar crudManager = new <a href=\"#!/api/Gnt.data.CrudManager\" rel=\"Gnt.data.CrudManager\" class=\"docClass\">Gnt.data.CrudManager</a>({\n    // Specifying TaskStore only\n    taskStore       : taskStore,\n    transport       : {\n        load    : {\n            url     : 'php/read.php'\n        },\n        sync    : {\n            url     : 'php/save.php'\n        }\n    }\n});\n</code></pre>\n\n<p>You can provide any number of additional stores using the <a href=\"#!/api/Gnt.data.CrudManager-property-stores\" rel=\"Gnt.data.CrudManager-property-stores\" class=\"docClass\">stores</a> config:</p>\n\n<pre><code>var crudManager = new <a href=\"#!/api/Gnt.data.CrudManager\" rel=\"Gnt.data.CrudManager\" class=\"docClass\">Gnt.data.CrudManager</a>({\n    taskStore       : taskStore,\n    stores          : [ store1, store2, store3 ],\n    transport       : {\n        load    : {\n            url     : 'php/read.php'\n        },\n        sync    : {\n            url     : 'php/save.php'\n        }\n    }\n});\n</code></pre>\n\n<p>Or add them programmatically using the <a href=\"#!/api/Gnt.data.CrudManager-method-addStore\" rel=\"Gnt.data.CrudManager-method-addStore\" class=\"docClass\">addStore</a> method:</p>\n\n<pre><code>crudManager.addStore([ store2, store3 ]);\n</code></pre>\n\n<h2 id='gantt_crud_manager-section-implementation'>Implementation</h2>\n\n<p>Here is how a CRUD manager can be created:</p>\n\n<pre><code>var crudManager = new <a href=\"#!/api/Gnt.data.CrudManager\" rel=\"Gnt.data.CrudManager\" class=\"docClass\">Gnt.data.CrudManager</a>({\n    autoLoad        : true,\n    taskStore       : taskStore,\n    transport       : {\n        load    : {\n            url     : 'php/read.php'\n        },\n        sync    : {\n            url     : 'php/save.php'\n        }\n    }\n});\n</code></pre>\n\n<p>In above example data, the load operation will start automatically since the CM is configured with the <a href=\"#!/api/Gnt.data.CrudManager-cfg-autoLoad\" rel=\"Gnt.data.CrudManager-cfg-autoLoad\" class=\"docClass\">autoLoad</a> option set to <code>true</code>.\nThere is also a <a href=\"#!/api/Gnt.data.CrudManager-method-load\" rel=\"Gnt.data.CrudManager-method-load\" class=\"docClass\">load</a> method to invoke loading manually:</p>\n\n<pre><code>crudManager.load(function (response) {\n    alert('Data loaded...');\n})\n</code></pre>\n\n<p>To persist changes automatically, there is an <a href=\"#!/api/Gnt.data.CrudManager-cfg-autoSync\" rel=\"Gnt.data.CrudManager-cfg-autoSync\" class=\"docClass\">autoSync</a> option,\nand you can of course also call the <a href=\"#!/api/Gnt.data.CrudManager-method-sync\" rel=\"Gnt.data.CrudManager-method-sync\" class=\"docClass\">sync</a> method manually if needed:</p>\n\n<pre><code>crudManager.sync(function (response) {\n    alert('Changes saved...');\n});\n</code></pre>\n\n<p>Any <a href=\"#!/api/Gnt.panel.Gantt\" rel=\"Gnt.panel.Gantt\" class=\"docClass\">Gnt.panel.Gantt</a> instances can be configured to use a <em>CRUD manager</em> by providing the <a href=\"#!/api/Gnt.panel.Gantt-cfg-crudManager\" rel=\"Gnt.panel.Gantt-cfg-crudManager\" class=\"docClass\">crudManager</a> config.\nIn this case you don't need to specify <a href=\"#!/api/Gnt.panel.Gantt-cfg-taskStore\" rel=\"Gnt.panel.Gantt-cfg-taskStore\" class=\"docClass\">taskStore</a>, <a href=\"#!/api/Gnt.panel.Gantt-cfg-dependencyStore\" rel=\"Gnt.panel.Gantt-cfg-dependencyStore\" class=\"docClass\">dependencyStore</a>,\n<a href=\"#!/api/Gnt.panel.Gantt-cfg-resourceStore\" rel=\"Gnt.panel.Gantt-cfg-resourceStore\" class=\"docClass\">resourceStore</a>, <a href=\"#!/api/Gnt.panel.Gantt-cfg-assignmentStore\" rel=\"Gnt.panel.Gantt-cfg-assignmentStore\" class=\"docClass\">assignmentStore</a>\non the Gantt panel. They will be taken from provided <a href=\"#!/api/Gnt.panel.Gantt-cfg-crudManager\" rel=\"Gnt.panel.Gantt-cfg-crudManager\" class=\"docClass\">crudManager</a> instance.</p>\n\n<pre><code>new <a href=\"#!/api/Gnt.panel.Gantt\" rel=\"Gnt.panel.Gantt\" class=\"docClass\">Gnt.panel.Gantt</a>({\n    viewPreset          : 'dayAndWeek',\n    startDate           : new Date(2014, 0, 1),\n    endDate             : new Date(2014, 1, 1),\n    width               : 800,\n    height              : 350,\n    // point grid to use CRUD manager\n    crudManager         : crudManager\n    columns             : [\n        {\n            xtype   : 'namecolumn'\n        },\n        {\n            xtype   : 'startdatecolumn'\n        }\n    ]\n});\n</code></pre>\n\n<h2 id='gantt_crud_manager-section-calendars'>Calendars</h2>\n\n<p><a href=\"#!/api/Gnt.data.CrudManager\" rel=\"Gnt.data.CrudManager\" class=\"docClass\">Gnt.data.CrudManager</a> supports bulk loading of all the project calendars in a project.\nTo be able to do this, the <a href=\"#!/api/Gnt.data.CrudManager-cfg-calendarManager\" rel=\"Gnt.data.CrudManager-cfg-calendarManager\" class=\"docClass\">Gnt.data.CrudManager.calendarManager</a> config has to be specified or it can be specified on the <a href=\"#!/api/Gnt.data.TaskStore-cfg-calendarManager\" rel=\"Gnt.data.TaskStore-cfg-calendarManager\" class=\"docClass\">task store</a>.</p>\n\n<pre><code>var calendarManager   = Ext.create('<a href=\"#!/api/Gnt.data.CalendarManager\" rel=\"Gnt.data.CalendarManager\" class=\"docClass\">Gnt.data.CalendarManager</a>', {\n    calendarClass   : '<a href=\"#!/api/Gnt.data.calendar.BusinessTime\" rel=\"Gnt.data.calendar.BusinessTime\" class=\"docClass\">Gnt.data.calendar.BusinessTime</a>'\n});\n\n...\n\nvar taskStore     = Ext.create('Gnt.data.TakStore', {\n    // taskStore calendar will automatically be set when calendarManager gets loaded\n    calendarManager : calendarManager,\n    resourceStore   : resourceStore,\n    dependencyStore : dependencyStore,\n    assignmentStore : assignmentStore\n});\n\nvar crudManager   = Ext.create('<a href=\"#!/api/Gnt.data.CrudManager\" rel=\"Gnt.data.CrudManager\" class=\"docClass\">Gnt.data.CrudManager</a>', {\n    autoLoad        : true,\n    taskStore       : taskStore,\n    transport       : {\n        load    : {\n            url     : 'php/read.php'\n        },\n        sync    : {\n            url     : 'php/save.php'\n        }\n    }\n});\n</code></pre>\n\n<h3 id='gantt_crud_manager-section-load-response-structure'>Load response structure</h3>\n\n<p>The calendar manager load response has a bit more complex structure than the <a href=\"#!/guide/crud_manager-section-4\">described general one</a>.</p>\n\n<p>The first difference from a standard response is that for each calendar we include its data under the <code>Days</code> field.\nThe object under <code>Days</code> field has exactly the same structure as any other object containing store data.\nIt has <code>rows</code> containing an array of calendar records (each represents a <a href=\"#!/api/Gnt.model.CalendarDay\" rel=\"Gnt.model.CalendarDay\" class=\"docClass\">Gnt.model.CalendarDay</a> instance) and <code>total</code> defines the number of them.</p>\n\n<p>Another thing to take a note on, is how <code>metaData</code> is used for calendar manager loading.\nIt has a <code>projectCalendar</code> property which <strong>must</strong> contain the identifier of the calendar that should be used as the <strong>project calendar</strong>.</p>\n\n<pre><code>{\n    requestId   : 123890,\n    revision    : 123,\n    success     : true,\n\n    calendars   : {\n        // each record represents a <a href=\"#!/api/Gnt.model.Calendar\" rel=\"Gnt.model.Calendar\" class=\"docClass\">Gnt.model.Calendar</a> instance\n        rows        : [\n            {\n                Id                  : \"1\",\n                parentId            : null,\n                Name                : \"General\",\n                DaysPerMonth        : 20,\n                DefaultAvailability : [\"08:00-12:00\",\"13:00-17:00\"],\n                ...\n                // the calendar data\n                Days                : {\n                    // each record represents <a href=\"#!/api/Gnt.model.CalendarDay\" rel=\"Gnt.model.CalendarDay\" class=\"docClass\">Gnt.model.CalendarDay</a> instance\n                    rows    : [{\n                        Id                  : 2,\n                        calendarId          : \"1\",\n                        Name                : \"Some big holiday\",\n                        Type                : \"DAY\",\n                        Date                : \"2010-01-14\",\n                        Availability        : [],\n                        Weekday             : 0,\n                        OverrideStartDate   : null,\n                        OverrideEndDate     : null,\n                        IsWorkingDay        : false,\n                        Cls                 : \"gnt-national-holiday\"\n                    }],\n                    total   : 1\n                },\n                // child calendars go here\n                // each record represents a <a href=\"#!/api/Gnt.model.Calendar\" rel=\"Gnt.model.Calendar\" class=\"docClass\">Gnt.model.Calendar</a> instance\n                children    : [{\n                    Id          : \"2\",\n                    parentId    : \"1\",\n                    Name        : \"Holidays\",\n                    ...\n                    // \"Holidays\" calendar data\n                    Days        : {\n                        // each record represents <a href=\"#!/api/Gnt.model.CalendarDay\" rel=\"Gnt.model.CalendarDay\" class=\"docClass\">Gnt.model.CalendarDay</a> instance\n                        rows    : [\n                            {\n                                Id          : 3,\n                                calendarId  : \"2\",\n                                Name        : \"Mats's birthday\",\n                                Date        : \"2010-01-13\",\n                                ...\n                            },\n                            {\n                                Id          : 4\n                                calendarId  : \"2\",\n                                Name        : \"Bryntum company holiday\",\n                                Date        : \"2010-02-01\",\n                                ...\n                            },\n                            {\n                                Id          : 5,\n                                calendarId  : \"2\",\n                                Name        : \"Bryntum 1st birthday\",\n                                Date        : \"2010-12-01\",\n                                ...\n                            }\n                        ],\n                        total   : 3\n                    },\n                    leaf    : true\n                }]\n            }\n        ],\n        total       : 2,\n        metaData    : {\n            // this specifies the identifier of the project calendar\n            projectCalendar : \"1\"\n        }\n\n    },\n\n    store2      : {\n        ...\n    },\n\n    store3      : {\n        ...\n    }\n}\n</code></pre>\n\n<h2 id='gantt_crud_manager-section-error-handling'>Error handling</h2>\n\n<p>See <a href=\"#!/guide/crud_manager-section-5\">details on error handling in general guide</a>.</p>\n\n<h2 id='gantt_crud_manager-section-writing-own-server-side-implementation.'>Writing own server-side implementation.</h2>\n\n<p>The CM doesn't require any specific backend, meaning you can implement the server-side parts in any platform. The only requirement is to follow <a href=\"#!/guide/crud_manager-section-3\">the requests and responses structure convention</a>.</p>\n","title":"Using CRUD manager with Ext Gantt"});