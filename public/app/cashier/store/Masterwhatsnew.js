Ext.define('Cashier.store.Masterwhatsnew', {
    extend: 'Ext.data.Store',
    alias: 'store.MasterwhatsnewStore',
	
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({            
            model: 'Cashier.model.Masterwhatsnew',
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'cashier/masterwhatsnew/read',
                    create: 'cashier/masterwhatsnew/create',
                    update: 'cashier/masterwhatsnew/update',
                    destroy: 'cashier/masterwhatsnew/delete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'whatsnew_id',
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