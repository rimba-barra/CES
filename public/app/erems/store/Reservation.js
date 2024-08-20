Ext.define('Erems.store.Reservation', {
    extend: 'Ext.data.Store',
    alias: 'store.reservationstore',
    requires: [
        'Erems.model.Reservation'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ReservationStore',
                model: 'Erems.model.Reservation',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/reservation/read',
                        create: 'erems/reservation/create',
                        update: 'erems/reservation/update',
                        destroy: 'erems/reservation/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'reservation_id',
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