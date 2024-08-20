Ext.define('Erems.store.Purchaseletterpbbdetail', {
    extend: 'Ext.data.Store',
    alias: 'store.purchaseletterpbbdetailstore',
    requires: [
        'Erems.model.Purchaseletterpbbdetail'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PurchaseletterpbbdetailStore',
                model: 'Erems.model.Purchaseletterpbbdetail',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/purchaseletterpbb/readdetail',
                        create: 'erems/purchaseletterpbb/createdetail',
                        update: 'erems/purchaseletterpbb/updatedetail',
                        destroy: 'erems/purchaseletterpbb/deletedetail'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'purchaseletter_pbb_id',
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