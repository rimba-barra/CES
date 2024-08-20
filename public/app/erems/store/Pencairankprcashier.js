Ext.define('Erems.store.Pencairankprcashier', {
    extend: 'Ext.data.Store',
    alias: 'store.pencairankprcashierstore',
    requires: [
        'Erems.model.Pencairankprcashier'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PencairankprcashierStore',
                model: 'Erems.model.Pencairankprcashier',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/pencairankprcashier/read',
                        create: 'erems/pencairankprcashier/create',
                        update: 'erems/pencairankprcashier/update',
                        destroy: 'erems/pencairankprcashier/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'purchaseletter_pencairankpr_id',
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