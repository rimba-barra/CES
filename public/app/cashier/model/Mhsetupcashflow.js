Ext.define('Cashier.model.Mhsetupcashflow', {
    extend    : 'Ext.data.Model',
    alias     : 'model.Mhsetupcashflowmodel',
    idProperty: 'setupcashflow_id',
    fields    : [
        {name: 'setupcashflow_id', type: 'int'},
        {name: 'project_id', type: 'int'},
        {name: 'projectname', type: 'string'},
        {name: 'pt_id', type: 'int'},
        {name: 'ptname', type: 'string'},
        {name: 'department_id', type: 'int'},
        {name: 'department', type: 'string'},
        {name: 'department_code', type: 'string'},
        {name: 'cashflowtype_id', type: 'int'},
        {name: 'cashflowtype', type: 'string'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'hideparam', type: 'string'},
        {name: 'is_link_coa', type: 'number'},
        {name: 'count_cd', type: 'string'},
        {name: 'count_vdr', type: 'string'},
        {name: 'count_v', type: 'string'},
        {name: 'count_j', type: 'string'},
        {name: 'grouptype', type: 'string'}
    ]
});