Ext.define('Hrd.store.Functionapproval', {
    extend: 'Ext.data.Store',
    alias: 'store.functionapproval',
    fields: [
        {name: 'status', type: 'string'},
        {name: 'description', type: 'string'},
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'FunctionapprovalStore',
                data: [
                    {"status": 'approvalmutasi', "description": 'Mutasi'},
                    {"status": 'approvalpromosi', "description": 'Promosi'},
                    {"status": 'approvalrotasi', "description": 'Rotasi'},
                    {"status": 'approvaldemosi', "description": 'Demosi'},
                ],
            }, cfg)]);
    }
});