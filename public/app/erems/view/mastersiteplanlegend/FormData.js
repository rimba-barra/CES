Ext.define('Erems.view.mastersiteplanlegend.FormData', {
	extend: 'Erems.library.template.view.FormData',
	alias: 'widget.mastersiteplanlegendformdata',
	requires: [
//		'Erems.library.template.component.Namapenerimakomisicombobox',
//		'Erems.library.template.component.Distchannelcombobox',
		'Erems.view.mastersiteplanlegend.GridDetail'
	],
	autoScroll: true,
	anchorSize: 100,
	//height: 600,
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
					name: 'siteplanlegend_id'
				},
				{
					xtype: 'container',
					layout: 'hbox',
					margin: '0 0 5px 0',
					defaults: {
						margin: '0 20px 0 0', labelSeparator: ' '
					},
					items: [
						{
							xtype: 'filefield',
							fieldLabel: 'File SVG',
							labelWidth: '120px',
							itemId: 'file_svg',
							name: 'file_svg',
							emptyText: 'Select SVG File',
							buttonText: 'Browse',
							allowBlank: false,
							flex: 2
						},
						{
							xtype: 'label',
							text: '',
							width: 20,
							margin: '5px 0 0 -15px',
							flex: 3
						}
					]
				},

				{
					xtype: 'container',
					layout: 'hbox',
					margin: '0 0 5px 0',
					defaults: {
						margin: '0 20px 0 0', labelSeparator: ' '
					},
					items: [
						{
							xtype: 'textfield',
							fieldLabel: 'Code Prefix SVG',
//							fieldStyle: 'background:none;background-color:#FFFFFF !important;text-align:right;',
//							maskRe: /[0-9\.]/,
//							value: 0.00,
							labelWidth: '120px',
							name: 'prefixcode_svg',
							allowBlank: false,
							hideTrigger: true,
							flex: 2,
						},
						{
							xtype: 'label',
							text: 'Cth: {unit number} - {code prefix}',
							width: 20,
							margin: '5px 0 0 -15px',
							flex: 3
						}
					]
				},
				{
					xtype: 'container',
					layout: 'hbox',
					margin: '0 0 5px 0',
					defaults: {
						margin: '0 20px 0 0', labelSeparator: ' '
					},
					items: [
						{
							xtype: 'textfield',
							fieldLabel: 'ID Legend SVG',
							labelWidth: '120px',
							name: 'legendid_svg',
							allowBlank: false,
							flex: 2,
						},
						{
							xtype: 'label',
							text: '',
							width: 20,
							margin: '5px 0 0 -15px',
							flex: 3
						}
					]
				},
				{
					xtype: 'container',
					layout: 'hbox',
					margin: '0 0 5px 0',
					defaults: {
						margin: '0 20px 0 0', labelSeparator: ' '
					},
					items: [
						{
							xtype: 'textfield',
							fieldLabel: 'Color Legend',
							labelWidth: '120px',
							name: 'color',
							allowBlank: false,
							width: 50,
							flex: 2
						},
						{
							xtype: 'label',
							text: 'RGB or #Hex',
							width: 20,
							margin: '5px 0 0 -15px',
							flex: 3
						}
					]
				},
				{
					xtype      : 'xnotefieldEST',
					itemId     : 'description',
					labelWidth : '120px',
					name       : 'description',
					fieldLabel : 'Description',
					anchor     : '-5'
				},
				{
					xtype: 'container',
					bodyStyle: 'border:0px',
					items: [
						{
							xtype: 'mastersiteplanlegendgriddetail',
							height: 200,
							margin: '10 0 5 0'
						}
					]
				}
			],
			dockedItems: me.generateDockedItem()
		});
		me.callParent(arguments);
	}
});

