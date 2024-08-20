Ext.define('Hrd.store.Changestatustypedoc', {
    extend: 'Ext.data.Store',
    alias: 'store.Changestatustypedoc',
    fields: [
        {name: 'typedocument', type: 'string'},
        {name: 'description', type: 'string'},
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ChangestatustypedocStore',
                data: [
                    {"typedocument": 'datapendukung', "description": "Dokumen"},
                    {"typedocument": 'dokumensk', "description": "Surat Keterangan"},
                ],
            }, cfg)]);
    }
});