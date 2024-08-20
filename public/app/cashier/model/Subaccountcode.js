Ext.define('Cashier.model.Subaccountcode', {
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
        //Rizal 31 Mei 2019
        {name: 'projectpt_id', type: 'int'},
        {name: 'ptname', type: 'string'},
        {name: 'projectname', type: 'string'},
        {name: 'active', type: 'string'},
        {name: 'addby_name', type: 'string'},
        // Seftian 02 Juli 2021
        {name: 'unit_erems', type: 'string'},
        //
        // Aji 30 SEP 2021
        {name: 'notes', type: 'string'},
        {name: 'unit_status', type: 'string'},
        //

    ]
});