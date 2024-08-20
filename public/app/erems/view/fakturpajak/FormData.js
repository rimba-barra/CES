Ext.define('Erems.view.fakturpajak.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.fakturpajakformdata',
    requires:[
		'Erems.library.template.component.Projectptcombobox'
	],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 600,
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
                    itemId: 'fakturpajak_id',
                    name: 'fakturpajak_id'
                },
				{
                    xtype: 'hiddenfield',
                    itemId: 'fdms_payment_id',
                    name: 'payment_id'
                },
                {xtype: 'panel', bodyPadding: 10, title: 'FAKTUR PAJAK', collapsible: true,
                    items: [
                        {
                            layout: 'hbox',
                            padding: '10px 0 0 0',
                            bodyStyle: 'border:0px',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'panel', flex: 8,
                                    layout: {
                                        type: 'vbox',
                                        defaultMargins: {top: 0, right: 0, bottom: 10, left: 0}
                                    },
                                    bodyStyle: 'border:0px',
                                    items: [
                                        {
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Kawasan / Cluster',
                                                    anchor: '-5',
                                                    name: 'code',
                                                    flex: 3,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
													labelWidth: 150
                                                }, {
                                                    xtype: 'splitter', width: 5,
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: '',
                                                    anchor: '-5',
                                                    name: 'cluster',
                                                    flex: 6,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }
                                            ]
                                        },
                                        {
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Block name',
                                                    anchor: '-5',
                                                    name: 'block_code',
                                                    flex: 3,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
													labelWidth: 150
                                                }, {
                                                    xtype: 'splitter', width: 5,
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: '',
                                                    anchor: '-5',
                                                    name: 'block',
                                                    flex: 6,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }]
                                        },
                                        {
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [
												{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Unit No. ',
                                                    anchor: '-5',
                                                    name: 'unit_number',
                                                    flex: 3,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
													labelWidth: 150
                                                }, {
                                                    xtype: 'splitter', width: 5,
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Unit Type',
													labelWidth: 70,
                                                    anchor: '-5',
                                                    name: 'unit_type_name',
                                                    flex: 6,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }
											]
                                        },
										{
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
											width: '100%',
                                            items: [{
                                                    xtype      : 'xnamefieldEST',
                                                    fieldLabel : 'Customer Name',
                                                    anchor     : '-5',
                                                    name       : 'customer_name',
                                                    flex       : 1,
                                                    labelWidth : 150
                                                }]
                                        },
										{
                                            layout    : 'hbox',
                                            bodyStyle : 'border:0px',
                                            width     : '100%',
                                            items     : [{
                                                    xtype      : 'xaddressfieldEST',
                                                    fieldLabel : 'Customer Address',
                                                    anchor     : '-5',
                                                    name       : 'customer_address',
                                                    flex       : 1,
                                                    labelWidth : 150
                                                }]
                                        },
										{
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
											width: '100%',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Customer NPWP',
                                                    anchor: '-5',
                                                    name: 'customer_npwp',
                                                    flex: 1,
													labelWidth: 150
                                                }]
                                        },
										{
                                            //padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
											width: '100%',
                                            items: [{
                                                    
													xtype: 'datefield',
                                                    fieldLabel: 'Payment Date',
                                                    anchor: '-5',
                                                    name: 'payment_date',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
													format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u',
													labelWidth: 150
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Kwitansi No.',
                                                    anchor: '-5',
                                                    name: 'receipt_no',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }]
                                        },
										{
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
											width: '100%',
                                            items: [{
                                                    xtype: 'projectptcombobox',
                                                    fieldLabel: 'PT (Company)',
                                                    anchor: '-5',
                                                    name: 'pt_id',
                                                    flex: 1,
													labelWidth: 150,
													itemId: 'fd_pt'
                                                }]
                                        },
										{
                                            layout    : 'hbox',
                                            bodyStyle : 'border:0px',
                                            width     : '100%',
                                            items     : [
                                                {
                                                    xtype      : 'xaddressfieldEST',
                                                    fieldLabel : 'PT (Company) Address',
                                                    anchor     : '-5',
                                                    name       : 'pt_address',
                                                    flex       : 1,
                                                    readOnly   : true,
                                                    fieldStyle : 'background:none;background-color:#F2F2F2 !important;',
                                                    labelWidth : 150
                                                }
                                            ]
                                        },
										{
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
											width: '100%',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'PT (Company) NPWP',
                                                    anchor: '-5',
                                                    name: 'pt_npwp',
                                                    flex: 1,
													readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
													labelWidth: 150
                                                }]
                                        },
										{
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
											items: [{
                                                   	xtype: 'datefield',
                                                    fieldLabel: 'Faktur Pajak Date',
                                                    anchor: '-5',
                                                    name: 'fakturpajak_date',
                                                    flex: 1,
                                                    format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u',
													labelWidth: 150,
													editable: false,
                                                }]
                                        },
										/*{
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
											width: '100%',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'No. Seri Faktur Pajak',
                                                    anchor: '-5',
                                                    name: 'fakturpajak_no',
                                                    flex: 1,
													labelWidth: 150
                                                }]
                                        },*/
										{
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            //width: '100%',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'No. Seri Faktur Pajak',
                                                    anchor: '-5',
                                                    name: 'fakturpajak_no',
                                                    flex: 3,
													labelWidth: 150,
                                                    enforceMaxLength:true,
                                                    maxLength:50,
                                                    maskRe:/[0-9.]/
                                                },
                                                {xtype: 'label', text: '-', flex: 1, margin: '0 0 0 2px'},
                                                {xtype: 'splitter', width: 2}, 
												{
                                                    xtype      : 'xnumericfieldEST',
                                                    fieldLabel : '',
                                                    anchor     : '-5',
                                                    name       : 'counter',
                                                    flex       : 6,
                                                    labelWidth : 30,
                                                }
                                            ]
                                        },
										{
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
											width: '100%',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Payment Amount Rp. ',
                                                    anchor: '-5',
                                                    name: 'payment',
                                                    flex: 1,
													readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
													labelWidth: 150
                                                }]
                                        },
										{
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
											width: '100%',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'DPP Rp. ',
                                                    anchor: '-5',
                                                    name: 'dpp',
                                                    flex: 1,
													readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
													labelWidth: 150
                                                }]
                                        },
										{
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            //width: '100%',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'PPN',
                                                    anchor: '-5',
                                                    name: 'ppn_persen',
                                                    flex: 3,
													labelWidth: 150,
													maskRe: /[0-9\.]/,
													enableKeyEvents: true,
													readOnly: true
                                                },
                                                {xtype: 'label', text: '%', flex: 1, margin: '0 0 0 10px'},
                                                {
                                                    xtype: 'splitter', width: 30,
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Rp.',
                                                    anchor: '-5',
                                                    name: 'ppn_amount',
                                                    flex: 6,
													readOnly: true,
                                                    labelWidth: 30,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }
                                            ]
                                        },
										{
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            //width: '100%',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'PPNBM',
                                                    anchor: '-5',
                                                    name: 'ppnbm_persen',
                                                    flex: 3,
													labelWidth: 150,
													maskRe: /[0-9\.]/,
													enableKeyEvents: true,
													readOnly: true
                                                },
                                                {xtype: 'label', text: '%', flex: 1, margin: '0 0 0 10px'},
                                                {
                                                    xtype: 'splitter', width: 30,
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Rp.',
                                                    anchor: '-5',
                                                    name: 'ppnbm_amount',
                                                    flex: 6,
													readOnly: true,
                                                    labelWidth: 30,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }
                                            ]
                                        },
										{
                                            layout    : 'hbox',
                                            bodyStyle : 'border:0px',
                                            width     : '100%',
                                            items     : [{
                                                    xtype      : 'xnotefieldEST',
                                                    fieldLabel : 'Notes',
                                                    anchor     : '-5',
                                                    name       : 'notes',
                                                    flex       : 1,
                                                    labelWidth : 150,
                                                    readOnly   : true,
                                                }]
                                        },
                                    ]
                                },
                                
                            ]
                        }

                    ]
                },
			],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
	generateDockedItem: function() {
        var x = [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            layout: {
                padding: 6,
                type: 'hbox'
            },
            items: [
            {
                xtype: 'button',
                action: 'save',
                itemId: 'btnSave',
                padding: 5,
                width: 75,
                iconCls: 'icon-save',
                text: 'Save'
            },
            {
                xtype: 'button',
                action: 'cancel',
                itemId: 'btnCancel',
                padding: 5,
                width: 75,
                iconCls: 'icon-cancel',
                text: 'Cancel',
                handler: function() {
                    this.up('window').close();
                }
            },
			{
                xtype: 'button',
                action: 'print',
                itemId: 'btnPrint',
                padding: 5,
                width: 75,
                iconCls: 'icon-print',
                text: 'Print',
				disabled: true,
            },
            ]
        }
        ];
        return x;
    },
});