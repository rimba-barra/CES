Ext.define('Cashier.store.Subaccountgroup', {
    extend: 'Ext.data.Store',
   /* sorters: [
            {property: 'kelsub_id', direction: 'ASC'}        
     ],*/
    alias: 'store.subaccountgroupstore',
    requires: [
        'Cashier.model.Subaccountgroup'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'SubaccountgroupStore',
                model: 'Cashier.model.Subaccountgroup',
               // pageSize: 10,
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/subaccountgroup/read',
                        create: 'cashier/subaccountgroup/create',
                        update: 'cashier/subaccountgroup/update',
                        destroy: 'cashier/subaccountgroup/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'kelsub_id',
                        root: 'data',
                        totalProperty: 'total'
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