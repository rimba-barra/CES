Ext.define('Erems.view.sppjb.FormSearch', {
	extend: 'Erems.library.template.view.FormSearch',
	alias: 'widget.sppjbformsearch',
	requires: [
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Blockcombobox',
		'Erems.library.template.component.Unitcombobox'
	],
	initComponent: function () {
		var me = this;

		Ext.applyIf(me, {
			defaults: me.generateDefaults(),
			items: [
				{
					xtype: 'textfield',
					fieldLabel: 'Unit Number',
					itemId: 'unit_number',
					name: 'unit_number',
					anchor: '-15',
					enableKeyEvents: true
				},
				{
					xtype: 'clustercombobox',
					itemId: 'fs_cluster_id',
					name: 'cluster_id',
					anchor: '-15'

				},
				{
					xtype: 'blockcombobox',
					itemId: 'fs_block_id',
					name: 'block_id',
					anchor: '-15'

				},
				{
					xtype: 'unitcombobox',
					itemId: 'fs_unit_id',
					name: 'unit_id',
					anchor: '-15',
					hidden: true

				},

				{
					xtype           : 'xnamefieldEST',
					fieldLabel      : 'Customer Name',
					itemId          : 'customer_name',
					name            : 'customer_name',
					anchor          : '-15',
					enableKeyEvents : true
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
							itemId: 'sppjb_startdate',
							name: 'sppjb_startdate',
							fieldLabel: 'SPPJB Date',
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
							itemId: 'sppjb_enddate',
							name: 'sppjb_enddate',
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
							itemId: 'handover_startdate',
							name: 'handover_startdate',
							fieldLabel: 'Hand Over Date',
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
							itemId: 'handover_enddate',
							name: 'handover_enddate',
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
							itemId: 'sign_startdate',
							name: 'sign_startdate',
							fieldLabel: 'Sign Date',
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
							itemId: 'sign_enddate',
							name: 'sign_enddate',
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
                    xtype: 'checkboxfield',
                    fieldLabel: 'Cancel Data',
                    name: 'is_cancel',
                    checked: false,
                    inputValue: '1',
                    uncheckedValue: '0',
                    margin: '0 5px 0 0',
                    width: 20
                }
			],
			dockedItems: me.generateDockedItems()
		});

		me.callParent(arguments);
	}
});