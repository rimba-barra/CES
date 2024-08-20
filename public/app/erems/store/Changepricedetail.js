Ext.define('Erems.store.Changepricedetail', {
    extend: 'Ext.data.Store',
    alias: 'store.changepricedetailstore',
    requires: [
        'Erems.model.Changepricedetail'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ChangepricedetailStore',
                model: 'Erems.model.Changepricedetail',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST'
                    },
                    api: {
                        read: 'erems/changeprice/read'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'changeprice_id',
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