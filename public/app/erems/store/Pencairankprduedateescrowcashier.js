Ext.define('Erems.store.Pencairankprduedateescrowcashier', {
    extend: 'Ext.data.Store',
    alias: 'store.pencairankprduedateescrowstorecashier',
    requires: [
        'Erems.model.Pencairankprduedateescrowcashier'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'Pencairankprduedateescrowcashier',
                model: 'Erems.model.Pencairankprduedateescrowcashier',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/pencairankprcashier/read',
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