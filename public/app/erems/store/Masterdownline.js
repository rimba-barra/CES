Ext.define('Erems.store.Masterdownline', {
    extend: 'Ext.data.Store',
    alias: 'store.MasterdownlineStore',
	
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({            
            model: 'Erems.model.Masterdownline',
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'erems/masterdownline/read',
                    create: 'erems/masterdownline/create',
                    update: 'erems/masterdownline/update',
                    destroy: 'erems/masterdownline/delete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'downline_id',
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