Ext.define('Appsmgmt.store.GroupObjectTree', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.GroupObjectTreeStore',
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'GroupObjectTreeStore',
            model: 'Appsmgmt.model.GroupObject',
            clearOnLoad: false,
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
                    read: 'appsmgmt/accessright/groupobjecttreeread',
                    create: 'appsmgmt/accessright/groupobjectcreate',
                    update: 'appsmgmt/accessright/groupobjectupdate',
                    destroy: 'appsmgmt/accessright/groupobjectdelete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'group_object_id',
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