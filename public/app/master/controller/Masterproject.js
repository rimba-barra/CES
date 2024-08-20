Ext.define('Master.controller.Masterproject', {
    extend: 'Master.library.template.controller.Controller2',
    alias: 'controller.Masterproject',
    requires: [
        'Master.library.box.Config',
        'Master.library.box.tools.Tools',
        'Master.library.box.tools.EventSelector'
    ],
    refs: [
        {
            ref: 'panel',
            selector: 'masterprojectpanel'
        },
        {
            ref: 'grid',
            selector: 'masterprojectgrid'
        },
        {
            ref: 'formdata',
            selector: 'masterprojectformdata'
        },
        {
            ref: 'formsearch',
            selector: 'masterprojectformsearch'
        },
    ],
    formWidth: 900,
    controllerName: 'masterproject',
    fieldName: 'masterprojectID',
    bindPrefixName: 'Masterproject',
    formxWinId: 'win-masterprojectwinId',
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
            'masterprojectpanel button[action=collection]': {
                click: me.selectUnitGridShow
            },
        });
    },
});
