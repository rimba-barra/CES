Ext.define('Erems.view.admincollectioncashier.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    alias:'widget.admincollectioncashierformsearch',
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
                    xtype: 'panel',
                    height: 48,
                    bodyStyle:'background:none;border:0;',
					anchor:'-15',
                    layout: {
                        type: 'column'
                    },
                    items: [
						{
							xtype: 'numberfield',
							minValue: 0,
							itemId: 'kavling_number_start',
							name: 'kavling_number_start',
							fieldLabel: 'Kavling Number',
							labelSeparator:'',
							width: 100,
							labelAlign: 'top',
						},
						{
							xtype: 'label',
							margin: '23px 5px 0 5px',
							styleHtmlContent: false,
							width: 10,
							text:'to'
						},
						{
							xtype: 'numberfield',
							minValue: 0,
							itemId: 'kavling_number_end',
							name: 'kavling_number_end',
							fieldLabel: '&nbsp;',
							labelSeparator:'',
							width: 100,
							labelAlign: 'top',
						},
                    ]
                },*/
				
				{
					xtype      : 'xnamefieldEST',
					itemId     : 'customer_name',
					name       : 'customer_name',
					fieldLabel : 'Customer name',
					anchor     :'-15'
                },
				{
                    xtype: 'panel',
                    height: 48,
                    bodyStyle:'background:none;border:0;',
					anchor:'-15',
                    layout: {
                        type: 'column'
                    },
                    items: [
						{
							xtype: 'datefield',
							itemId: 'purchase_startdate',
							name: 'purchase_startdate',
							fieldLabel: 'Purchase date',
							labelSeparator:'',
							width: 100,
							labelAlign: 'top',
							editable: false,
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u'
						},
						{
							xtype: 'label',
							margin: '23px 5px 0 5px',
							styleHtmlContent: false,
							width: 10,
							text:'to'
						},
						{
							xtype: 'datefield',
							itemId: 'purchase_enddate',
							name: 'purchase_enddate',
							fieldLabel: '&nbsp;',
							labelSeparator:'',
							width: 100,
							labelAlign: 'top',
							editable: false,
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u'
						},
                    ]
                },
				{
					xtype: 'pricetypecombobox',
					fieldLabel: 'Price Type',
					name: 'pricetype_id',
					anchor:'-15'
				}
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});