Ext.define('Erems.view.tunggakanipl.FormData', {
	extend: 'Erems.library.template.view.FormData',
	alias: 'widget.tunggakaniplformdata',
//	requires: [
//		'Erems.library.template.component.Clustercombobox'
//	],
	frame: true,
	autoScroll: true,
	anchorSize: 100,
//	height: 600,
	bodyBorder: true,
	bodyPadding: 10,
	bodyStyle: 'padding:5px 5px 0',
	defaults: {
		border: false,
		xtype: 'panel',
		flex: 1,
		layout: ''

	},
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
					name: 'purchaseletter_id'
				},
				{
					xtype: 'xmoneyfield',
					fieldStyle: '!important;text-align:right',
					maskRe: /[0-9\.]/,
					value: 0.00,
					labelWidth: '120px',
					name: 'tunggakan_ipl',
					fieldLabel: 'Nilai Tunggakan',
					allowBlank: false,
					hideTrigger: true,
					decimalPrecision: 2,
					listeners:{
						blur:function(el, val){
							if(el.getValue() <= 0){
			                    el.setValue(1);
			                    Ext.Msg.show({
			                        title: 'Failure',
			                        msg: 'Nilai tunggakan is required.',
			                        icon: Ext.Msg.ERROR,
			                        buttons: Ext.Msg.OK
			                    });
							}
						}
					}
				},
				{
					xtype         : 'xnotefieldEST',
					fieldLabel    : 'Catatan',
					labelClsExtra : 'small',
					labelWidth    : '120px',
					name          : 'tunggakan_ipl_note',
				},
			],
			dockedItems: me.generateDockedItem()
		});
		me.callParent(arguments);
	}
});

