Ext.define('Erems.store.Jenissurat', {
    extend: 'Ext.data.Store',
    alias: 'store.jenissuratstore',
    fields: [
        {name: 'jenissurat', type: 'string'},
        {name: 'description', type: 'string'}
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'JenissuratStore',
                data: [
                    {"jenissurat": "SURAT", "description": "SURAT"},
                    {"jenissurat": "TELPON", "description": "TELPON"},
                ],
            }, cfg)]);
    }
});