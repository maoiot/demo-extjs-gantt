StartTest(function(t) {

    t.diag('Sanity')

    t.ok(Sch.mixin.TimelineView, "Sch.mixin.TimelineView is here")
    t.ok(Gnt.panel.Gantt, "Gnt.panel.Gantt is here")

    // when releasing we check if Sch.VERSION is injected
    if (t.harness.getQueryParam('release') == 1) {
        var version = new Ext.Version(Sch.VERSION)

        t.ok(version.major, 'version is provided ['+ version.major +']')
    }

})
