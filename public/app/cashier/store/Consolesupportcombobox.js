Ext.define('Cashier.store.Consolesupportcombobox', {
    extend: 'Ext.data.Store',
    alias: 'store.consolesupportcomboboxstore',
    requires: [
        'Cashier.model.Consolesupportcombobox'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ConsolesupportcomboboxStore',
                model: 'Cashier.model.Consolesupportcombobox',
                sorters: [
                            { property: 'group_consolidation',direction: 'ASC'}                       
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
                        idProperty: 'consolidation_access_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'consolesupportcombobox'
                    }
                }
            }, cfg)]);
    }
});