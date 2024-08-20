Ext.define('Master.controller.Masterpt', {
    extend: 'Master.library.template.controller.Controller2',
    alias: 'controller.Masterpt',
    requires: [
        'Master.library.box.Config',
        'Master.library.box.tools.Tools',
        'Master.library.box.tools.EventSelector'
    ],
    refs: [
        {
            ref: 'panel',
            selector: 'masterptpanel'
        },
        {
            ref: 'grid',
            selector: 'masterptgrid'
        },
        {
            ref: 'formdata',
            selector: 'masterptformdata'
        },
        {
            ref: 'formsearch',
            selector: 'masterptformsearch'
        },
    ],
    formWidth: 900,
    controllerName: 'masterpt',
    fieldName: 'masterptID',
    bindPrefixName: 'Masterpt',
    formxWinId: 'win-masterptwinId',
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
            'masterptpanel button[action=collection]': {
                click: me.selectUnitGridShow
            },
        });
    },
});
