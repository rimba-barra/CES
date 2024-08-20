Ext.define('Erems.store.Masterguaranteetype', {
    extend: 'Ext.data.Store',
    alias: 'store.masterguaranteetypestore',
    requires: [
        'Erems.model.Masterguaranteetype'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterguaranteetypeStore',
                model: 'Erems.model.Masterguaranteetype',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/masterguaranteetype/read',
                        create: 'erems/masterguaranteetype/create',
                        update: 'erems/masterguaranteetype/update',
                        destroy: 'erems/masterguaranteetype/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'guaranteetype_id',
                        root: 'data'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    }
                }
            }, cfg)]);
    }
});