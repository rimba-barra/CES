Ext.define('Masterdata.store.Currency', {
    extend: 'Ext.data.Store',
    alias: 'store.CurrencyStore',

    requires: [
        'Masterdata.model.Currency'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'CurrencyStore',
            model: 'Masterdata.model.Currency',
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
                    read: 'masterdata/currency/read',
                    create: 'masterdata/currency/create',
                    update: 'masterdata/currency/update',
                    destroy: 'masterdata/currency/delete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'currency_id',
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