Ext.define('Erems.view.masterdistchannel.FormData', {
	extend: 'Erems.library.template.view.FormData',
	alias: 'widget.masterdistchannelformdata',
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
					name: 'komisi_distributionchannel_id'
				},
				{
					xtype: 'textfield',
					fieldLabel: 'Kode',
					labelWidth: '120px',
					name: 'code',
					allowBlank: false,
				},
				{
					xtype: 'textfield',
					fieldLabel: 'Distribution Channel',
					labelWidth: '120px',
					name: 'distributionchannel',
					allowBlank: false,
				},
				{
					xtype         : 'xnotefieldEST',
					fieldLabel    : 'Description',
					labelClsExtra : 'small',
					labelWidth    : '120px',
					name          : 'description',
				},
			],
			dockedItems: me.generateDockedItem()
		});

		me.callParent(arguments);
	}
});

