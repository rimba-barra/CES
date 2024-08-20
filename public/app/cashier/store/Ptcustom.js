Ext.define('Cashier.store.Ptcustom', {
    extend: 'Ext.data.Store',
    alias: 'store.ptcustomestore',
    requires: [
        'Cashier.model.Ptcustom'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PtbyuserStore',
                model: 'Cashier.model.Ptcustom',
                sorters: [{
                    property: 'projectcode',
                    direction: 'ASC'
                }, {
                    property: 'ptcode',
                    direction: 'ASC'
                }],
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
                        idProperty: 'projectpt_id',
                        root: 'data',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams:{
                        hideparam :'getcustomptcombobox',
                        start: 0,
                        limit: 1000,
                    }
                }
            }, cfg)]);
    }
});