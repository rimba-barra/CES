Ext.define('Erems.view.admincollectioncashier.BankAkadFormDataDetail', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.admincollectioncashierbankakadformdatadetail',
    requires:[
		//'Erems.library.template.component.Akadconfirmationstatuscombobox',
	],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    //height: 300,
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

        Ext.applyIf(me, {
            items: [
				{
                    xtype: 'hiddenfield',
                    itemId: 'fdms_akadconfirmation_id',
                    name: 'akadconfirmation_id'
                },
				{
                    xtype: 'hiddenfield',
                    itemId: 'fdms_pl_id',
                    name: 'purchaseletter_id'
                },
				{
                    xtype: 'hiddenfield',
                    itemId: 'fdms_purchaseletter_bankkpr_id',
                    name: 'purchaseletter_bankkpr_id'
                },
				{
                    xtype: 'hiddenfield',
                    itemId: 'fdms_temp_id_akad',
                    name: 'temp_id_akad'
                },
               	{xtype: 'panel', bodyPadding: 10, title: 'KONFIRMASI AKAD KREDIT', collapsible: true,
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
                                            padding   : '10px 0 0 0',
                                            layout    : 'hbox',
                                            bodyStyle : 'border:0px',
                                            items     : [
                                                {
                                                    xtype      : 'xnumericfieldEST',
                                                    fieldLabel : 'Confirmation Index',
                                                    labelWidth : 120,
                                                    anchor     : '-5',
                                                    name       : 'akadconfirmation_index',
                                                    flex       : 1,
                                                    readOnly   : true
                                                }
                                            ]
                                        },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Confirmation Date',
													labelWidth: 120,
                                                    anchor: '-5',
                                                    name: 'akadconfirmation_date',
                                                    flex: 1,
													allowBlank: false,
                                               		format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u'
                                                }]
                                        },
										{
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype        : 'combobox',
                                                    fieldLabel   : 'Status',
                                                    labelWidth   : 120,
                                                    anchor       : '-5',
                                                    itemId       :'fd_akadconfirmation_status_id',
                                                    name         : 'akadconfirmation_status_id',
                                                    flex         : 1,
                                                    displayField : 'akadconfirmation_status',
                                                    valueField   : 'akadconfirmation_status_id',
                                                }]
                                        },
										{
                                            padding   : '10px 0 0 0',
                                            layout    : 'hbox',
                                            bodyStyle : 'border:0px',
                                            items     : [
												{
                                                    xtype      : 'xnotefieldEST',
                                                    fieldLabel : 'Notes',
                                                    labelWidth : 120,
                                                    anchor     : '-5',
                                                    name       : 'akadconfirmation_note',
                                                    flex       : 1,
                                                }
											]
                                        },
										
									]
								}
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