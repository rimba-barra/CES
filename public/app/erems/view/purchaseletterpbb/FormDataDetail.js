Ext.define('Erems.view.purchaseletterpbb.FormDataDetail', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.purchaseletterpbbformdatadetail',
    requires:[
		
	],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 400,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'padding:5px 5px 0',
    defaults: {
        border: false,
        xtype: 'panel',
        flex: 1,
        layout: ''

    },
    initComponent: function() {
        var me = this;

		function dateOneYear(){
			var x = 12;
			var CurrentDate = new Date();
			CurrentDate.setMonth(CurrentDate.getMonth()+x);
			return CurrentDate;
		}

        Ext.applyIf(me, {
            items: [
				{
                    xtype: 'hiddenfield',
                    itemId: 'fdms_purchaseletter_pbb_id',
                    name: 'purchaseletter_pbb_id'
                },
				{
                    xtype: 'hiddenfield',
                    itemId: 'fdms_pl_id',
                    name: 'purchaseletter_id'
                },
				{
                    xtype: 'hiddenfield',
                    itemId: 'fdms_unit_id',
                    name: 'unit_id'
                },
				/* PURCHASELETTER INFORMATION */
				{xtype: 'panel', bodyPadding: 10, title: 'PBB INFORMATION', collapsible: true,
                    width: '100%',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: '100%',
                                    flex: 3,
                                    bodyStyle: 'border:0px',
                                    items: [
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'NOP Dibayar',
                                                    anchor: '-5',
                                                    name: 'nop_dibayar',
                                                    flex: 1,
                                                    //currencyFormat: true,
                                                    allowBlank: false,
													//maskRe: /[0-9\.]/,
                                                    enforceMaxLength:true,
                                                    maxLength:150
													//enableKeyEvents: true
                                                }]
                                        },
										{
                                            padding   : '10px 0 0 0',
                                            layout    : 'hbox',
                                            bodyStyle : 'border:0px',
                                            items     : [
                                                {
                                                    xtype           : 'xnumericfieldEST',
                                                    fieldLabel      : 'Tahun',
                                                    anchor          : '-5',
                                                    name            : 'tahun',
                                                    flex            : 1,
                                                    allowBlank      : false,
                                                    maxLength       :5,
                                                    enableKeyEvents : true
                                                }
                                            ]
                                        },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Pokok',
                                                    anchor: '-5',
                                                    name: 'pokok',
                                                    flex: 1,
                                                    currencyFormat: true,
                                                    allowBlank: false,
													maskRe: /[0-9\.]/,
													enableKeyEvents: true
                                                }]
                                        },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Denda',
                                                    anchor: '-5',
                                                    name: 'denda',
                                                    flex: 1,
                                                    currencyFormat: true,
                                                    maskRe: /[0-9\.]/,
													enableKeyEvents: true
                                                }]
                                        },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Total',
                                                    anchor: '-5',
                                                    name: 'total',
                                                    flex: 1,
                                                    currencyFormat: true,
                                                    allowBlank: false,
													maskRe: /[0-9\.]/,
													enableKeyEvents: true
                                                }]
                                        },
										{
                                            padding   : '10px 0 0 0',
                                            layout    : 'hbox',
                                            bodyStyle : 'border:0px',
                                            items     : [
                                                {
                                                    xtype           : 'xnumericfieldEST',
                                                    fieldLabel      : 'Tahun Bayar',
                                                    anchor          : '-5',
                                                    name            : 'tahun_bayar',
                                                    flex            : 1,
                                                    allowBlank      : false,
                                                    maxLength       :5,
                                                    enableKeyEvents : true
                                                }
                                            ]
                                        },
										{
                                            padding   : '10px 0 0 0',
                                            layout    : 'hbox',
                                            bodyStyle : 'border:0px',
                                            items     : [
                                                {
                                                    xtype      : 'xnotefieldEST',
                                                    fieldLabel : 'Keterangan',
                                                    anchor     : '-5',
                                                    name       : 'keterangan',
                                                    flex       : 1
                                                }
                                            ]
                                        }
                                    ]
                                },
                            ]
                        }
                    ]
                }
			],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});