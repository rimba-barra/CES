Ext.define('Cashier.store.Ptcustomcombo', {
    extend: 'Ext.data.Store',
    alias: 'store.ptstore',
    requires: [
        'Cashier.model.Ptcustomcombo'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PtStore',
                model: 'Cashier.model.Ptcustomcombo',
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
                        hideparam :'getptbyprojectV2',
                        start :0,
                        limit :1000,
                    }
                }
            }, cfg)]);
    }
});