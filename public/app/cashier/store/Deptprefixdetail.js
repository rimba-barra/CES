Ext.define('Cashier.store.Deptprefixdetail', {
    extend: 'Ext.data.Store',
    alias: 'store.deptprefixstore',
    requires: [
        'Cashier.model.Deptprefixdetail'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'DeptprefixdetailStore',
                model: 'Cashier.model.Deptprefixdetail',
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
                        read: 'cashier/deptprefix/deptprefixdetailread',
                        create: 'cashier/deptprefix/deptprefixdetailcreate',
                        update: 'cashier/deptprefix/deptprefixdetailupdate',
                        destroy: 'cashier/deptprefix/deptprefixdetaildelete'
                    },
                    reader: {
                        type: 'json',                       
                        root: 'data',
                        idProperty: 'deptprefixdetail_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'default'
                    }
                }
            }, cfg)]);
    }
});