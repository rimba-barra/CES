Ext.define('Cashier.model.Subaccountgroup', {
    extend: 'Ext.data.Model',
    alias: 'model.subaccountgroupmodel',
    idProperty: 'kelsub_id',
    fields: [
        {name: 'kelsub_id', type: 'int'},
        {name: 'grade', type: 'string'},
        {name: 'fromkelsub', type: 'string'},
        {name: 'untilkelsub', type: 'string'},
        {name: 'project_id', type: 'int'},
        {name: 'pt_id', type: 'int'},
        {name: 'kelsub', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted_sub', type: 'boolean'},
        {name: 'hideparam', type: 'string'},
        //Rizal 31 Mei 2019
        {name: 'projectpt_id', type: 'int'},
        {name: 'ptname', type: 'string'},
        {name: 'projectname', type: 'string'},
        //
    ]
});