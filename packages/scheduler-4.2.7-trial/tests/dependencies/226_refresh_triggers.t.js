describe('Dependencies should work with grouped scheduler rows', function (t) {
    var scheduler;

    t.beforeEach(function(){
        scheduler && scheduler.destroy();

        scheduler = t.getScheduler({
            renderTo        : Ext.getBody(),
            dependencyStore : true,
            resourceStore   : t.getResourceStore2({
                groupField : 'Name'
            }, 2),
            features : [
                {
                    ftype : 'scheduler_grouping',
                    groupHeaderTpl     : '{name}'
                }
            ]
        }, 2);
    })

    t.it("Should repaint fully when a group containing source node is collapsed", function (t) {

        var dependencyView = scheduler.getDependencyView();

        t.chain(
            { waitForSelector : '.sch-dependency' },

            function(next) {
                t.willFireNTimes(dependencyView, 'refresh', 2);

                next()
            },

            { click : '.x-grid-group-hd:contains(Resource 1)'},

            { waitForSelectorNotFound : '.sch-dependency' },

            { click : '.x-grid-group-hd:contains(Resource 1)'},

            { waitForSelector : '.sch-dependency' }
        )
    });

    t.it("Should repaint fully when a group containing target node is collapsed", function (t) {

        var dependencyView = scheduler.getDependencyView();

        t.chain(
            { waitForSelector : '.sch-dependency' },

            function(next) {
                t.willFireNTimes(dependencyView, 'refresh', 2);

                next()
            },

            { click : '.x-grid-group-hd:contains(Resource 2)'},

            { waitForSelectorNotFound : '.sch-dependency' },

            { click : '.x-grid-group-hd:contains(Resource 2)'},

            { waitForSelector : '.sch-dependency' }
        )
    });


});
