Ext.define('Appsmgmt.store.ObjectTree', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.ObjectTreeStore',
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'ObjectTreeStore',
            model: 'Appsmgmt.model.Object',
            sorters: [{
                property: 'object_parent',
                direction: 'ASC'
            }, {
                property: 'object_name',
                direction: 'ASC'
            }],
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
                    read: 'appsmgmt/application/objecttreeread',
                    create: 'appsmgmt/application/objectcreate',
                    update: 'appsmgmt/application/objectupdate',
                    destroy: 'appsmgmt/application/objectdelete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'object_id',
                    root: ''
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