Ext.define('Erems.view.pphpayment.GridListPayment', {
     extend: 'Ext.grid.Panel',
    alias: 'widget.PphpaymentListGrid',
	itemId: 'PphpaymentListGrid',
	
	store: 'Pphpaymentlist',
    
	initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
			enableColumnHide: false,
			enableColumnMove: false,
			sortableColumns: false,
			viewConfig: { markDirty: false },
			columnLines: true,
			selModel: Ext.create('Ext.selection.CheckboxModel', {}),
			plugins: [
				/*Ext.create('Ext.grid.plugin.CellEditing', {
					ptype: 'cellediting',
					clicksToEdit: 1
				})*/
				Ext.create('Ext.grid.plugin.CellEditing', {
					clicksToEdit: 1
				})
			],
			listeners : {
				edit : function() {
					me.up().down('#randomnumber').setValue(_Apps.getController('Pphpayment').randomString(5));
				}
			},
			columns: [
				{
                    xtype: 'rownumberer'
                },
                {
                    dataIndex: 'payment_no',
                    text: 'Payment No'
                },
                {
                    xtype:'datecolumn',
                    format:'d-m-Y',
                    dataIndex: 'payment_date',
                    text: 'Payment Date'
                },
                {
                    dataIndex: 'paymentmethod',
                    text: 'Payment Method'
                },
                {
                    dataIndex: 'note',
                    text: 'Description',
					width: 100
                },
                {
                    xtype: 'numbercolumn',
                    align: 'right',
                    dataIndex: 'total_payment_list',
                    text: 'Amount'
                },
				{
                    xtype: 'booleancolumn',
					text: 'Is PPH Paid',
                    dataIndex: 'is_pph_pay',
					trueText: '&#10003;',
					falseText: ' ',                    
                    resizable: false,
					width: 70,
					align: 'center'
                },
				{
                    xtype:'datecolumn',
                    format:'d-m-Y',
                    dataIndex: 'pph_pay_date',
                    text: 'PPH Pay Date',
					style: 'font-weight:bold;',
					editor: {
						xtype: 'datefield',
						format: 'd-m-Y',
						altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
						submitFormat: 'Y-m-d H:i:s.u'
					}
                },
				{
					xtype: 'numbercolumn',
                    align: 'right',
                    dataIndex: 'pph_amount',
                    text: 'PPH Amount',
					style: 'font-weight:bold;',
					editor: {
						xtype: 'textfield',
						maskRe: /[0-9-\.]/,
						enableKeyEvents: true,
						listeners: {
							keyup: function (component,events) {
								var grid = component.up('grid'),
									sel = grid.getSelectionModel().getSelection(),
									maxAmount = sel[0].data.max_pph_amount,
									pph_global = sel[0].data.pph_global,
									total_payment_list = sel[0].data.total_payment_list;
								var val = parseFloat(this.value),
									maxAmt = parseFloat(maxAmount),
									pphGlobal = parseFloat(pph_global),
									totalPayment = parseFloat(total_payment_list);
								if(pphGlobal > 0){
									if(val > maxAmt){
										var msgText = 'PPH Amount tidak bisa lebih besar dari:<br />Rp. '+me.fmb(totalPayment)+' x '+pphGlobal+'% = Rp. '+me.fmb(maxAmt);
		
										Ext.Msg.show({
											title: 'Alert',
											msg: msgText,
											icon: Ext.Msg.WARNING,
											buttons: Ext.Msg.OK
										});
										
										this.setValue(0);
									}
								}
							},
						}
					}
				},
				{
                    dataIndex: 'pph_ntpn_no',
                    text: 'NTPN No.',
					style: 'font-weight:bold;',
					editor: {
						xtype: 'textfield',
						maskRe:/[A-Za-z0-9\s.]/
					}
                },
				{
					xtype: 'actioncolumn',
					//itemId: 'actioncolumnlistpayment',
					width: 50,
					resizable: false,
					align: 'right',
					hideable: false,
					renderer: function (value, metadata, record) {
						// if (record.get('is_pph_pay') == true) {
						// 	this.items[0].disabled = false;
						// } else {
						// 	this.items[0].disabled = true;
						// }
					},
					items: [
					   {
							text: 'Delete',
							iconCls: 'icon-delete',
							bindAction:'PphpaymentlistDelete',
							altText: 'Delete PPH Payment',
							tooltip: 'Delete PPH Payment'
						}
					]
				}
			]
		});
		me.callParent(arguments);
	},
	
	fmb: function(val) {
        return this.fm(val, 2, ',', '.');
    },
    fm: function(n, decPlaces, thouSeparator, decSeparator) {
        var decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
                decSeparator = decSeparator == undefined ? "." : decSeparator,
                thouSeparator = thouSeparator == undefined ? "." : thouSeparator,
                sign = n < 0 ? "-" : "",
                i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "",
                j = (j = i.length) > 3 ? j % 3 : 0;
        return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
    }
	
});