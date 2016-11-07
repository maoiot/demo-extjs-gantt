StartTest(function(t) {

    // Here we test sync() method of Gnt.data.CrudManager class

    t.expectGlobal('TestCrudManager1');

    Ext.define('TestCrudManager1', {
        extend      : 'Gnt.data.CrudManager',

        encode      : function (data) { return data; },
        decode      : function (data) { return data; },
        sendRequest : function (config) {
            var me  = this;

            window.setTimeout(function () {
                config.success.call(config.scope || me, response);
            }, 1);
        }
    });

    var response;

    t.it('Treats segments properly', function (t) {
        var taskStore = t.getTaskStore({
            DATA : [{
                Id        : 1,
                StartDate : '2015-11-09',
                Duration  : 3
            }]
        });

        var oldTask = taskStore.getNodeById(1);

        var newTask = taskStore.getRoot().appendChild({
            StartDate : '2015-11-09',
            Duration  : 3
        });

        response = {
            revision : 2,
            success  : true,
            tasks    : {
                rows    : [
                    {
                        PhantomId : newTask.getPhantomId(),
                        Id        : 2,
                        Segments  : [
                            {
                                Id         : 1,
                                StartDate  : '2015-11-09',
                                Duration   : 1
                            },
                            {
                                Id         : 2,
                                StartDate  : '2015-11-11',
                                Duration   : 1
                            },
                            {
                                Id         : 3,
                                StartDate  : '2015-11-13',
                                Duration   : 1
                            }
                        ]
                    },
                    {
                        Id       : 1,
                        Segments : [
                            {
                                Id         : 4,
                                StartDate  : '2015-11-09',
                                Duration   : 1
                            },
                            {
                                Id         : 5,
                                StartDate  : '2015-11-11',
                                Duration   : 1
                            },
                            {
                                Id         : 6,
                                StartDate  : '2015-11-13',
                                Duration   : 1
                            }
                        ]
                    }
                ]
            }
        }

        var crud = Ext.create('TestCrudManager1', {
            taskStore : taskStore
        });

        var async = t.beginAsync();

        crud.sync(function () {
            t.endAsync(async);

            t.is(newTask.getSegments().length, 3, 'proper # of segments');
            t.is(newTask.getSegment(0).getStartDate(), new Date(2015, 10, 9), '0: proper segment start');
            t.is(newTask.getSegment(1).getStartDate(), new Date(2015, 10, 11), '1: proper segment start');
            t.is(newTask.getSegment(2).getStartDate(), new Date(2015, 10, 13), '2: proper segment start');
            t.is(newTask.getSegment(0).getDuration(), 1, '0: proper segment duration');
            t.is(newTask.getSegment(1).getDuration(), 1, '1: proper segment duration');
            t.is(newTask.getSegment(2).getDuration(), 1, '2: proper segment duration');


            t.is(oldTask.getSegments().length, 3, 'proper # of segments');
            t.is(oldTask.getSegment(0).getStartDate(), new Date(2015, 10, 9), '0: proper segment start');
            t.is(oldTask.getSegment(1).getStartDate(), new Date(2015, 10, 11), '1: proper segment start');
            t.is(oldTask.getSegment(2).getStartDate(), new Date(2015, 10, 13), '2: proper segment start');
            t.is(oldTask.getSegment(0).getDuration(), 1, '0: proper segment duration');
            t.is(oldTask.getSegment(1).getDuration(), 1, '1: proper segment duration');
            t.is(oldTask.getSegment(2).getDuration(), 1, '2: proper segment duration');
        });

    });

});
