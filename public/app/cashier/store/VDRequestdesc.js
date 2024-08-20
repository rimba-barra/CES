Ext.define('Cashier.store.VDRequestdesc', {
    extend: 'Ext.data.Store',
    alias: 'store.vdrequestdescstore',
    requires: [
        'Cashier.model.VDRequestdesc'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'VDRequestdescStore',
                model: 'Cashier.model.VDRequestdesc',
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
                        read: 'cashier/vdrequest/descread',
                        create: 'cashier/vdrequest/desccreate',
                        update: 'cashier/vdrequest/descupdate',
                        destroy: 'cashier/vdrequest/descdelete'
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