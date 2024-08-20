Ext.define('Hrd.store.Sectiondepartment', {
    extend: 'Ext.data.Store',
    alias: 'store.sectiondepartmentstore',
    requires: [
        'Hrd.model.Sectiondepartment'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'SectiondepartmentStore',
                model: 'Hrd.model.Sectiondepartment',
                sorters: [
                    {property: 'department', direction: 'ASC'}
                ],
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'hrd/msection/read',
                        create: 'hrd/msection/create',
                        update: 'hrd/msection/update',
                        destroy: 'hrd/msection/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'section_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },

                }
            }, cfg)]);
    }
});