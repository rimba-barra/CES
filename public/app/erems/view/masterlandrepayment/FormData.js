Ext.define('Erems.view.masterlandrepayment.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.masterlandrepaymentformdata',
	requires:[
		'Erems.view.masterlandrepayment.GridDetail'
	],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
	//height: 600,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                //labelAlign: 'top',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [{
                    xtype: 'hiddenfield',
                    itemId: 'fdms_id',
                    name: 'landrepayment_id'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_code',
                    name: 'code',
                    fieldLabel: 'Code',
                    allowBlank: false,
                    anchor: '-5',
                    maskRe: /[A-Za-z0-9\s.]/,
                    enforceMaxLength:true,
                    minLength:2,
                    maxLength:5
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_keterangan',
                    name: 'keterangan',
                    fieldLabel: 'Keterangan',
                    allowBlank: false,
                    anchor: '-5',
                    maskRe: /[A-Za-z0-9\s.]/,
                    enforceMaxLength:true,
                    minLength:3,
                    maxLength:50
                },
				{
					layout: 'hbox',
					bodyStyle: 'border:0px;background:none;',
					width: '100%',
					items: [{
							xtype: 'textfield',
							fieldLabel: 'Management Fee',
							labelClsExtra: 'small',
			                anchor: '100%',
							name: 'management_fee',
							allowBlank: false,
                  			maskRe: /[0-9\.]/,
							hideTrigger: true,
							decimalPrecision: 2,
							flex: 1,
							value:1,
							listeners:{
								change:function(el, v, prev){
									var commaPos = v.indexOf('.')+1,
									strLen = v.length;
									if(commaPos > 0 && commaPos < strLen-2){
										el.setValue(prev);
									}

									if(el.value > 100){
				                        el.setValue(100);
				                    }else if(el.value < 0){
				                        el.setValue(1);
				                    }

								}
							}
						},
						{xtype: 'label', text: '%', flex: 1, margin: '0 0 0 10px'}
					]
				},
				/*{
                    xtype: 'textfield',
                    itemId: 'fdms_management_fee',
                    name: 'management_fee',
                    fieldLabel: 'Management Fee',
                    allowBlank: false,
                  	maskRe: /[0-9\.]/,
                    anchor: '-5'
                },*/
				{
					padding: '5px 0 0 0',
					layout: 'hbox',
					bodyStyle: 'border:0px;background:none;',
					width: '100%',
					items: [{
							xtype: 'textfield',
							fieldLabel: 'Royalty',
							labelClsExtra: 'small',
			                anchor: '100%',
							name: 'royalty',
							allowBlank: false,
                  			maskRe: /[0-9\.]/,
							hideTrigger: true,
							decimalPrecision: 2,
							flex: 1,
							value:1,
							listeners:{
								change:function(el, v, prev){
									var commaPos = v.indexOf('.')+1,
									strLen = v.length;
									if(commaPos > 0 && commaPos < strLen-2){
										el.setValue(prev);
									}

									if(el.value > 100){
				                        el.setValue(100);
				                    }else if(el.value < 0){
				                        el.setValue(1);
				                    }

								}
							}
						},
						{xtype: 'label', text: '%', flex: 1, margin: '0 0 0 10px'}
					]
				},
                /*{
                    xtype: 'textfield',
                    itemId: 'fdms_royalty',
                    name: 'royalty',
                    fieldLabel: 'Royalty',
					allowBlank: false,
                    maskRe: /[0-9\.]/,
                    anchor: '-5'
                },*/
				{
					//  bodyPadding: 10,
					xtype: 'fieldset',
					title: 'Detail Nilai Pembayaran',
					//flex: 2,
					margin: '10px 0 0 0',
					layout: 'vbox',
					bodyStyle: 'border:10px',
					items: [
						{
							xtype            : 'xnumericfieldEST',
							name             : 'nomor',
							fieldLabel       : 'Nomor',
							allowBlank       : false,
							anchor           : '-5',							
							labelWidth       : 135,
						},
						{
							xtype: 'datefield',
							fieldLabel: 'Periode Awal',
							anchor: '-5',
							name: 'periode_awal',
							flex: 1,
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u',
							value: new Date(),
							editable:false,
							allowBlank:false,							
							labelWidth: 135,
						},
						{
							xtype: 'datefield',
							fieldLabel: 'Periode Akhir',
							anchor: '-5',
							name: 'periode_akhir',
							flex: 1,
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u',
							value: new Date(),
							editable:false,
							allowBlank:false,							
							labelWidth: 135,
						},
						
						{
							layout: 'hbox',
							bodyStyle: 'border:0px',
							width: '100%',
							bodyStyle: 'border:10px;background:none;',
							fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
							items: [{
									xtype: 'textfield',
									name: 'nilai_pembayaran',
									fieldLabel: 'Nilai Pembayaran LRP',
									//allowBlank: false,
									enforceMaxLength: true,
									maskRe: /[0-9\.]/,
									labelWidth: 135,
									anchor: '-5',
									currencyFormat: true,
									decimalPrecision: 2,
									enforceMaxLength:true,
									maxLength:13,
									// listeners:{
									// 	change:function(el, v, prev){
									// 		var commaPos = v.indexOf('.')+1,
									// 		strLen = v.length;

									// 		if((commaPos <= 0 && v.length > 10) || (commaPos > 0 && commaPos < strLen-2)){
									// 			el.setValue(prev);
									// 		}
									// 	}
									// }
								},
							]
						},
						//added by anas 04102021
						{
							layout: 'hbox',
							bodyStyle: 'border:10px;background:none;',
							fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
							items: [{
									xtype: 'textfield',
									fieldLabel: 'Efisiensi',
									labelClsExtra: 'small',
									name: 'efisiensi',
		                  			maskRe: /[0-9\.]/,
									decimalPrecision: 2,
									labelWidth: 135,
									flex: 1,
									value:0,
									anchor: '-5',
									hidden: true,
									listeners:{
										change:function(el, v, prev){
											var commaPos = v.indexOf('.')+1,
											strLen = v.length;
											if(commaPos > 0 && commaPos < strLen-2){
												el.setValue(prev);
											}

											if(el.value > 100){
						                        el.setValue(100);
						                    }else if(el.value < 0){
						                        el.setValue(0);
						                    }
										}
									}
								},
								{xtype: 'label', 
									name: 'lblefisiensi',text: '%', flex: 1, margin: '0 0 0 10px'}
							]
						},
						//end added by anas
						{
							xtype: 'button',
							text: 'Add',
							padding: '2px 5px',
							action: 'save_detail',
							//iconCls: 'icon-save',
							style: 'background-color:#FFC000;'
						},
					]
				},

				{
					//  bodyPadding: 10,
					padding: '10px 0 0 0',
					layout: 'hbox',
					bodyStyle: 'border:0px',
					items: [{
							xtype: 'masterlandrepaymentgriddetail',
							width: '100%',
							itemId: 'MyMasterlandrepaymentdetailGrid'
					}]
				},
				
			],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

