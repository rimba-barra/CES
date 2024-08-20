Ext.define('Erems.model.Suratperingatanschedule', {
    extend: 'Ext.data.Model',
    alias: 'model.suratperingatanschedulemodel',
    idProperty: 'schedule_id',
    fields: [
		{name: 'schedule_id', type: 'int'},
                {name: 'purchaseletter_id', type:'int'},
                
                {name: 'payment_no', type: 'string'},
                {name: 'scheduletype', type: 'string'},
                {name: 'termin', type: 'int'},
                {name: 'duedate', type: 'date'},
                {name: 'amount', type: 'float'},
                {name: 'remaining_balance', type: 'float'},
                {name: 'denda', type: 'float'},
                {name: 'remaining_denda', type: 'float'},
        
                {name: 'addon', type: 'date'},
                {name: 'adduser', type: 'string'},
                {name: 'modion', type: 'date'},
                {name: 'modiuser', type: 'string'},
		{name: 'addby', type: 'int'},
                {name: 'modiby', type: 'int'},
		{name: 'deleted', type: 'boolean'},
                
                {name: 'mode_create', type: 'string'},
                {name: 'read_type_mode', type: 'string'},
                

    ]
});