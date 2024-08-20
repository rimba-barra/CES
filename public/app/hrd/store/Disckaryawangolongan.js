Ext.define('Hrd.store.Disckaryawangolongan', {
    extend: 'Ext.data.Store',
    //alias: 'store.DisckaryawangolonganStore',
	
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({            
            model: 'Hrd.model.Disckaryawangolongan',
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'hrd/disckaryawangolongan/read',
                    create: 'hrd/disckaryawangolongan/create',
                    update: 'hrd/disckaryawangolongan/update',
                    destroy: 'hrd/disckaryawangolongan/delete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'disc_id',
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