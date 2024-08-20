Ext.define('Erems.store.Masterpekerjaankonsumen', {
    extend: 'Ext.data.Store',
    alias: 'store.MasterpekerjaankonsumenStore',
	
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({            
            model: 'Erems.model.Masterpekerjaankonsumen',
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'erems/masterpekerjaankonsumen/read',
                    create: 'erems/masterpekerjaankonsumen/create',
                    update: 'erems/masterpekerjaankonsumen/update',
                    destroy: 'erems/masterpekerjaankonsumen/delete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'pekerjaankonsumen_id',
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