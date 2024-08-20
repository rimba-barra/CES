Ext.define('Erems.view.serahterima.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.serahterimaformdata',
    requires: [ 'Erems.library.template.view.combobox.City','Erems.library.box.Config', 'Erems.template.ComboBoxFields'],
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
    editedRow: -1,
    initComponent: function() {
        var me = this;

        var cfg = new Erems.library.box.Config();

        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            items: [{
                    xtype: 'hiddenfield',
                    name: 'unit_unit_id'
                }, {
                    xtype: 'hiddenfield',
                    itemId: 'fdms_serahterima_id',
                    name: 'serahterima_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'purchaseletter_purchaseletter_id'
                },
                {
                    xtype: 'panel',
                    bodyPadding: 10,
                    title: 'UNIT INFORMATION',
                    collapsible: true,
                    items: [
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            margin: '10px 0 0 0',
                            defaults: {
                                xtype: 'container',
                                layout: 'vbox',
                                flex: 1,
                                width: '100%'
                            },
                            items: [
                                {
                                    margin: '0 20px 0 0',
                                    defaults: {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        width: '100%',
                                        margin: '0 0 10px 0'
                                    },
                                    items: [
                                        
                                        {
                                            defaults: {
                                                xtype: 'textfield',
                                                width: '100%'
                                            },
                                            items: [
                                                {
                                                    name: 'cluster_cluster',
                                                    fieldLabel: 'Cluster',
                                                    readOnly: true,
                                                    flex: 1,
                                                    margin: '0 5px 0 0'
                                                },
                                                {
                                                    name: 'block_block',
                                                    readOnly: true,
                                                    fieldLabel: '',
                                                    flex: 1
                                                }
                                            ]

                                        },
                                        {
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    width: '100%',
                                                    name: 'unit_unit_number',
                                                    fieldLabel: 'Unit Number',
                                                    readOnly: true,
                                                    margin: '0 5px 0 0',
                                                    flex: 2
                                                },
                                                {
                                                    xtype: 'button',
                                                    text: 'Browse Unit',
                                                    action: 'browse_unit',
                                                    itemId: 'btnUnit',
                                                    flex: 1
                                                },
                                                {
                                                    xtype: 'label',
                                                    text: '',
                                                    width: 50
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                /* CUSTOMER INFORMATION */
                {
                    xtype: 'panel',
                    bodyPadding: 10,
                    title: 'CUSTOMER INFORMATION',
                    collapsible: true,
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
                                                    fieldLabel: 'Customer Name',
                                                    anchor: '-5',
                                                    name: 'customer_name',
                                                    flex: 1,
                                                    readOnly: true,
                                                }]
                                        },
                                        {
                                            padding   : '10px 0 0 0',
                                            layout    : 'hbox',
                                            bodyStyle : 'border:0px',
                                            items     : [
                                                {
                                                    xtype      : 'xaddressfieldEST',
                                                    fieldLabel : 'Address',
                                                    anchor     : '-5',
                                                    name       : 'customer_address',
                                                    flex       : 1,
                                                    readOnly   : true,
                                                }
                                            ]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [ {
                                                    xtype: 'combobox',
                                                    queryMode:'local',
                                                    fieldLabel: 'City',
                                                    name: 'customer_city',
                                                    displayField: cbf.city.d,
                                                    valueField: cbf.city.v,
                                                    anchor: '-5',
                                                    readOnly: true,
                                                    flex: 1
                                                }, {
                                                    xtype: 'splitter',
                                                    width: 20,
                                                },{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Email Address',
                                                    anchor: '-5',
                                                    name: 'customer_email',
                                                    flex: 1,
                                                    readOnly: true,
                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype      : 'xphonenumberfieldEST',
                                                    fieldLabel : 'Phone',
                                                    anchor     : '-5',
                                                    name       : 'customer_phone',
                                                    flex       : 1,
                                                    readOnly   : true,
                                                }, {
                                                    xtype: 'splitter',
                                                    width: 20,
                                                }, {
                                                    xtype      : 'xphonenumberfieldEST',
                                                    fieldLabel : 'FAX',
                                                    anchor     : '-5',
                                                    name       : 'customer_fax',
                                                    flex       : 1,
                                                    readOnly   : true,
                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: []
                                        }



                                    ]
                                }
                            ]
                        }
                    ]
                },
                /* Syarat IJB */
                {
                    xtype: 'panel',
                    bodyPadding: 10,
                    title: 'SERAH TERIMA',
                    collapsible: true,
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
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Rencana Serah Terima',
                                                    anchor: '-5',
                                                    allowBlank: false,
                                                    readOnly: true,
                                                    name: 'rencana_serahterima_date',
                                                    flex: 1,
                                                }, {
                                                    xtype: 'splitter',
                                                    width: 20,
                                                },{
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Serah Terima',
                                                    anchor: '-5',
                                                    allowBlank: false,
                                                    name: 'serahterima_date',
                                                    flex: 1,
                                                }]
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
                    }
                ]
            }
        ];
        return x;
    }
});