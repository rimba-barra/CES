Ext.define('Erems.store.Popupbelumsppjb', {
    extend: 'Ext.data.Store',
    alias: 'store.popupbelumsppjbstore',
    requires: [
        'Erems.model.Popupmaster'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PopupbelumsppjbStore',
                model: 'Erems.model.Popupmaster',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/popupmaster/read',
                        create: 'erems/popupmaster/create',
                        update: 'erems/popupmaster/update',
                        destroy: 'erems/popupmaster/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'purchaseletter_id',
                        root: 'data'
                    },
					extraParams: {
						popup_type: 'belumsppjb'
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