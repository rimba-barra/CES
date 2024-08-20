Ext.define('Hrd.store.Statusovertime', {
    extend: 'Ext.data.Store',
    alias: 'store.statusovertime',
    fields: [
        {name: 'status', type: 'string'},
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'StatusovertimeStore',
                data: [
                    {"status": 'CLOSED'},
                    {"status": 'REPORT'},
                    {"status": 'OPEN'},
                    {"status": 'SUBMIT'},
                    {"status": 'CANCEL'},
                ],
            }, cfg)]);
    }
});