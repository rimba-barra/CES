Ext.define('Cashier.store.Ptreport', {
    extend: 'Ext.data.Store',
    alias: 'store.ptreportstore',
    requires: [
        'Cashier.model.Pt'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PtreportStore',
                model: 'Cashier.model.Pt',
                proxy: {
                    type: 'ajax',
                    timeout:45000000,
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/common/read'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'pt_id',
                        root: 'data'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams:{
                        hideparam :'ptbyproject',
                        start :0,
                        limit :1000,
                    }
                }
            }, cfg)]);
    }
});