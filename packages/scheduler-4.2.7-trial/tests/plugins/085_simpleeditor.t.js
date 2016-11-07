StartTest(function (t) {

    window.top.focus();

    var editor = new Sch.plugin.SimpleEditor({
        dataIndex    : 'Name',
        newEventText : 'new'
    });

    var s = t.getScheduler({
        width      : 400,
        renderTo   : Ext.getBody(),
        forceFit   : true,
        plugins    : editor,
        eventStore : new Sch.data.EventStore()
    });

    var view = s.getSchedulingView();

    var assertEditorPosition = function (eventBox, editorBox) {
        t.isLessOrEqual(eventBox.left, editorBox.left, 'Left coordinate is correct');
        t.isGreaterOrEqual(eventBox.right, editorBox.right, 'Right coordinate is correct');
        t.isLessOrEqual(eventBox.top, editorBox.top, 'Top coordinate is correct');
        t.isGreaterOrEqual(eventBox.bottom, editorBox.bottom, 'Bottom coordinate is correct');
    };

    t.chain(
        { waitForRowsVisible : s  },
        { drag : '.sch-timetd', by : [-100, 0] },

        { waitFor : 100 },

        function (next) {
            t.is(s.eventStore.getCount(), 0, 'Still no record in the store');

            t.is(editor.getValue(), "new", 'Editor has correct value after editing started');

            assertEditorPosition(view.dragCreator.proxy.getBox(), editor.el.getBox());

            editor.setValue('');

            next();
        },

        { type : 'foo[ENTER]', target : '.x-form-field' },

        function (next) {
            t.is(s.eventStore.getCount(), 1, '1 record added to the store');
            next();
        },

        { doubleclick : '.sch-event' },

        function (next) {
            // Need to manually refresh it here since FF doesn't highlight the text properly if window loses focus (during automation)
            editor.setValue('');

            assertEditorPosition(view.el.down('.sch-event').getBox(), editor.el.getBox());

            next();
        },

        { type : 'test1234[ENTER]' },

        function () {
            t.is(s.eventStore.first().get('Name'), "test1234", 'Record was updated ok');
            t.like(t.getFirstEventEl(s).dom.innerHTML, "test1234", 'Element was refreshed ok');
        }
    );
});
