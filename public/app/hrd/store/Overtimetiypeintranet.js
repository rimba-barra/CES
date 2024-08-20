Ext.define('Hrd.store.Overtimetiypeintranet', {
    extend: 'Ext.data.Store',
    alias: 'store.Overtimetiypeintranet',
    fields: [
        {name: 'lemburtype', type: 'string'},
        {name: 'description', type: 'string'},
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'OvertimetiypeintranetStore',
                data: [
                    {"lemburtype": 'sebelum', "description": "Sebelum Jam Kerja"},
                    {"lemburtype": 'sesudah', "description": "Sesudah Jam Kerja"},
                    {"lemburtype": 'libur', "description": "Hari Libur"},
                ],
            }, cfg)]);
    }
});