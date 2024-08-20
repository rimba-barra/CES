//INIT ini adalah library yang sering digunakan

Ext.define('Cashier.controller.Init', {
    extend: 'Cashier.library.template.controller.Controller2',
     requires: ['Cashier.library.tools.Mytools',
        'Cashier.template.ComboBoxFields',
        'Cashier.library.box.Config',
        'Cashier.library.box.tools.EventSelector',
        'Cashier.library.box.tools.Tools'
    ],
    alias: 'controller.Init',
    stores: ['Ptbyuser'],
    models: [],
    refs: [

    ],
    controllerName: 'init',
    fieldName: 'init',
    bindPrefixName: 'Init',
    formxWinId: 'win-masterinitwinId',
    project_id: 0,
    pt_arr: [],
    pt_id: 0,
    constructor: function (configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Cashier.library.box.Config({
            _controllerName: me.controllerName
        });
    },
    init: function () {
       
    },
});
