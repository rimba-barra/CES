Ext.define('Masterdata.store.Bank', {
    extend: 'Ext.data.Store',
    alias: 'store.BankStore',

    requires: [
        'Masterdata.model.Bank'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'BankStore',
            model: 'Masterdata.model.Bank',
            proxy: {
                type: 'ajax',
                timeout:45000,
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'masterdata/bank/read',
                    create: 'masterdata/bank/create',
                    update: 'masterdata/bank/update',
                    destroy: 'masterdata/bank/delete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'bank_id',
                    root: 'data'
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