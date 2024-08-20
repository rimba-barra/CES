Ext.define('Cashier.store.Masterdocumentcounter', {
    extend: 'Ext.data.Store',
    alias: 'store.masterdocumentcounterstore',
    requires: [
        'Cashier.model.Masterdocumentcounter'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'MasterdocumentcounterStore',
            model: 'Cashier.model.Masterdocumentcounter',
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'cashier/masterdocumentcounter/read',
                    create: 'cashier/masterdocumentcounter/create',
                    update: 'cashier/masterdocumentcounter/update',
                    destroy: 'cashier/masterdocumentcounter/delete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'counter_no_id',
                    root: 'data'
                },
                writer: {
                    type: 'json',
                    encode: true,
                    root: 'data'
                },
                extraParams: {
                    'hideparam': 'default'
                }
            }
        }, cfg)]);
    }
});