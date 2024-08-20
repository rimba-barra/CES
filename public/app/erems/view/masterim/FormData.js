Ext.define('Erems.view.masterim.FormData', {
	extend: 'Erems.library.template.view.FormData',
	alias: 'widget.masterimformdata',
	requires: [
//		'Erems.library.template.component.Namapenerimakomisicombobox',
		'Erems.library.template.component.Distchannelcombobox',
		'Erems.view.masterim.GridDetail'
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
					name: 'internalmemo_id'
				},
				{
					xtype: 'textfield',
					fieldLabel: 'Nomor IM',
					labelWidth: '120px',
					name: 'nomor_im',
					allowBlank: false,
					anchor: '60%'
				},
				{
					xtype        : 'datefield',
					labelWidth   : '120px',
					allowBlank   : false,
					fieldLabel   : 'Tanggal IM',
					name         : 'tanggal_im',
					format       : 'd-m-Y',
					submitFormat : 'Y-m-d H:i:s.u',
					anchor       : '60%',
					editable     : false
				},
				{
					xtype        : 'datefield',
					labelWidth   : '120px',
					allowBlank   : false,
					fieldLabel   : 'Periode Start',
					itemId       : 'periode_start',
					name         : 'periode_start',
					format       : 'd-m-Y',
					submitFormat : 'Y-m-d H:i:s.u',
					anchor       : '60%',
					editable     : false,
					listeners 	 : {
						change : function(el, value){
							var periode_end = Ext.ComponentQuery.query("[name=periode_end]")[0];

							if(periode_end.getValue() != null){
								if(value >= periode_end.getValue()){
									periode_end.setValue('');

									Ext.Msg.alert('Info', 'Periode Start harus lebih kecil dari periode end!');
								}else{
									periode_end.setDisabled(false);
								}
							}else{
								periode_end.setDisabled(false);
							}
						}
					}
				},
				{
					xtype        : 'datefield',
					labelWidth   : '120px',
					allowBlank   : false,
					fieldLabel   : 'Periode End',
					itemId       : 'periode_end',
					name         : 'periode_end',
					format       : 'd-m-Y',
					submitFormat : 'Y-m-d H:i:s.u',
					anchor       : '60%',
					editable     : false,
					disabled     : true,
					listeners 	 : {
						change : function(el, value){
							var periode_start = Ext.ComponentQuery.query("[name=periode_start]")[0].getValue();

							if(value <= periode_start){
								el.setValue('');
								Ext.Msg.alert('Info', 'Periode End harus lebih besar dari periode start!');
							}
						}
					}
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
							xtype: 'masterimgriddetail',
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

