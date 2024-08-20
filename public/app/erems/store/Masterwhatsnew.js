Ext.define('Erems.store.Masterwhatsnew', {
    extend: 'Ext.data.Store',
    alias: 'store.MasterwhatsnewStore',
    
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({            
            model: 'Erems.model.Masterwhatsnew',
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'erems/masterwhatsnew/read',
                    create: 'erems/masterwhatsnew/create',
                    update: 'erems/masterwhatsnew/update',
                    destroy: 'erems/masterwhatsnew/delete'
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