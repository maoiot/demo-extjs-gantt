StartTest(function(t) {

    // Here we test Sch.crud.transport.Ajax class

    var params;

    Ext.Ajax.request = function (p) {
        params  = p;
    };

    t.expectGlobal('TestEncoder');
    t.expectGlobal('TestCrudManager1');

    // dummy encoder, does nothing
    Ext.define('TestEncoder', {
        format  : 'xml',
        encode  : function (data) { return data; },
        decode  : function (data) { return data; }
    });

    Ext.define('TestCrudManager1', {
        extend  : 'Sch.crud.AbstractManager',
        mixins  : [ 'Sch.crud.transport.Ajax', 'TestEncoder' ]
    });

    t.it('Correctly prepare params for Ext.Ajax.request', function (t) {

        var crud    = Ext.create('TestCrudManager1', {
            transport   : {
                load        : {
                    url         : 'loadurl',
                    method      : 'POST',
                    paramName   : 'smth',
                    params      : {
                        qwe : 'rty'
                    },
                    requestConfig : {

                    }
                },
                sync        : {
                    url         : 'syncurl',
                    method      : 'PUT'
                }
            }
        });

        t.it('for the load packet', function (t) {

            crud.sendRequest({
                data        : 'loaddata',
                type        : 'load',
                success     : 'success',
                failure     : 'failure',
                scope       : 'scope'
            });

            t.isDeeply(params, {
                url     : 'loadurl',
                method  : 'POST',
                success : t.any(Function),
                failure : 'failure',
                scope   : 'scope',
                params  : {
                    smth    : 'loaddata',
                    qwe     : 'rty'
                }
            }, 'correctly formed params');

        });

        t.it('for the sync packet', function (t) {

            crud.sendRequest({
                data        : 'syncdata',
                type        : 'sync',
                success     : 'success2',
                failure     : 'failure2',
                scope       : 'scope2'
            });

            t.isDeeply(params, {
                url     : 'syncurl',
                method  : 'PUT',
                success : t.any(Function),
                failure : 'failure2',
                scope   : 'scope2',
                xmlData : 'syncdata',
                params  : {}
            }, 'correctly formed params');

        });
    });

    t.it('Supports requestConfig config for Ext.Ajax.request', function (t) {


        var crud    = Ext.create('TestCrudManager1', {
            transport   : {
                load        : {
                    url         : 'loadurl',
                    method      : 'POST',
                    paramName   : 'smth',
                    params      : {
                        qwe : 'rty'
                    },
                    requestConfig : {
                        url         : 'loadurl2',
                        method      : 'GET',
                        params      : {
                            foo : 'bar'
                        }
                    }
                },
                sync        : {
                    url         : 'syncurl',
                    method      : 'PUT',
                    requestConfig : {
                        url         : 'syncurl2',
                        method      : 'GET',
                        params      : {
                            foo : 'bar'
                        }
                    }
                }
            }
        });

        t.it('for the load packet', function (t) {

            crud.sendRequest({
                data        : 'loaddata',
                type        : 'load',
                success     : 'success',
                failure     : 'failure',
                scope       : 'scope'
            });

            t.isDeeply(params, {
                url     : 'loadurl2',
                method  : 'GET',
                success : t.any(Function),
                failure : 'failure',
                scope   : 'scope',
                params  : {
                    smth    : 'loaddata',
                    foo     : 'bar'
                }
            }, 'correctly formed params');

        });

        t.it('for the sync packet', function (t) {

            crud.sendRequest({
                data        : 'syncdata',
                type        : 'sync',
                success     : 'success2',
                failure     : 'failure2',
                scope       : 'scope2'
            });

            t.isDeeply(params, {
                url     : 'syncurl2',
                method  : 'GET',
                success : t.any(Function),
                failure : 'failure2',
                scope   : 'scope2',
                xmlData : 'syncdata',
                params  : {
                    foo : 'bar'
                }
            }, 'correctly formed params');

        });
    });
});
