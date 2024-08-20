Ext.define('Hrd.store.EducationNonFormal', {
    extend: 'Ext.data.Store',
    alias: 'store.educationnonformalstore',
    requires: [
        'Hrd.model.EducationNonFormal'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'EducationNonFormalStore',
                model: 'Hrd.model.EducationNonFormal',
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
                        idProperty: 'traininghistory_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        mode_read: 'getdataeducationnonformal'
                    }
                }
            }, cfg)]);
    }
});