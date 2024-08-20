Ext.define('Erems.view.sspssb.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    alias:'widget.sspssbformsearch',
	initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
           		 {
					xtype: 'textfield',
					fieldLabel: 'Unit Number',
					itemId: 'unit_number',
					name: 'unit_number',
					anchor:'-15'
				},
                {
                    xtype: 'clustercombobox',
                    itemId: 'fs_cluster_id',
                    name: 'cluster_id',
                    anchor:'-15'

                },
				{
                    xtype: 'blockcombobox',
                    itemId: 'fs_block_id',
                    name: 'block_id',
                    anchor:'-15'

                },
				/*{
                    xtype: 'unitcombobox',
                    itemId: 'fs_unit_id',
                    name: 'unit_id',
                    anchor:'-15'

                },*/
				// {
                    // xtype: 'panel',
                    // height: 48,
                    // bodyStyle:'background:none;border:0;',
					// anchor:'-15',
                    // layout: {
                        // type: 'column'
                    // },
                    // items: [
						// {
							// xtype: 'numberfield',
							// minValue: 0,
							// itemId: 'kavling_number_start',
							// name: 'kavling_number_start',
							// fieldLabel: 'Kavling Number',
							// labelSeparator:'',
							// width: 100,
							// labelAlign: 'top',
						// },
						// {
							// xtype: 'label',
							// margin: '23px 5px 0 5px',
							// styleHtmlContent: false,
							// width: 10,
							// text:'to'
						// },
						// {
							// xtype: 'numberfield',
							// minValue: 0,
							// itemId: 'kavling_number_end',
							// name: 'kavling_number_end',
							// fieldLabel: '&nbsp;',
							// labelSeparator:'',
							// width: 100,
							// labelAlign: 'top',
						// },
                    // ]
                // },
				
				//for load notaris to form data
				/*{
                    xtype: 'notariscombobox',
                    itemId: 'fd_notaris_id',
                    name: 'notaris_id',
                    anchor:'-15',
					hidden: true,
                },*/
				{
					fieldLabel:'Customer',
					xtype: 'textfield',
					itemId:'fs_customer',
					name: 'customer_id',
					anchor:'-15'
				},
				{
                    xtype: 'projectptcombobox',
                    itemId: 'fs_pt_id',
                    name: 'pt_id',
                    anchor:'-15'

                },
				{
                    xtype: 'typecombobox',
                    itemId: 'fs_type_id',
                    name: 'type_id',
                    anchor:'-15'

                },
				{
                    xtype      : 'xnumericfieldEST',
                    itemId     : 'tax_year',
                    name       : 'tax_year',
                    fieldLabel : 'Tahun Pajak',
                    anchor     : '-15',
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});