Ext.define('Erems.store.Utilitydetail', {
    extend: 'Ext.data.Store',
    alias: 'store.utilitydetailstore',
    requires: [
        'Erems.model.Utilitydetail'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'UtilitydetailStore',
                model: 'Erems.model.Utilitydetail',
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
                        idProperty: 'utility_id',
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