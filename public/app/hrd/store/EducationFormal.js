Ext.define('Hrd.store.EducationFormal', {
    extend: 'Ext.data.Store',
    alias: 'store.educationformalstore',
    requires: [
        'Hrd.model.EducationFormal'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'EducationFormalStore',
                model: 'Hrd.model.EducationFormal',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'hrd/personalselfservice/read',
                        create: 'hrd/personalselfservice/create',
                        update: 'hrd/personalselfservice/update',
                        destroy: 'hrd/personalselfservice/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'educationhistory_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        mode_read: 'getdataeducationformal'
                    }
                }
            }, cfg)]);
    }
});