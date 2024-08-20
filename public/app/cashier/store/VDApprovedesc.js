Ext.define('Cashier.store.VDApprovedesc', {
    extend: 'Ext.data.Store',
    alias: 'store.vdapprovedescstore',
    requires: [
        'Cashier.model.VDApprovedesc'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'VDApprovedescStore',
                model: 'Cashier.model.VDApprovedesc',
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
                        read: 'cashier/vdapprove/descread',
                        create: 'cashier/vdapprove/desccreate',
                        update: 'cashier/vdapprove/descupdate',
                        destroy: 'cashier/vdapprove/descdelete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'voucherdesc_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'default',
                       
                    }
                }
            }, cfg)]);
    }
});