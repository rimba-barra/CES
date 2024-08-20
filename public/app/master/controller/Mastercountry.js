Ext.define('Master.controller.Mastercountry', {
    extend: 'Master.library.template.controller.Controller2',
    alias: 'controller.Mastercountry',
    requires: [
        'Master.library.box.Config',
        'Master.library.box.tools.Tools',
        'Master.library.box.tools.EventSelector'
    ],
    refs: [
        {
            ref: 'panel',
            selector: 'mastercountrypanel'
        },
        {
            ref: 'grid',
            selector: 'mastercountrygrid'
        },
        {
            ref: 'formdata',
            selector: 'mastercountryformdata'
        },
        {
            ref: 'formsearch',
            selector: 'mastercountryformsearch'
        },
    ],
    formWidth: 900,
    controllerName: 'mastercountry',
    fieldName: 'mastercountryID',
    bindPrefixName: 'Mastercountry',
    formxWinId: 'win-mastercountrywinId',
    constructor: function (configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Master.library.box.Config({
            _controllerName: me.controllerName
        });
    },
    init: function () {
        var me = this;
        var events = new Master.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        me.tools = new Master.library.box.tools.Tools({config: me.myConfig});
        this.control({
            'mastercountrypanel button[action=collection]': {
                click: me.selectUnitGridShow
            },
        });
    },
});
