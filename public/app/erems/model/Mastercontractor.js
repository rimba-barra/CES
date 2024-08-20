Ext.define('Erems.model.Mastercontractor', {
    extend: 'Ext.data.Model',
    alias: 'model.mastercontractormodel',
        
    idProperty: 'contractor_id',

    fields: [
        {name: 'contractor_id',type: 'int'},{name: 'code',type: 'string'},{name: 'contractorname',type: 'string'},{name: 'address',type: 'string'},{name: 'telp',type: 'string'},{name: 'fax',type: 'string'},{name: 'email',type: 'string'},{name: 'PIC',type: 'string'},{name: 'city_id',type: 'int'},{name: 'kodepos',type: 'string'},{name: 'country_id',type: 'int'},{name: 'country_name',type: 'string'},{name: 'city_name',type: 'string'}
    ]
});