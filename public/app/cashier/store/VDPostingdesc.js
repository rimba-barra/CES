Ext.define('Cashier.store.VDPostingdesc', {
    extend: 'Ext.data.Store',
    alias: 'store.vdpostingdescstore',
    requires: [
        'Cashier.model.VDPostingdesc'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'VDPostingdescStore',
                model: 'Cashier.model.VDPostingdesc',
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
                        read: 'cashier/vdposting/descread',
                        create: 'cashier/vdposting/desccreate',
                        update: 'cashier/vdposting/descupdate',
                        destroy: 'cashier/vdposting/descdelete'
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