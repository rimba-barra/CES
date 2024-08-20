Ext.define('Erems.store.Mastertargetsales', {
    extend: 'Ext.data.Store',
    alias: 'store.MastertargetsalesStore',
	
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({            
            model: 'Erems.model.Mastertargetsales',
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'erems/mastertargetsales/read',
                    create: 'erems/mastertargetsales/create',
                    update: 'erems/mastertargetsales/update',
                    destroy: 'erems/mastertargetsales/delete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'targetsales_id',
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