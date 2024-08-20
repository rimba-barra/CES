Ext.define('Erems.store.Mastergirik', {
    extend: 'Ext.data.Store',
    alias: 'store.MastergirikStore',
	
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({            
            model: 'Erems.model.Mastergirik',
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'erems/mastergirik/read',
                    create: 'erems/mastergirik/create',
                    update: 'erems/mastergirik/update',
                    destroy: 'erems/mastergirik/delete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'girik_id',
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