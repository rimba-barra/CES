Ext.define('Erems.store.Pencairankprduedateescrow', {
    extend: 'Ext.data.Store',
    alias: 'store.pencairankprduedateescrowstore',
    requires: [
        'Erems.model.Pencairankprduedateescrow'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PencairankprduedateescrowStore',
                model: 'Erems.model.Pencairankprduedateescrow',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/pencairankpr/read',
                        create: '',
                        update: '',
                        destroy: ''
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'plafon_id',
                        root: 'data'
                    },
					extraParams: {
						read_type_mode: 'getDuedateEscrow'
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