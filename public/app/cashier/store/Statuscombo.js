Ext.define('Cashier.store.Statuscombo', {
    extend: 'Ext.data.Store',
    alias: 'store.statuscombostore',
    fields: [
        {name: 'status_id', type: 'int'},
        {name: 'status', type: 'string'},
        {name: 'description', type: 'string'}
    ],
    constructor: function (cfg) {
        var me = this;
        var value;
        if (apps.project == 1){
            value = [
                    {"status_id": 1,"status": "K", "description": "CASH"},
                    {"status_id": 2,"status": "B", "description": "CEK/GIRO"},
                    {"status_id": 3,"status": "P", "description": "Petty Cash Loan"},
                ];
        }else{
             value = [
                    {"status_id": 1,"status": "K", "description": "CASH"},
                    {"status_id": 2,"status": "B", "description": "CEK/GIRO"},
                ];
        }
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'StatuscomboStore',
                data: value,
            }, cfg)]);
    }
});