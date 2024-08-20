Ext.define('Erems.view.schedulemonitor.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.schedulemonitorformdata',
    requires: ['Erems.view.schedulemonitor.Schedulegrid', 'Erems.view.schedulemonitor.PaymentGrid'],
    autoScroll: true,
    anchorSize: 100,
    height: 500,
    bodyPadding: 10,
    bodyStyle: 'padding:5px 5px 0',

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {xtype: 'hiddenfield', name: 'purchaseletter_id'},
                {
                    xtype: 'textfield',
                    fieldLabel: 'Nomor Purchaseletter',
                    name: 'purchaseletter_no',
                    readOnly:true
                }, 
                {
                    xtype: 'xmoneyfield',
                    fieldLabel: 'Total Harga Jual',
                    name: 'harga_total_jual',
                    readOnly:true
                },
                {
                    //  bodyPadding: 10,
                    padding: '10px 0 0 0',
                    layout: 'hbox',
                    bodyStyle: 'border:0px',
                    width: '100%',
                    //     fieldStyle: 'background:none;background-color:#DFE9F6!important;',
                    items: [{
                            flex:1,
                            layout: 'vbox',
                            items: [
                                {
                                    xtype: 'schedulemonitorschedulegrid',
                                    itemId: 'MyScheduleGrid',
                                    width: '100%'
                                },
                            ]
                        },
                        {
                            width: 5,
                        },
                        {
                            flex:1,
                            layout: 'vbox',
                            items: [
                                {
                                    xtype: 'schedulemonitorpaymentgrid',
                                    width: '100%',
                                    itemId: 'MyPaymentGrid'
                                },
                                /*
                                {
                                    xtype: 'xmoneyfield',
                             
                                    fieldLabel: 'Total Payment',
                                    name: 'total_payment',
                                }
                                */
                            ]
                        }
                    ]
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    generateDockedItem: function () {
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
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Cancel',
                        handler: function () {
                            this.up('window').close();
                        }
                    }
                ]
            }
        ];
        return x;
    }
});