Ext.define('Cashier.model.Benchmarking', {
    extend: 'Ext.data.Model',
    alias: 'model.benchmarkingmodel',
    idProperty: 'benchmarking_id',
    fields: [
        {name: 'benchmarking_id', type: 'int'},
        {name: 'benchmarking_name', type: 'string'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'active', type: 'boolean'},
        {name: 'deleted', type: 'boolean'},
    ]
});