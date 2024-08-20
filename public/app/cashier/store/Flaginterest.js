    Ext.define('Cashier.store.Flaginterest', {
    extend: 'Ext.data.Store',
    alias: 'store.inoutstore',
    fields: [
        {name: 'flag_interest', type: 'int'},
        {name: 'description', type: 'string'}
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'FlaginterestStore',
                data: [
                    {"flag_interest": 1,"description": "None"},
                    {"flag_interest": 2,"description": "Interest"},
                ],
            }, cfg)]);
    }
});