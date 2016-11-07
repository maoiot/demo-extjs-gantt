StartTest(function (t) {
    var managerWidget;

    t.beforeEach(function () {
        managerWidget && managerWidget.destroy();
    });

    var assertContents = function (t, disabled) {
        t.is(managerWidget.down('#btnAdd').isDisabled(), disabled, 'Add button is disabled on tree');
        t.is(managerWidget.down('#btnRemove').isDisabled(), disabled, 'Remove button is disabled on tree');

        t.is(managerWidget.contextMenu.isDisabled(), disabled, 'Context menu disabled');

        var calendarPanel = managerWidget.calendarPanel;

        t.is(calendarPanel.down('#calendarName').isDisabled(), disabled, 'Name field is disabled');
        t.is(calendarPanel.cmbParentCalendar.isDisabled(), disabled, 'Parent combo is disabled');

        Ext.Array.forEach(['btnAdd', 'btnEdit', 'btnRemove'], function (name) {
            t.is(calendarPanel.dayGrid.down('#' + name).isDisabled(), disabled, name.substr(3) + ' button is disabled in Day grid');
            t.is(calendarPanel.weekGrid.down('#' + name).isDisabled(), disabled, name.substr(3) + ' button is disabled in Week grid');
        });
    };

    t.it('Read only mode is set on widget', function (t) {
        var calendarManager = new Gnt.data.CalendarManager({
            proxy   : 'memory',
            root    : {
                expanded    : true,
                children    : [
                    {
                        Id   : "Calendar 1",
                        Name : "Calendar 1",
                        leaf : true,
                        Days : [
                            {
                                Id   : 1,
                                Cls  : "gnt-national-holiday",
                                Date : "2010-01-14",
                                Name : "Some big holiday"
                            }
                        ]
                    },
                    {
                        Id   : "Calendar 2",
                        Name : "Calendar 2",
                        leaf : true,
                        Days : [
                            {
                                Id                : 2,
                                Name              : "Some big holiweek",
                                Weekday           : -1,
                                OverrideStartDate : '2010-01-20',
                                OverrideEndDate   : '2010-01-27',
                                IsWorkingDay      : false,
                                Type              : 'WEEKDAYOVERRIDE'
                            }
                        ]
                    }
                ]
            }
        });

        managerWidget = new Gnt.widget.calendar.CalendarManager({
            calendarManager : calendarManager,
            calendar        : calendarManager.getById('Calendar 1').getCalendar(),
            renderTo        : Ext.getBody(),
            readOnly        : true,
            width           : 800,
            height          : 500
        });

        var dayGridEditCounter  = 0,
            weekGridEditCounter = 0,
            dayGridEditListener = function () {
                dayGridEditCounter++;
            },
            weekGridEditListener = function () {
                weekGridEditCounter++;
            },
            dayGrid = managerWidget.calendarPanel.dayGrid;

        dayGrid.on('beforeedit', dayGridEditListener);
        managerWidget.calendarPanel.weekGrid.on('beforeedit', weekGridEditListener);

        t.chain(
            function (next) {
                assertContents(t, true);
                next();
            },

            { dblclick : "#dayGrid => .x-grid-cell", desc : 'Click day grid, to open editor' },

            { click : function () { return t.getCell(managerWidget.treePanel, 1, 0); } },

            { click : '>>tab[text=Week overrides]', desc : 'Switch to the "Week overrides" tab' },

            { dblclick : "#weekGrid => .x-grid-cell", desc : 'Click week grid, to open editor' },

            { drag : "table.x-grid-item:nth-child(2)", by : [0, -20], desc : 'Drag a calendar in the tree panel' },

            function (next) {
                t.is(managerWidget.treePanel.store.getRoot().childNodes.length, 2, 'calendars tree stayed intact');

                t.is(dayGridEditCounter, 0, 'Day grid is not editable');
                t.is(weekGridEditCounter, 0, 'Week grid is not editable');

                t.diag('Disable readOnly mode');

                managerWidget.setReadOnly(false);
                assertContents(t, false);

                next();
            },

            { drag : "table.x-grid-item:nth-child(2)", by : [0, -20], desc : 'Drag a calendar in the tree panel' },

            { dblclick : "#weekGrid => .x-grid-cell", desc : 'Click week grid, to open editor' },

            { click : function () { return t.getCell(managerWidget.treePanel, 0, 0); } },

            { click : '>>tab[text=Day overrides]', desc : 'Switch to the "Day overrides" tab' },

            // If dblclick is called too fast in IE, no uievent dblclick will be fired on view
            // Cannot figure out any stable condition, tried refresh, cellfocus, do single click first and wait for
            // selection to change. Disabling fast run also works.
            { waitFor : 300 },

            { dblclick : "#dayGrid => .x-grid-cell", desc : 'Click day grid, to open editor' },

            function () {
                t.is(managerWidget.treePanel.store.getRoot().childNodes.length, 1, 'calendar drag`n`drop succeeded');

                t.is(dayGridEditCounter, 1, 'Day grid is editable');
                t.is(weekGridEditCounter, 1, 'Week grid is editable');
            }
        );
    });
});