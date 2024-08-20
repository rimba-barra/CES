Ext.define('Hrd.store.Statuspdlk', {
    extend: 'Ext.data.Store',
    alias: 'store.statuspdlk',
    fields: [
        {name: 'status', type: 'string'},
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'StatuspdlkStore',
                data: [
                    {"status": 'PDLK'},
                    {"status": 'PDLN'},
                ],
            }, cfg)]);
    }
});