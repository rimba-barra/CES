Ext.define('Erems.store.Masterdiscountmarketing', {
    extend: 'Ext.data.Store',
    alias: 'store.MasterdiscountmarketingStore',
	
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({            
            model: 'Erems.model.Masterdiscountmarketing',
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'erems/masterdiscountmarketing/read',
                    create: 'erems/masterdiscountmarketing/create',
                    update: 'erems/masterdiscountmarketing/update',
                    destroy: 'erems/masterdiscountmarketing/delete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'discountmarketing_id',
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