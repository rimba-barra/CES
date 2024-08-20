Ext.define('Cashier.store.CoadeptcomboV2', {
    extend: 'Ext.data.Store',
    alias: 'store.coadeptcomboV2store',
    requires: [
        'Cashier.model.Coadept'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'CoadeptcomboV2Store',
                model: 'Cashier.model.Coadept',
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
                        read: 'cashier/common/read',
                        create: 'cashier/common/create',
                        update: 'cashier/common/update',
                        destroy: 'cashier/common/delete'
                    },
                    reader: {
                        type: 'json',                       
                        root: 'data',
                        idProperty: 'coa_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'getcoabyprojectptdeptV2'
                    }
                }
            }, cfg)]);
    }
});