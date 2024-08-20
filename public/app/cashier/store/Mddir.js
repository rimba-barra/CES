Ext.define('Cashier.store.Mddir', {
    extend: 'Ext.data.Store',
    alias: 'store.mddirstore',
    fields: [
        {name: 'mddir_id', type: 'int'},
        {name: 'position', type: 'string'},
        {name: 'description', type: 'string'}
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'Mddir',
                data: [
                    {"mddir_id": 1, "position": "MD", "description": "Managing Director"},
                    {"mddir_id": 2, "position": "DIR", "description": "Director"},
                    {"mddir_id": 3, "position": "GM", "description": "General Manager"},
                ],
            }, cfg)]);
    }
});