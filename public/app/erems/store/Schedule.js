Ext.define('Erems.store.Schedule', {
    extend : 'Ext.data.ArrayStore',
    alias  : 'store.schedulestore',
    fields : [
        'schedule_id',
        'scheduletype_id',
        'purchaseletter_id',
        {name:'duedate',type:'date'},
        'amount',
        'sourcemoney_id',
        'remaining_balance',
        'intersetflag',
        'interset',
        'remaining_interest',
        'recomendationdate',
        'termin',
        'description',
        'scheduletype',
        'sourcemoney',
        'queue',
        'new_added', 
        'persentase_npv'
    ],
    storeId     : 'ScheduleStore',
    constructor : function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ScheduleStore',
               // model: 'Erems.model.Scheduletype',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST'
                    },
                    api: {
                        read: 'erems/purchaseletter/read'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'schedule_id',
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