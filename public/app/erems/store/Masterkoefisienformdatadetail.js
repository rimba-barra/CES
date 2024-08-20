Ext.define('Erems.store.Masterkoefisienformdatadetail', {
    extend: 'Ext.data.Store',
    alias: 'store.masterkoefisienformdatadetailstore',
    requires: [
        'Erems.model.Masterkoefisienformdatadetail'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterkoefisienformdatadetailStore',
                model: 'Erems.model.Masterkoefisienformdatadetail',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/masterkoefisien/read',
                        create: 'erems/masterkoefisien/create',
                        update: 'erems/masterkoefisien/update',
                        destroy: 'erems/masterkoefisien/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'koefisien_id',
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