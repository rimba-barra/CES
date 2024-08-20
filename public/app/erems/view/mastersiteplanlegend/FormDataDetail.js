Ext.define('Erems.view.mastersiteplanlegend.FormDataDetail', {
	extend: 'Erems.library.template.view.FormData',
	alias: 'widget.mastersiteplanlegendformdatadetail',
	requires: [
		'Erems.library.template.component.Siteplanparametercombobox',
		'Erems.library.template.component.Siteplanparameterrelationalcombobox',
		'Erems.library.template.component.Operatorcombobox'
	],
	autoScroll: true,
	anchorSize: 100,
	height: 150,
	bodyBorder: true,
	bodyPadding: 10,
	bodyStyle: 'border-top:none;border-left:none;border-right:none;',
	initComponent: function () {
		var me = this;
		Ext.applyIf(me, {
			defaults: {
				//labelAlign: 'top',
				labelSeparator: ' ',
				labelClsExtra: 'small',
				fieldStyle: 'margin-bottom:3px;',
				anchor: '100%'
			},
			items: [
				{
					xtype: 'hiddenfield',
					itemId: 'fdms_id',
					name: 'siteplanlegenddetail_id'
				},
				{
					xtype: 'container',
					layout: 'hbox',
					margin: '0 0 5px 0',
					defaults: {
						margin: '0 10px 0 0', labelSeparator: ' '
					},
					items: [
						{
							xtype: 'siteplanparametercombobox',
							labelWidth: '80px',
							itemId: 'fd_siteplanparameter',
							name: 'siteplanparameter_id',
							width: 200
						},
						{
							xtype: 'siteplanparameterrelationalcombobox',
							labelWidth: '80px',
							itemId: 'fd_siteplanparameterrelational',
							name: 'relational_id',
							width: 200,
							hidden: true
						},
						{
							xtype: 'operatorcombobox',
							itemId: 'fd_operator',
							name: 'operator',
							width: 50,
							hidden: true
						},
						{
							xtype: 'textfield',
							name: 'value',
							fieldStyle: 'text-align:right',
							maskRe: /[0-9\.]/,
							decimalPrecision: 2,
							width: 50,
							hidden: true
						},
						{
							xtype: 'radiogroup',
							//columns: 1,
							width: 100,
//							fieldLabel: 'Laporan Type',
							name: 'radiogroup_boolean',
							hidden: true,
							items: [
								{
									xtype: 'radiofield',
									boxLabel: 'Yes',
									name: 'radio_boolean',
									inputValue: '1',
									itemId: 'yes',
									checked: true
								},
								{
									xtype: 'radiofield',
									boxLabel: 'No',
									name: 'radio_boolean',
									inputValue: '0',
									itemId: 'no'
								}
							]
						}
					]
				},
			],
			dockedItems: me.generateDockedItem()
		});
		me.callParent(arguments);
	}
});

