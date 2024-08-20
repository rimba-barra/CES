Ext.define('Erems.model.Marketingstockunit', {
    extend: 'Ext.data.Model',
    alias: 'model.marketingstockunitmodel',
        
    idProperty: 'unit_id',

    fields: [
        {
            name: 'unit_id',
            type: 'int'
        },
        {
            name: 'cluster_id',
            type: 'int'
        },{
            name: 'cluster',
            type: 'string'
        },{
            name: 'cluster_code',
            type: 'string'
        },{
            name: 'unit_number',
            type: 'string'
        },{
            name: 'productcategory_id',
            type: 'int'
        },{
            name: 'productcategory',
            type: 'string'
        },{
            name: 'productcategory_code',
            type: 'string'
        },
        {
            name: 'type_id',
            type: 'int'
        },{
            name: 'type_name',
            type: 'string'
        },{
            name: 'type_code',
            type: 'string'
        },{
            name: 'block_id',
            type: 'int'
        },{
            name: 'block',
            type: 'string'
        },{
            name: 'block_code',
            type: 'string'
        },{
            name: 'position_id',
            type: 'int'
        },
        {
            name:'side_id',
            type:'int'
        },
        {
            name:'purpose_id',
            type:'int'
        },
        {
            name:'land_size',
            type:'decimal'
        },
        {
            name:'building_size',
            type:'decimal'
        },
        {
            name:'floor_size',
            type:'decimal'
        },
        {
            name:'floor',
            type:'int'
        },
        {
            name:'bedroom',
            type:'int'
        },
        {
            name:'bathroom',
            type:'int'
        },
        {
            name:'electricity',
            type:'decimal'
        },
        {
            name:'width',
            type:'decimal'
        },
        {
            name:'long',
            type:'decimal'
        },
        {
            name:'kelebihan',
            type:'decimal'
        },
        {
            name:'is_hookcalculated',
            type:'int'
        },
        {
            name:'is_tamancalculated',
            type:'int'
        },
        {
            name:'depan',
            type:'decimal'
        },
        {
            name:'samping',
            type:'decimal'
        },
        {
            name:'belakang',
            type:'decimal'
        },
        {
            name:'description',
            type:'decimal'
        },
        {
            name:'state_admistrative',
            type:'int'
        },
        {
            name:'konsepdasar',
            type:'decimal'
        },
        {
            name:'progress',
            type:'decimal'
        },
        {
            name:'number_start',
            type:'string'
        },
        {
            name:'number_end',
            type:'string'
        },
        {
            name:'mode_number_generator',
            type:'string'
        },
        {
            name:'number_check',
            type:'int'
        }
        
    ]
});

