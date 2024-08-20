Ext.define('Hrd.model.Popuphcms', {
    extend: 'Ext.data.Model',
    alias: 'model.popuphcmsmodel',
    //updated by anas 14032022
    // idProperty: 'employee_id',
    idProperty: 'RowNum',
    //end updated by anas
    fields: [
        {name: 'employee_id', type: 'int'},
        {name: 'employee_nik', type: 'string'},
        {name: 'employee_name', type: 'string'},
        {name: 'datedata', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'note', type: 'string'},
        {name: 'note_highlight', type: 'string'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'mode_read', type: 'string'},

        //added by anas 14032022        
        {name: 'RowNum', type: 'int'},
    ]
});