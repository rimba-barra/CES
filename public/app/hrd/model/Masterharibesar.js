Ext.define('Hrd.model.Masterharibesar', {
    extend: 'Ext.data.Model',
    alias: 'model.Masterharibesarmodel',
    idProperty: 'holiday_shift_id',
    fields: [
        {name: 'holiday_shift_id', type: 'int'},
        {name: 'holiday_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'holiday_name_id', type: 'int'},
        {name: 'holiday_name', type: 'string'},
    
    ]
});