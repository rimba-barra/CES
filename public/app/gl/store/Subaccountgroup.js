Ext.define('Gl.store.Subaccountgroup', {
    extend: 'Ext.data.Store',
    sorters: [
            {property: 'kelsub_id', direction: 'ASC'}        
     ],
    alias: 'store.subaccountgroupstore',
    requires: [
        'Gl.model.Subaccountgroup'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'SubaccountgroupStore',
                model: 'Gl.model.Subaccountgroup',
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
                        read: 'gl/subaccountgroup/read',
                        create: 'gl/subaccountgroup/create',
                        update: 'gl/subaccountgroup/update',
                        destroy: 'gl/subaccountgroup/delete'
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