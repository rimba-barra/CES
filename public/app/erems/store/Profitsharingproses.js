Ext.define('Erems.store.Profitsharingproses', {
    extend: 'Ext.data.Store',
    alias: 'store.profitsharingprosesstore',
    requires: [
        'Erems.model.Profitsharingproses'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ProfitsharingprosesStore',
                model: 'Erems.model.Profitsharingproses',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/profitsharingproses/read',
                        create: 'erems/profitsharingproses/create',
                        update: 'erems/profitsharingproses/update',
                        destroy: 'erems/profitsharingproses/delete'
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