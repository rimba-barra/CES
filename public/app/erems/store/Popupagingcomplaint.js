Ext.define('Erems.store.Popupagingcomplaint', {
    extend: 'Ext.data.Store',
    alias: 'store.popupagingcomplaintstore',
    requires: [
        'Erems.model.Popupmaster'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PopupagingcomplaintStore',
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
                        idProperty: 'aftersales_complaint_id',
                        root: 'data'
                    },
					extraParams: {
						popup_type: 'agingcomplaint'
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