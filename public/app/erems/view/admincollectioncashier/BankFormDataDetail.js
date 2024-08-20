Ext.define('Erems.view.admincollectioncashier.BankFormDataDetail', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.admincollectioncashierbankformdatadetail',
    requires:[
		'Erems.library.template.component.Bankcombobox',
		'Erems.view.admincollectioncashier.BankGridAkad'
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
                    itemId: 'fdms_plbankkpr_id',
                    name: 'purchaseletter_bankkpr_id'
                },
				{
                    xtype: 'hiddenfield',
                    itemId: 'fdms_pl_id',
                    name: 'purchaseletter_id'
                },
				{
                    xtype: 'hiddenfield',
                    itemId: 'fdms_temp_id_detail',
                    name: 'temp_id_detail'
                },
				/* BANK KPR PROCESS */
               	{xtype: 'panel', bodyPadding: 10, title: 'BANK KPR PROCESS', collapsible: true,
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
                                                    xtype: 'bankcombobox',
                                                    fieldLabel: 'Bank KPR',
                                                    anchor: '-5',
													itemId:'fd_bank',
                                                    name: 'bank_id',
													allowBlank: false,
                                                    flex: 1,
                                                    //fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
													listeners: {
														change: function(){ 
															me.down('[name=bank_createdby_name]').setValue(apps.loginname);
														}
													}
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Created By',
                                                    anchor: '-5',
                                                    name: 'bank_createdby_name',
													readOnly: true,
                                                    flex: 1,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }]
                                        }
									]
								}
                            ]
                        }
                    ]
                },
				/* APPRAISAL */
				{xtype: 'panel', bodyPadding: 10, title: 'APPRAISAL', collapsible: true,
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
                                                    fieldLabel: 'Created By',
                                                    anchor: '-5',
                                                    name: 'appraisal_createdby_name',
													readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }]
                                        },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Appraisal Request Date',
                                                    anchor: '-5',
                                                    name: 'appraisalplan_date',
                                                    flex: 1,
													//allowBlank: false,
													//value: new Date(),
                                                    //fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
													format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u',
													listeners: {
														change: function(){ 
															me.down('[name=appraisal_createdby_name]').setValue(apps.loginname);
														}
													}
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Appraisal Date',
                                                    anchor: '-5',
                                                    name: 'appraisal_date',
                                                    flex: 1,
													//allowBlank: false,
													//value: new Date(),
                                                    //fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
													format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u',
													listeners: {
														change: function(){ 
															me.down('[name=appraisal_createdby_name]').setValue(apps.loginname);
														}
													}
                                                }]
                                        }
									]
								}
                            ]
                        }
                    ]
                },
				/* PENGUMPULAN BERKAS */
				{xtype: 'panel', bodyPadding: 10, title: 'PENGUMPULAN BERKAS', collapsible: true,
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
                                                    fieldLabel: 'Created By',
                                                    anchor: '-5',
                                                    name: 'berkasbank_createdby_name',
													readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }]
                                        },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Tanggal berkas masuk',
                                                    anchor: '-5',
                                                    name: 'berkasmasuk_date',
                                                    flex: 1,
													//allowBlank: false,
													//value: new Date(),
                                                    //fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
													format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u',
													listeners: {
														change: function(){ 
															me.down('[name=berkasbank_createdby_name]').setValue(apps.loginname);
														}
													}
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Tanggal di Bank',
                                                    anchor: '-5',
                                                    name: 'berkasbank_date',
                                                    flex: 1,
													//allowBlank: false,
													//value: new Date(),
                                                    //fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
													format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u',
													listeners: {
														change: function(){ 
															me.down('[name=berkasbank_createdby_name]').setValue(apps.loginname);
														}
													}
                                                }]
                                        }
									]
								}
                            ]
                        }
                    ]
                },
				/* INTERVIEW (RS ONLY) */
				{xtype: 'panel', bodyPadding: 10, title: 'INTERVIEW (RS ONLY)', collapsible: true,
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
                                                    fieldLabel: 'Created By',
                                                    anchor: '-5',
                                                    name: 'interview_createdby_name',
													flex: 1,
													readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                },{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Interview PIC',
                                                    anchor: '-5',
                                                    name: 'interview_pic',
                                                    flex: 1,
                                                    //allowBlank: false,
													listeners: {
														change: function(){ 
															me.down('[name=interview_createdby_name]').setValue(apps.loginname);
														}
													}
                                                }]
                                        },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Interview plan date',
                                                    anchor: '-5',
                                                    name: 'interviewplan_date',
                                                    flex: 1,
													//allowBlank: false,
													//value: new Date(),
                                                    //fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
													format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u',
													listeners: {
														change: function(){ 
															me.down('[name=interview_createdby_name]').setValue(apps.loginname);
														}
													}
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Interview date',
                                                    anchor: '-5',
                                                    name: 'interview_date',
                                                    flex: 1,
													//allowBlank: false,
													//value: new Date(),
                                                    //fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
													format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u',
													listeners: {
														change: function(){ 
															me.down('[name=interview_createdby_name]').setValue(apps.loginname);
														}
													}
                                                }]
                                        }
									]
								}
                            ]
                        }
                    ]
                },
				/* MONITORING KPR */
				{xtype: 'panel', bodyPadding: 10, title: 'MONITORING KPR', collapsible: true,
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
                                                    fieldLabel: 'Created By',
                                                    anchor: '-5',
                                                    name: 'kpr_createdby_name',
													readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }]
                                        },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype        : 'datefield',
                                                    fieldLabel   : 'ACC Date',
                                                    anchor       : '-5',
                                                    name         : 'kpr_acc_date',
                                                    flex         : 1,
                                                    format       : 'd-m-Y',
                                                    altFormats   : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                    submitFormat : 'Y-m-d H:i:s.u',
                                                    listeners    : {
														change: function(){ 
															me.down('[name=kpr_createdby_name]').setValue(apps.loginname);
														}
													}
                                                }, 
                                                {
                                                    xtype: 'splitter', width: 20,
                                                }, 
                                                {
                                                    xtype           : 'xnumericfieldEST',
                                                    fieldLabel      : 'KPR Tenor (Month)',
                                                    anchor          : '-5',
                                                    name            : 'kpr_tenor',
                                                    flex            : 1,
                                                    value           : 0,
                                                    enableKeyEvents : true,
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
                                                    fieldLabel: 'KPR Realisation amount',
                                                    anchor: '-5',
                                                    name: 'kpr_realisation',
													//currencyFormat: true,
                                                    flex: 1,
                                                    //allowBlank: false,
													maskRe: /[0-9\.]/,
													value: 0.00,
                                                    //fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
													currencyFormat: true,
													enableKeyEvents: true,
													/*listeners: {
														change: function(){ 
															me.down('[name=kpr_createdby_name]').setValue(apps.loginname);
														}
													}*/
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'KPR Interest (%)',
                                                    anchor: '-5',
                                                    name: 'kpr_interest',
                                                    flex: 1,
                                                    //allowBlank: false,
													maskRe: /[0-9\.]/,
													value: 0.00,
													currencyFormat: true,
													enableKeyEvents: true,
                                                    //fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
													/*listeners: {
														change: function(){ 
															me.down('[name=kpr_createdby_name]').setValue(apps.loginname);
														}
													}*/
                                                }]
                                        },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'KPR Cicilan',
                                                    anchor: '-5',
                                                    name: 'kpr_cicilan',
													//currencyFormat: true,
													//allowBlank: false,
													maskRe: /[0-9\.]/,
													value: 0.00,
                                                    //fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
													currencyFormat: true,
													enableKeyEvents: true,
													/*listeners: {
														change: function(){ 
															me.down('[name=kpr_createdby_name]').setValue(apps.loginname);
														}
													}*/
                                                }]
                                        }
									]
								}
                            ]
                        }
                    ]
                },
				/* REJECT / APPROVE */
				{xtype: 'panel', bodyPadding: 10, title: 'REJECT / APPROVE', collapsible: true,
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
                                                    fieldLabel: 'Created By',
                                                    anchor: '-5',
                                                    name: 'reject_createdby_name',
													readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }]
                                        },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Rejected date',
                                                    anchor: '-5',
                                                    name: 'rejected_date',
                                                    flex: 1,
													//allowBlank: false,
													//value: new Date(),
                                                    //fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
													format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u',
													listeners: {
														change: function(){ 
															me.down('[name=reject_createdby_name]').setValue(apps.loginname);
														}
													}
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Next process date',
                                                    anchor: '-5',
                                                    name: 'nextprocess_date',
                                                    flex: 1,
													//allowBlank: false,
													//value: new Date(),
                                                    //fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
													format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u',
													listeners: {
														change: function(){ 
															me.down('[name=reject_createdby_name]').setValue(apps.loginname);
														}
													}
                                                }]
                                        }
									]
								}
                            ]
                        }
                    ]
                },
				/* AKAD KREDIT */
				{xtype: 'panel', bodyPadding: 10, title: 'AKAD KREDIT', collapsible: true,
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
                                                    fieldLabel: 'Created By',
                                                    anchor: '-5',
                                                    name: 'akad_createdby_name',
													readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }]
                                        },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Akad plan date',
                                                    anchor: '-5',
                                                    name: 'akadplan_date',
                                                    flex: 1,
													readOnly: true,
													//allowBlank: false,
													//value: new Date(),
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
													format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u',
													listeners: {
														change: function(){ 
															me.down('[name=akad_createdby_name]').setValue(apps.loginname);
														}
													}
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Akad date',
                                                    anchor: '-5',
                                                    name: 'akad_date',
                                                    flex: 1,
													readOnly: true,
													//allowBlank: false,
													//value: new Date(),
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
													format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u',
													listeners: {
														change: function(){ 
															me.down('[name=akad_createdby_name]').setValue(apps.loginname);
														}
													}
                                                }]
                                        }
									]
								}
                            ]
                        }
                    ]
                },
				/* AKAD CONFIRMATION */
				{xtype: 'panel', bodyPadding: 10, title: 'AKAD CONFIRMATION', collapsible: true,
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
                                                    fieldLabel: 'Pembayaran Pajak Rp. :',
													labelWidth: 135,
                                                    anchor: '-5',
                                                    name: 'pajak_amount',
													maskRe: /[0-9\.]/,
													//value: 0.00,
                                                    currencyFormat: true
                                                }, {
                                                    xtype: 'splitter', width: 10,
                                              	}, {
                                                    xtype: 'checkboxfield',
													fieldLabel: '',
													itemId: 'is_bayarpajak',											
													name: 'is_bayarpajak',
													inputValue: '1',
													uncheckedValue: '0',
													listeners: {
														change: function() {
															var txt = me.down('[name=pajak_amount]');
															if(this.checked){
																txt.allowBlank = false;
															} else {
																txt.allowBlank = true;
															}
														}
													}
                                                }]
                                        },
										{
											//  bodyPadding: 10,
											padding: '10px 0 0 0',
											layout: 'hbox',
											bodyStyle: 'border:0px',
											items: [{
													xtype: 'admincollectioncashierbankgridakad',
													width: '100%',
													itemId: 'MyAkadConfirmationGrid'
											}]
										},
										{
											xtype: 'splitter', height: 10,
										},
										{
                                            padding   : '10px 0 0 0',
                                            layout    : 'hbox',
                                            bodyStyle : 'border:0px',
                                            items     : [{
                                                    xtype      : 'xnotefieldEST',
                                                    fieldLabel : 'Note',
                                                    anchor     : '-5',
                                                    name       : 'note',
                                                    flex       : 1,
												}]
										}
									]
								}
                            ]
                        }
                    ]
                },
			],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});