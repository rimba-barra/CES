Ext.define('Hrd.model.Holidayname', {
    extend: 'Ext.data.Model',
    alias: 'model.Holidaynamemodel',
    idProperty: 'holiday_name_id',
    fields: [
        {name: 'holiday_name_id', type: 'int'},
        {name: 'holiday_name', type: 'string', mapping: "holiday_name"},
        {name: 'shifttype_id', type: 'int'},
    
    ]
});