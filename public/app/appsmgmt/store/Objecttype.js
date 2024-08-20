Ext.define('Appsmgmt.store.Objecttype', {
    extend: 'Ext.data.Store',
    alias: 'store.ObjecttypeStore',
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'ObjecttypeStore',
            model: 'Appsmgmt.model.Objecttype',
            proxy: {
                type: 'ajax',
                timeout:4500000,
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'appsmgmt/application/objecttyperead',
                    create: 'appsmgmt/application/objecttypecreate',
                    update: 'appsmgmt/application/objecttypeupdate',
                    destroy: 'appsmgmt/application/objecttypedelete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'object_type_id',
                    root: 'data'
                },
                writer: {
                    type: 'json',
                    encode: true,
                    root: 'data'
                }
            }
        }, cfg)])
    }
});