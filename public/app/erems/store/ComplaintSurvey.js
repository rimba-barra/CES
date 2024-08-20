Ext.define('Erems.store.ComplaintSurvey', {
    extend: 'Ext.data.Store',
    alias: 'store.complaintsurveystore',
    requires: [
        'Erems.model.ComplaintSurvey'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ComplaintStore',
                model: 'Erems.model.ComplaintSurvey',
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
                        read: 'erems/complaint/read',
                        create: 'erems/complaint/create',
                        update: 'erems/complaint/update',
                        destroy: 'erems/complaint/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'survey_aftersales_id',
                        root: 'data'
                    },
                    extraParams: {
                        read_type_mode: 'grid_survey'
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