Ext.define('Erems.view.pengalihanhak.FormSearch', {
	extend        : 'Erems.library.template.view.FormSearch',
	alias         : 'widget.pengalihanhakformsearch',
	initComponent : function () {
		var me = this;

		Ext.applyIf(me, {
			defaults: me.generateDefaults(),
			items: [
				{
					xtype      : 'textfield',
					fieldLabel : 'Unit Number',
					itemId     : 'unit_number',
					name       : 'unit_number',
					anchor     : '-15'
				},
				{
					xtype          : 'clustercombobox',
					itemId         : 'fs_cluster_id',
					name           : 'cluster_id',
					anchor         : '-15',
					source         : 'cluster',
					store          : '',
					forceSelection : true,
					listeners      : {
                        beforequery : function(record){
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }
				},
				{
					xtype          : 'blockcombobox',
					itemId         : 'fs_block_id',
					name           : 'block_id',
					anchor         : '-15',
					source         : 'block',
					store          : '',
					forceSelection : true,
					listeners      : {
                        beforequery : function(record){
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }
				},
				{
					xtype      : 'xnamefieldEST',
					itemId     : 'customer_name',
					name       : 'customer_name',
					fieldLabel : 'Customer name',
					anchor     : '-15'
				},
				{
					xtype          : 'changeownershipreasoncombobox',
					name           : 'changeownershipreason_id',
					anchor         : '-15',
					source         : 'reason_change',
					store          : '',
					forceSelection : true,
					listeners      : {
                        beforequery : function(record){
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }
				},

				{
					xtype: 'panel',
					height: 48,
					bodyStyle: 'background:none;border:0;',
					anchor: '-15',
					layout: {
						type: 'column'
					},
					items: [
						{
							xtype: 'datefield',
							itemId: 'changeownership_startdate',
							name: 'changeownership_startdate',
							fieldLabel: 'Pengalihan Date',
							labelSeparator: '',
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
							text: 'to'
						},
						{
							xtype: 'datefield',
							itemId: 'changeownership_enddate',
							name: 'changeownership_enddate',
							fieldLabel: '&nbsp;',
							labelSeparator: '',
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
					xtype: 'textfield',
					itemId: 'description',
					name: 'description',
					fieldLabel: 'Note',
					anchor: '-15'
				},
			],
			dockedItems: me.generateDockedItems()
		});

		me.callParent(arguments);
	}
});