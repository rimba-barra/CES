Ext.define('Master.controller.Masterprovinsi', {
    extend: 'Master.library.template.controller.Controller2',
    alias: 'controller.Masterprovinsi',
    requires: [
        'Master.library.box.Config',
        'Master.library.box.tools.Tools',
        'Master.library.box.tools.EventSelector'
    ],
    refs: [
        {
            ref: 'panel',
            selector: 'masterprovinsipanel'
        },
        {
            ref: 'grid',
            selector: 'masterprovinsigrid'
        },
        {
            ref: 'formdata',
            selector: 'masterprovinsiformdata'
        },
        {
            ref: 'formsearch',
            selector: 'masterprovinsiformsearch'
        },
    ],
    formWidth: 900,
    controllerName: 'masterprovinsi',
    fieldName: 'masterprovinsiID',
    bindPrefixName: 'Masterprovinsi',
    formxWinId: 'win-masterprovinsiwinId',
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
            'masterprovinsipanel button[action=collection]': {
                click: me.selectUnitGridShow
            },
        });
    },
});
