Ext.define('Erems.model.Clusterfacilities', {
    extend: 'Ext.data.Model',
    alias: 'model.clusterfacilitiesmodel',

    idProperty: 'clusterfacilities_id',

    fields: [
        {
            name: 'clusterfacilities_id',
            type: 'int'
        },
        {
            name: 'code',
            type: 'string'
        },
        {
            name: 'layer_img',
            type: 'string'
        },{
            name: 'clusterfacilities',
            type: 'string'
        },
        {
            name: 'description',
            type: 'string'
        },
        {
            name:'active',
            type:'int'
        },
        {
            name:'detail'
        },
        {
            name:'edit_image_flag',
            type:'int'
        },{
            name:'cluster_id',
            type:'int'
        },{
            name:'facilitiestype_id',
            type:'int'
        },{
            name:'facilitiestype',
            type:'string'
        },{
            name:'cluster',
            type:'string'
        }
        
    ]
});