Ext.define('Cashier.store.Popupduedatevoucherdepartment', {
    extend: 'Ext.data.Store',
    alias: 'store.popupduedatevoucherdepartmentstore',
    requires: [
        'Cashier.model.VDRequest'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PopupduedatevoucherdepartmentStore',
                model: 'Cashier.model.VDRequest',
                proxy: {
                    type: 'ajax',
                    timeout: 45000000,
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/popupduedatevoucherdepartment/read',
                        create: 'cashier/popupduedatevoucherdepartment/create',
                        update: 'cashier/popupduedatevoucherdepartment/update',
                        destroy: 'cashier/popupduedatevoucherdepartment/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'voucher_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },

                }
            }, cfg)]);
    }
});