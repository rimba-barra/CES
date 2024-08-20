Ext.define('Erems.store.Vabookingfee', {
    extend: 'Ext.data.Store',
    alias: 'store.VabookingfeeStore',
	
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({            
            model: 'Erems.model.Vabookingfee',
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'erems/vabookingfee/read',
                    update: 'erems/vabookingfee/update',
                },
                reader: {
                    type: 'json',
                    idProperty: 'bookingfee_id',
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