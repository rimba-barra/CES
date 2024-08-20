Ext.define('Erems.store.Masterbank', {
    extend: 'Ext.data.Store',
    alias: 'store.MasterbankStore',
	
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({            
            model: 'Erems.model.Masterbank',
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'erems/masterbank/read',
                    create: 'erems/masterbank/create',
                    update: 'erems/masterbank/update',
                    destroy: 'erems/masterbank/delete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'bank_id',
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