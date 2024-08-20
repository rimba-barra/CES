Ext.define('Erems.store.Kewarganegaraan', {
    extend: 'Ext.data.Store',
    alias: 'store.kewarganegaraanstore',
    fields: [
        {name: 'kewarganegaraan', type: 'string'},
        {name: 'description', type: 'string'}
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'KewarganegaraanStore',
                data: [
                    {"kewarganegaraan": "WNI", "description": "Warga Negara Indonesia"},
                    {"kewarganegaraan": "WNA", "description": "Warga Negara Asing"},
                ],
            }, cfg)]);
    }
});