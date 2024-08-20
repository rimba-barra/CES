Ext.define('Gl.model.Subaccountcode', {
    extend: 'Ext.data.Model',
    alias: 'model.subaccountcodemodel',
    idProperty: 'subgl_id',
    fields: [        
        {name: 'subgl_id', type: 'int'},
        {name: 'project_id', type: 'int'},
        {name: 'pt_id', type: 'int'},
        {name: 'kelsub_id', type: 'int'}, //for get id by combobox
        {name: 'fromkelsub', type: 'string'}, //for get id by combobox
        {name: 'untilkelsub', type: 'string'}, //for get id by combobox
        {name: 'from', type: 'int'}, //for get id by combobox
        {name: 'until', type: 'int'}, //for get id by combobox
        {name: 'accountgroup', type: 'string'}, //for set in grid by combobox 
        {name: 'code1', type: 'string'},
        {name: 'code2', type: 'string'},
        {name: 'code3', type: 'int'}, //for get id by combobox
        {name: 'subdsk3', type: 'string'}, //for set in grid by combobox       
        {name: 'code4', type: 'int'}, //for get id by combobox
        {name: 'subdsk4', type: 'string'}, //for set in grid by combobox
        {name: 'code', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'hideparam', type: 'string'},
    ]
});