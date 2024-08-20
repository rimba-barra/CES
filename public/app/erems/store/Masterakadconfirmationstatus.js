Ext.define('Erems.store.Masterakadconfirmationstatus', {
    extend: 'Ext.data.Store',
    alias: 'store.masterakadconfirmationstatusstore',
    requires: [
        'Erems.model.Masterakadconfirmationstatus'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterakadconfirmationstatusStore',
                model: 'Erems.model.Masterakadconfirmationstatus',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/masterakadconfirmationstatus/read',
                        create: 'erems/masterakadconfirmationstatus/create',
                        update: 'erems/masterakadconfirmationstatus/update',
                        destroy: 'erems/masterakadconfirmationstatus/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'akadconfirmation_status_id',
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