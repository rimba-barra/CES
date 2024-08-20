Ext.define('Cashier.store.Offsetreport', {
    extend: 'Ext.data.Store',
    alias: 'store.offsetreportstore',
    requires: [
        'Cashier.model.Offsetreport'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'OffsetreportStore',
            model: 'Cashier.model.Offsetreport',
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'cashier/offsetreport/read',
                    create: 'cashier/offsetreport/create'
                },
                reader: {
                    type: 'json',
                    idProperty: 'group_user_id',
                    root: 'data'
                },
                writer: {
                    type: 'json',
                    encode: true,
                    root: 'data'
                },
                extraParams: {
                    'hideparam': 'default',
                    'limit': 25
                }
            }
        }, cfg)]);
    }
});