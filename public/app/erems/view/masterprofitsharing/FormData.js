Ext.define('Erems.view.masterprofitsharing.FormData', {
	extend: 'Erems.library.template.view.FormData',
	alias: 'widget.masterprofitsharingformdata',
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
				labelSeparator: ' ',
				labelClsExtra: 'small',
				fieldStyle: 'margin-bottom:3px;',
				anchor: '100%'
			},
			items: [{
				xtype: 'hiddenfield',
				itemId: 'fdms_id',
				name: 'profitsharing_id'
			},
			{
				layout: 'hbox',
				bodyStyle: 'border:0px;background:none;',
				width: '100%',
				margin:'0px 0px 10px 0px',
				items: [{
						xtype: 'textfield',
						itemId: 'fdms_code',
						name: 'code',
						fieldLabel: 'Kode',
						allowBlank: false,
						anchor: '-5',
						maskRe: /[A-Za-z0-9\s.]/,
						enforceMaxLength:true,
						minLength:2,
						maxLength:5
					},
					{xtype: 'label', text: '', flex: 1, margin: '0 0 0 10px'}
				]
			},
			{
				xtype: 'textfield',
				itemId: 'fdms_keterangan',
				name: 'keterangan',
				fieldLabel: 'Name',
				allowBlank: false,
				anchor: '-5',
				maskRe: /[A-Za-z0-9\s.-]/,
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
					fieldLabel: 'Komisi Marketing',
					labelClsExtra: 'small',
					anchor: '100%',
					name: 'komisi_marketing',
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
			{
				layout: 'hbox',
				bodyStyle: 'border:0px;background:none;',
				width: '100%',
				items: [{
						xtype: 'xmoneyfieldEST',
						fieldLabel: 'Tanah/Meter awal Rp. ',
						labelClsExtra: 'small',
						anchor: '100%',
						name: 'tanah_permeter_awal',
						allowBlank: false,
						maskRe: /[0-9\.]/,
						hideTrigger: true,
						decimalPrecision: 2,
						flex: 1,
						value: 0.00,
                        listeners:{
                            afterrender: {
                                buffer: 500,
                                fn: function(){
                                    var val = me.down("[name=tanah_permeter_awal]");
                                    var res = Ext.util.Format.number((val.getValue()), '0,000.00');

                                    val.setValue(res);

                                }
                            }
                        }
					},
					{xtype: 'label', text: '', flex: 1, margin: '0 0 0 10px'}
				]
			},
			{	
				layout: 'hbox',
				bodyStyle: 'border:0px;background:none;',
				width: '100%',
				items: [{
						xtype: 'xmoneyfieldEST',
						fieldLabel: 'Nilai Lahan Gross Rp. ',
						labelClsExtra: 'small',
						anchor: '100%',
						name: 'nilai_lahan_gross',
						allowBlank: false,
						maskRe: /[0-9\.]/,
						hideTrigger: true,
						decimalPrecision: 2,
						flex: 1,
						value: 0.00,
                        listeners:{
                            afterrender: {
                                buffer: 500,
                                fn: function(){
                                    var val = me.down("[name=nilai_lahan_gross]");
                                    var res = Ext.util.Format.number((val.getValue()), '0,000.00');

                                    val.setValue(res);

                                }
                            }
                        }
					},
					{xtype: 'label', text: '', flex: 1, margin: '0 0 0 10px'}
				]
			},
			{
				layout: 'hbox',
				bodyStyle: 'border:0px;background:none;',
				width: '100%',
				margin:'0px 0px 10px 0px',
				items: [{
					xtype: 'textfield',
					fieldLabel: 'Efisiensi Lahan',
					labelClsExtra: 'small',
					anchor: '100%',
					name: 'efisiensi_lahan',
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
			],
			dockedItems: me.generateDockedItem()
		});

		me.callParent(arguments);
	}
});
