Ext.define('Hrd.store.Disckaryawansisa', {
    extend: 'Ext.data.Store',
    //alias: 'store.DisckaryawansisaStore',
	
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({            
            model: 'Hrd.model.Disckaryawansisa',
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'hrd/disckaryawansisa/read',
                    create: 'hrd/disckaryawansisa/create',
                    update: 'hrd/disckaryawansisa/update',
                    destroy: 'hrd/disckaryawansisa/delete'
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