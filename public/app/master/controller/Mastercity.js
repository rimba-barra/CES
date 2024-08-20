Ext.define('Master.controller.Mastercity', {
    extend: 'Master.library.template.controller.Controller2',
    alias: 'controller.Mastercity',
    requires: [
        'Master.library.box.Config',
        'Master.library.box.tools.Tools',
        'Master.library.box.tools.EventSelector'
    ],
    refs: [
        {
            ref: 'panel',
            selector: 'mastercitypanel'
        },
        {
            ref: 'grid',
            selector: 'mastercitygrid'
        },
        {
            ref: 'formdata',
            selector: 'mastercityformdata'
        },
        {
            ref: 'formsearch',
            selector: 'mastercityformsearch'
        },
    ],
    formWidth: 900,
    controllerName: 'mastercity',
    fieldName: 'mastercityID',
    bindPrefixName: 'Mastercity',
    formxWinId: 'win-mastercitywinId',
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
            'mastercitypanel button[action=collection]': {
                click: me.selectUnitGridShow
            },
        });
    },
});
