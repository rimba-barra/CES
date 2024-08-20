Ext.define('Erems.model.Formundanganajb', {
        extend: 'Ext.data.Model',
        alias: 'model.formundanganajbmodel',
        idProperty: 'hgbajb_id',
        fields: [
                { name: 'cluster', type: 'string' },
                { name: 'cluster_code', type: 'string' },
                { name: 'block', type: 'string' },
                { name: 'block_id', type: 'int' },
                //                {name: 'unit_number', type: 'string'},
                { name: 'unit_id', type: 'id' },
                { name: 'purchaseletter_no', type: 'string' },
                { name: 'customer_id', type: 'int' },
                { name: 'customer_name', type: 'string' },
                { name: 'imb_no', type: 'string' },
                { name: 'hgbinduk', type: 'string' },
                { name: 'hgb_number', type: 'string' },
                { name: 'ajb_number', type: 'string' },
                { name: 'pt_hgb_no', type: 'string' },
                { name: 'buktipemilik_id', type: 'int' },
                { name: 'hgbajb_id', type: 'int' },
                { name: 'construction', type: 'string' },
                { name: 'nomor_undangan', type: 'string' },
                { name: 'jam_janjian_ajb', type: 'time' },
                //		{name: 'type_id', type: 'int'},
                //		{name: 'type_name', type: 'string'},

                { name: 'unit_cluster_id', type: 'int' },
                { name: 'block_code', type: 'string' },
                { name: 'unit_block_id', type: 'int' },
                { name: 'unit_unit_number', type: 'string' },
                { name: 'unit_pt_name', type: 'string' },
                { name: 'unit_productcategory', type: 'string' },
                { name: 'unit_type_name', type: 'string' },
                { name: 'unit_land_size', type: 'string' },
                { name: 'unit_building_size', type: 'string' },
                { name: 'unit_kelebihan', type: 'string' },
                { name: 'unit_long', type: 'string' },
                { name: 'unit_width', type: 'string' },
                { name: 'unit_floor', type: 'string' },


        ]
});