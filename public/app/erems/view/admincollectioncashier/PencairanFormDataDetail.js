Ext.define('Erems.view.admincollectioncashier.PencairanFormDataDetail', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.admincollectioncashierpencairanformdatadetail',
    requires:[
		'Erems.library.template.component.Plafoncombobox'
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
                    itemId: 'fdms_plpencairankpr_id',
                    name: 'purchaseletter_pencairankpr_id'
                },
				{
                    xtype: 'hiddenfield',
                    itemId: 'fdms_pl_id',
                    name: 'purchaseletter_id'
                },
				{
                    xtype: 'hiddenfield',
                    itemId: 'fdms_payment_id',
                    name: 'payment_id'
                },
				{
                    xtype: 'hiddenfield',
                    itemId: 'fdms_schedule_id',
                    name: 'schedule_id'
                },
               	{xtype: 'panel', bodyPadding: 10, title: 'PENCAIRAN KPR', collapsible: true,
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
                                                    xtype: 'plafoncombobox',
													fieldLabel: 'Plafon',
													anchor: '-5',
													name: 'plafon_id',
													flex: 12,
													editable:false,
													allowBlank: false
                                                }]
                                        },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Escrow Date',
                                                    anchor: '-5',
                                                    name: 'escrow_date',
                                                    flex: 1,
													allowBlank: false,
                                               		format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u'
                                                }]
                                        },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Pengajuan Berkas',
                                                    anchor: '-5',
                                                    name: 'pengajuan_berkas_date',
                                                    flex: 1,
													//allowBlank: false,
                                               		format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u'
                                                }]
                                        },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Cair Date',
                                                    anchor: '-5',
                                                    name: 'pencairan_date',
                                                    flex: 1,
													//allowBlank: false,
                                                    format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u'
                                                }]
                                        },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Due Date Escrow',
                                                    anchor: '-5',
                                                    name: 'duedate_escrow',
                                                    flex: 1,
													//allowBlank: false,
                                                    format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u'
                                                }]
                                        },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [
												{
                                                    xtype: 'textfield',
                                                    fieldLabel: '% Pencairan',
                                                    anchor: '-5',
                                                    name: 'persen_pencairan',
													flex: 1,
													allowBlank: false,
                                                   	maskRe: /[0-9\.]/,
													enableKeyEvents: true
                                                },
												{xtype: 'label', text: '%', flex: 1, margin: '0 0 0 10px'}
											]
                                        },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Nilai Pencairan',
                                                    anchor: '-5',
                                                    name: 'pencairan_amount',
													currencyFormat: true,
                                                    flex: 1,
													allowBlank: false,
                                                   	maskRe: /[0-9\.]/,
													readOnly: true
                                                }]
                                        }
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