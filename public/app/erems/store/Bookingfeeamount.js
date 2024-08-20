Ext.define('Erems.store.Bookingfeeamount', {
    extend: 'Ext.data.Store',
    alias: 'store.bookingfeeamountstore',
    requires: [
        'Erems.model.Bookingfeeamount'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'BookingfeeamountStore',
                model: 'Erems.model.Bookingfeeamount',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST'
                    },
                    api: {
                        read: 'erems/bookingfeeamount/read'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'bookingfeeamount_id',
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