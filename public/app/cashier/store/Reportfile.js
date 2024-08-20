Ext.define('Cashier.store.Reportfile', {
    extend: 'Ext.data.Store',
    alias: 'store.reportfilestore',
    fields: [
        {name: 'code', type: 'string'},
        {name: 'description', type: 'string'}
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ReportfileStore',
                data: [
                    {"code": "R01", "description": "Cheque and Clearing Report"},
                    {"code": "R02", "description": "Bank Payment Voucher"},
                  /*  {"code": "R03", "description": "Detail Summary COA"},
                    {"code": "R04", "description": "List Cheque and Giro"},
                    */
                ],
            }, cfg)]);
    }
});