Ext.define('Erems.store.Utility', {
    extend: 'Ext.data.Store',
    alias: 'store.utilitystore',
    requires: [
        'Erems.model.Utility'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'UtilityStore',
                model: 'Erems.model.Utility',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/utility/read',
                        create: 'erems/utility/create',
                        update: 'erems/utility/update',
                        destroy: 'erems/utility/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'purchaseletter_id',
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