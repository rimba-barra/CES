Ext.define('Erems.view.warningjatuhtempo.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.warningjatuhtempoformdata',
    requires:[
		
	],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 350,
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
                    itemId: 'schedule_id',
                    name: 'schedule_id'
                },
				{
                    xtype: 'hiddenfield',
                    itemId: 'fdms_pl_id',
                    name: 'purchaseletter_id'
                },
				/* DETAIL SKL Information */
               	{xtype: 'panel', bodyPadding: 10, title: 'CUSTOMER FEEDBACK', collapsible: true,
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
                                            items     : [{
                                                    xtype      : 'xnotefieldEST',
                                                    fieldLabel : 'Feedback',
                                                    allowBlank : false,
                                                    anchor     : '-5',
                                                    name       : 'respon_note',
                                                    flex       : 1,
                                                    height     : 200,
                                                }]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
				/* END BIAYA BIAYA */
			],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});