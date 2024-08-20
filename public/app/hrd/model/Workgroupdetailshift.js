Ext.define('Hrd.model.Workgroupdetailshift', {
    extend: 'Ext.data.Model',
    alias: 'model.workgroupdetailshiftmodel',
    idProperty: 'workgroupdetailshift_id',
    fields: [
        {name: 'hideparam', type: 'string'},
        {name: 'workgroupdetailshift_id', type: 'int'},
        {name: 'workgroup_id', type: 'int'},
        {name: 'shifttype_id', type: 'int'},
        {name: 'shifttype', type: 'string'},
        {name: 'indexdata', type: 'int'},
	{name: 'status_dayofweek', type: 'boolean'},//0 = hitungan terhadap counter,1=hitungan terhadap day of week
        {name: 'counterdays', type: 'int'},
        {name: 'active', type: 'bit'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'statedata', type: 'string'},
    ]
});