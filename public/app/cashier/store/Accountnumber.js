Ext.define('Cashier.store.Accountnumber', {
    extend: 'Ext.data.Store',
    alias: 'store.accountnumberstore',
    requires: [
        'Cashier.model.Accountnumber'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'AccountnumberStore',
                model: 'Cashier.model.Accountnumber',
                sorters: [
                            { property: 'no_acc',direction: 'ASC'}                       
                        ],
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
                        idProperty: 'no_acc',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'getaccountnumberbyprojectpt'
                    }
                }
            }, cfg)]);
    }
});