Ext.define('Cashier.store.Monthdata', {
    extend: 'Ext.data.Store',
    alias: 'store.monthdatastore',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'month', type: 'string'}
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MonthdataStore',
                data: [
                    {"id": 1, "month": "January"},
                    {"id": 2, "month": "February"},
                    {"id": 3, "month": "March"},
                    {"id": 4, "month": "April"},
                    {"id": 5, "month": "May"},
                    {"id": 6, "month": "June"},
                    {"id": 7, "month": "July"},
                    {"id": 8, "month": "August"},
                    {"id": 9, "month": "September"},
                    {"id": 10, "month": "October"},
                    {"id": 11, "month": "November"},
                    {"id": 12, "month": "December"}
                ],
            }, cfg)]);
    }
});