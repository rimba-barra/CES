Ext.define('Erems.model.MasterpricelistType', {
    extend: 'Ext.data.Model',
    alias: 'model.masterpricelistTypemodel',
    idProperty: 'type_id',
    fields: [
        {
            name:'type_id',
            type: 'int'
        },
        {
            name:'code',
            type: 'string'
        },
        {
            name:'productcategory_id',
            type: 'int'
        },
        {
            name:'cluster_id',
            type: 'int'
        },
        {
            name:'name',
            type: 'string'
        },
        {
            name:'land_size',
            type: 'string'
        },
        {
            name:'building_size',
            type: 'string'
        },
        {
            name:'floor_size',
            type: 'string'
        },
        {
            name:'floor',
            type: 'string'
        },
        {
            name:'bedroom',
            type: 'string'
        },
        {
            name:'bathroom',
            type: 'string'
        },
        {
            name:'electricity',
            type: 'string'
        },
        {
            name:'width',
            type: 'int'
        },
        {
            name:'long',
            type: 'string'
        },
        {
            name:'kelebihan',
            type: 'string'
        },
        {
            name:'building_class',
            type: 'string'
        },
        {
            name:'salesgroup',
            type: 'string'
        },
        {
            name:'description',
            type: 'string'
        },
        {
            name:'cluster_cluster_id',
            type: 'int'
        },
        {
            name:'cluster_code',
            type: 'string'
        },
        {
            name:'cluster_cluster',
            type: 'string'
        },
        {
            name:'productcategory_productcategory_id',
            type: 'int'
        },
        {
            name:'productcategory_project_id',
            type: 'int'
        },
        {
            name:'productcategory_pt_id',
            type: 'int'
        },
        {
            name:'productcategory_code',
            type: 'string'
        },
        {
            name:'productcategory_productcategory',
            type: 'string'
        },
        {
            name:'productcategory_description',
            type: 'string'
        },
        {
            name:'typeattribute'
        },
        {
            name:'deletedRows'
        }
    ]
});