Ext.define('Cashier.view.kartupiutangacc.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.kartupiutangaccformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 650,
    bodyBorder: true,
    bodyPadding: 10,
    uniquename: "_kartupiutangacc",
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    id: 'hideparam' + me.uniquename,
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    id: 'subgl_id' + me.uniquename,
                    name: 'subgl_id',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'project_id' + me.uniquename,
                    name: 'project_id',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'pt_id' + me.uniquename,
                    name: 'pt_id',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'cluster_id' + me.uniquename,
                    name: 'cluster_id',
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    align: 'stretch',
                    items: [
                        {
                            xtype: 'fieldset',
                            // margins:'0 0 5 0',
                            border: false,
                            flex:1,
                            layout: 'anchor',
                            autoHeight: true,
                            items: [
                                {
                                    xtype: 'textfield',
                                    name: 'project_name',
                                    id: 'project_name',
                                    fieldLabel: 'Project',
                                    align: 'right',
                                    readOnly:true,
                                    labelWidth: 130,
                                    anchor: '100%',
                                    enforceMaxLength: true,
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'purchaseletter_no',
                                    id: 'purchaseletter_no',
                                    fieldLabel: 'Purchase Letter No.',
                                    readOnly:true,
                                    labelWidth: 130,
                                    anchor: '100%',
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'cluster',
                                    id: 'cluster',
                                    fieldLabel: 'Cluster',
                                    align: 'right',
                                    readOnly:true,
                                    labelWidth: 130,
                                    anchor: '100%',
                                },
                            ]                        
                        },{
                            xtype: 'fieldset',
                            // margins:'0 0 5 0',
                            flex:1,
                            layout: 'anchor',
                            autoHeight: true,
                            border: false,
                            items: [
                                {
                                    xtype: 'textfield',
                                    name: 'pt_name',
                                    id: 'pt_name',
                                    fieldLabel: 'PT',
                                    align: 'right',
                                    readOnly:true,
                                    labelWidth: 130,
                                    anchor: '100%',
                                    enforceMaxLength: true,
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'customer_name',
                                    id: 'customer_name',
                                    fieldLabel: 'Customer Name',
                                    readOnly:true,
                                    labelWidth: 130,
                                    anchor: '100%',
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'code',
                                    id: 'code',
                                    fieldLabel: 'Unit Number',
                                    align: 'right',
                                    readOnly: true,
                                    labelWidth: 130,
                                    anchor: '100%',
                                },
                            ]                        
                        }
                    ]
                },
                // {
                //     xtype: 'fieldcontainer',
                //     layout: 'hbox',
                //     bodyBorder: false,
                //     defaults: {
                //         layout: 'fit'
                //     },
                //     items: [
                //         {
                //             xtype: 'fieldset',
                //             title: 'Data GL',
                //             layout: 'anchor',
                //             padding: '10 10 10 10',
                //             width: '99%',
                //             items: [
                //                 {
                //                     xtype: 'container',
                //                     layout: 'hbox',
                //                     align: 'stretch',
                //                     items: [
                //                         {
                //                             xtype: 'fieldset',
                //                             // margins:'0 005 0',
                //                             flex:1,
                //                             layout: 'anchor',
                //                             autoHeight: true,
                //                             border: false,
                //                             items: [
                //                                 {
                //                                     xtype: 'fieldcontainer',
                //                                     layout: 'hbox',
                //                                     align: 'right',
                //                                     bodyBorder: false,
                //                                     defaults: {
                //                                         layout: 'fit'
                //                                     },
                //                                     items: [
                //                                         {
                //                                             xtype: 'datefield',
                //                                             fieldLabel:'Voucher Date',
                //                                             emptyText: 'From',
                //                                             name: 'fromdate',
                //                                             allowBlank: false,
                //                                             format: 'd-m-Y',
                //                                             submitFormat: 'Y-m-d',
                //                                             altFormats: 'd-m-Y|Y-m-d|dmY|Ymd|mdY|dmy|ymd|mdy',
                //                                             width: 200
                //                                         },
                //                                         {
                //                                             xtype: 'label',
                //                                             forId: 'lbl1',
                //                                             text: 'To',
                //                                             margin: '2 10 0 10'
                //                                         },
                //                                         {
                //                                             xtype: 'datefield',
                //                                             fieldLabel:'',
                //                                             emptyText: 'Until',
                //                                             name: 'untildate',
                //                                             allowBlank: false,
                //                                             format: 'd-m-Y',
                //                                             submitFormat: 'Y-m-d',
                //                                             altFormats: 'd-m-Y|Y-m-d|dmY|Ymd|mdY|dmy|ymd|mdy',
                //                                             width: 100
                //                                         },
                //                                     ]
                //                                 },
                //                                 {
                //                                     xtype: 'fieldcontainer',
                //                                     layout: 'hbox',
                //                                     bodyBorder: false,
                //                                     defaults: {
                //                                         layout: 'fit'
                //                                     },
                //                                     items: [
                //                                         {
                //                                             xtype: 'textfield',
                //                                             fieldLabel:'COA',
                //                                             name: 'coa',
                //                                             enableKeyEvents: true,
                //                                             width: 300
                //                                         },
                //                                     ]
                //                                 },
                //                                 {
                //                                     xtype: 'fieldcontainer',
                //                                     layout: 'hbox',
                //                                     bodyBorder: false,
                //                                     defaults: {
                //                                         layout: 'fit'
                //                                     },
                //                                     items: [
                //                                         {
                //                                             xtype: 'textfield',
                //                                             fieldLabel:'Description',
                //                                             name: 'description',
                //                                             enableKeyEvents: true,
                //                                             width: 465
                //                                         }
                //                                     ]
                //                                 },
                //                                 {
                //                                     xtype: 'fieldcontainer',
                //                                     layout: 'hbox',
                //                                     bodyBorder: false,
                //                                     defaults: {
                //                                         layout: 'fit'
                //                                     },
                //                                     items: [
                //                                         {
                //                                             xtype: 'button',
                //                                             text:'Search',
                //                                             iconCls: 'icon-search',
                //                                             action: 'searchGl',
                //                                             padding: 5,
                //                                             // margin: '0 0 0 1295'
                //                                         },
                //                                         {
                //                                             xtype: 'button',
                //                                             text:'Reset',
                //                                             iconCls: 'icon-reset',
                //                                             action: 'resetSearchGl',
                //                                             padding: 5,
                //                                             margin: '0 0 0 5'
                //                                         },
                //                                     ]
                //                                 }
                //                             ]
                //                         },
                //                         {
                //                             xtype: 'fieldset',
                //                             // margins:'0 0 5 0',
                //                             flex:1,
                //                             layout: 'anchor',
                //                             autoHeight: false,
                //                             border: false,
                //                             items: [
                //                                 {
                //                                     xtype: 'fieldcontainer',
                //                                     layout: 'hbox',
                //                                     bodyBorder: false,
                //                                     defaults: {
                //                                         layout: 'fit'
                //                                     },
                //                                     items: [
                //                                         {
                //                                             xtype: 'textfield',
                //                                             fieldLabel:'Voucher Number',
                //                                             name: 'voucher_no',
                //                                             enableKeyEvents: true,
                //                                             width: 300
                //                                         },
                //                                     ]
                //                                 },
                //                                 {
                //                                     xtype: 'fieldcontainer',
                //                                     layout: 'hbox',
                //                                     bodyBorder: false,
                //                                     defaults: {
                //                                         layout: 'fit'
                //                                     },
                //                                     items: [
                //                                         {
                //                                             xtype: 'textfield',
                //                                             fieldLabel:'Sub COA',
                //                                             name: 'subcoa',
                //                                             enableKeyEvents: true,
                //                                             width: 300
                //                                         },
                //                                     ]
                //                                 },
                //                             ]
                //                         }
                //                     ]
                //                 },
                //                 {
                //                     xtype: 'fieldcontainer',
                //                     layout: 'hbox',
                //                     bodyBorder: false,
                //                     items: [
                //                         {
                //                             xtype: 'kartupiutangaccdataglgrid',
                //                             width: '99%'
                //                         },
                //                     ]
                //                 },
                //                 {
                //                     xtype: 'fieldcontainer',
                //                     layout: 'hbox',
                //                     bodyBorder: false,
                //                     defaults: {
                //                         layout: 'fit'
                //                     },
                //                     items: [
                //                         {
                //                             xtype: 'button',
                //                             text:'Transfer to KP ACC',
                //                             iconCls: 'icon-copy',
                //                             action: 'trasnfer2Kp',
                //                             padding: 5,
                //                         },
                //                         {
                //                             xtype: 'button',
                //                             text:'Cancel Transfer',
                //                             iconCls: 'icon-cancel',
                //                             action: 'cancelTrasnfer',
                //                             margin: '0 0 0 5',
                //                             padding: 5,
                //                         }
                //                     ]
                //                 }
                //             ]
                //         }
                //     ]
                // },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'tabpanel',
                            itemId: 'panelDetalKP',
                            name: 'panel',
                            activeTab: 0,
                            region: 'center',
                            layout: 'hbox',
                            id: 'TabKartuPiutang',
                            width: '99%',
                            items: [
                                {
                                    xtype: 'kartupiutangacckartupiutanggrid',
                                    closable: false,
                                    name: 'kartupiutangacckartupiutanggrid',
                                    title: 'Kartu Piutang Accounting ',
                                    flex: 1,
                                    itemId: 'TabKartuPiutang',
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
            // {
            //     xtype: 'button',
            //     action: 'save',
            //     itemId: 'btnSave',
            //     padding: 5,
            //     width: 150,
            //     iconCls: 'icon-save',
            //     text: 'Update Kartu Piutang'
            // },
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
            }
            ]
        }
        ];
        return x;
    },
});

