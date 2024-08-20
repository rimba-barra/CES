Ext.define('Erems.view.masterpencairankomisi.FormData', {
	extend: 'Erems.library.template.view.FormData',
	alias: 'widget.masterpencairankomisiformdata',
	requires: [
//		'Erems.library.template.component.Namapenerimakomisicombobox',
		'Erems.library.template.component.Distchannelcombobox',
		'Erems.view.masterpencairankomisi.GridDetail'
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
					name: 'komisi_pencairan_id'
				},
				{
					xtype: 'textfield',
					fieldLabel: 'Kode',
					labelWidth: '120px',
					name: 'code',
					allowBlank: false,
					anchor: '60%'
				},
				{
					xtype: 'distchannelcombobox',
					labelWidth: '120px',
					forceSelection: true,
					name: 'komisi_distributionchannel_id',
					allowBlank: false,
					anchor: '60%'
				},
				{
					xtype: 'textfield',
					fieldLabel: 'Judul Komisi',
					labelWidth: '120px',
					name: 'judul_komisi',
					allowBlank: false,
					anchor: '60%'
				},
				{
					xtype         : 'xnotefieldEST',
					fieldLabel    : 'Description',
					labelClsExtra : 'small',
					labelWidth    : '120px',
					name          : 'description',
					anchor        : '60%'
				},
				{
					xtype: 'container',
					bodyStyle: 'border:0px',
					items: [
						{
							xtype: 'masterpencairankomisigriddetail',
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

