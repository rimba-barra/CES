Ext.define('Erems.view.pphpayment.FormData', {
	extend: 'Main.library.FormData',
	
	alias: 'widget.PphpaymentFormData',
	itemId: 'PphpaymentFormData',
	
	width: 1050,
		
	initComponent: function() {
		var me = this;
        Ext.applyIf(me, {
			items: [
				{
                    xtype: 'hiddenfield',
                    itemId: 'purchaseletter_id',
                    name: 'purchaseletter_id'
				},
				{
					xtype: 'fieldset',
					title: '<b>UNIT & PURCHASELETTER INFORMATION</b>',
					margin: '0 0 15 0',
					style: 'border-left:none;border-right:none;border-bottom:none;',
					defaults: {
						maxLength: 50,
						enforceMaxLength: true,
						maskRe: /[^\`\"\']/,
						labelSeparator: ' ',
						labelClsExtra: 'small',
						labelWidth: 90,				
						anchor: '100%'
					},
					items: [
						{
							xtype: 'fieldcontainer',
							layout: 'column',	
							defaults: {								
								maxLength: 50,
								enforceMaxLength: true,
								maskRe: /[^\`\"\']/,
								labelSeparator: ' ',
								labelClsExtra: 'small',
								labelWidth: 90,				
								anchor: '100%',
								columnWidth: 0.48,
								readOnly: true
							},					
							items: [								
								{
									xtype: 'textfield',
									fieldLabel: 'Purchaseletter No.',
									itemId: 'purchaseletter_no',
									name: 'purchaseletter_no',
									style: 'margin-right:10px;'
								},
								{
									xtype: 'datefield',
									fieldLabel: 'Purchase Date',
									itemId: 'purchase_date',
									name: 'purchase_date',
									format: 'd-M-Y',
									altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
									submitFormat: 'Y-m-d H:i:s.u',
									style: 'margin-left:10px;'
								}
							]
						},
						{
							xtype: 'fieldcontainer',
							layout: 'column',	
							defaults: {								
								maxLength: 50,
								enforceMaxLength: true,
								maskRe: /[^\`\"\']/,
								labelSeparator: ' ',
								labelClsExtra: 'small',
								labelWidth: 90,				
								anchor: '100%',
								columnWidth: 0.48,
								readOnly: true
							},					
							items: [								
								{
									xtype      : 'xnamefieldEST',
									fieldLabel : 'Customer Name',
									itemId     : 'customer_name',
									name       : 'customer_name',
									style      : 'margin-right:10px;'
								},
								{
									xtype: 'textfield',
									fieldLabel: 'Total Payment',
									itemId: 'total_payment',
									name: 'total_payment',
									style: 'margin-left:10px;',
									currencyFormat: true
								}
							]
						},
						{
                            xtype: 'fieldset',
                            title: 'Total Payment',
                            items: [
								/*{
									xtype: 'datefield',
									fieldLabel: 'PPH Payment Date',
									itemId: 'pph_date',
									name: 'pph_date',
									format: 'd-M-Y',
									altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
									submitFormat: 'Y-m-d H:i:s.u',
									labelWidth: 130,
									allowBlank: false,
									value: new Date()
								},*/
								{
									xtype: 'hiddenfield',
									itemId: 'randomnumber',
									name: 'randomnumber'
								},
								{
                                    //itemId:'KartupiutanglistpaymentgridID',
                                    xtype: 'PphpaymentListGrid',
                                    width: '100%',
                                    height: 300
                                }
                            ]
                        }
					]
				},
			]
		});
		me.callParent(arguments);
	}
});