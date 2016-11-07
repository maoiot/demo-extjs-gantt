// Ext.Loader.setConfig({
//     enabled        : true,
//     disableCaching : true,
//     paths          : {
//         'Sch'    : '../../js/Sch',
//         'Gnt'    : '../../js/Gnt',
//         'Robo'   : '../../js/Robo'
//     }
// });

Ext.application({
    requires           : [ 'MyApp.view.Viewport' ],
    paths              : {
        'Ext.ux' : '../../../extjs-6.0.1/packages/ux/classic/src'
    },
    name               : 'MyApp',
    autoCreateViewport : true,

    controllers : [
        'Navigation',
        'Settings'
    ]
});
