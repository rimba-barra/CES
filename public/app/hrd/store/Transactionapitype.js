Ext.define('Hrd.store.Transactionapitype', {
    extend: 'Ext.data.Store',
    alias: 'store.Transactionapitype',
    fields: [
        {name: 'for_transaction', type: 'string'},
        {name: 'description', type: 'string'},
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'Transactionapitype',
                data: [
                    {"for_transaction": 'cuti', "description": "Cuti"},
                    {"for_transaction": 'tlk', "description": "Tugas Luar Kantor"},
                    {"for_transaction": 'izin', "description": "Izin"},
                    {"for_transaction": 'gantishift', "description": "Ganti Shift"},
                ],
            }, cfg)]);
    }
});