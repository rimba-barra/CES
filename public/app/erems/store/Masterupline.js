Ext.define('Erems.store.Masterupline', {
    extend: 'Ext.data.Store',
    alias: 'store.MasteruplineStore',
	
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({            
            model: 'Erems.model.Masterupline',
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'erems/masterupline/read',
                    create: 'erems/masterupline/create',
                    update: 'erems/masterupline/update',
                    destroy: 'erems/masterupline/delete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'upline_id',
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