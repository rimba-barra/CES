Ext.define('Erems.view.prosescac.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.prosescacformdata',
    requires: ['Erems.template.ComboBoxFields', 'Erems.view.prosescac.GridDetail', 'Erems.view.prosescac.GridNomor'],
    frame: true,
    autoScroll: true,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    editedRow: -1,
    height: 500,
    initComponent: function() {
        var me = this;

        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'left',
            },
            items: [{
                    xtype: 'hiddenfield',
                    name: 'prosescac_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'customer_customer_id'
                },
                {
                    xtype: 'dfdatefield',
                    value: new Date(),
                    name: 'proses_date',
                    //   readOnly: true,
                    //        keepRO: true,
                    fieldLabel: 'Tgl Proses',
                    editable:false
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'dfdatefield',
                            value: new Date(),
                            margin: '0 20px 0 0',
                            name: 'periode_start',
                            width: 250,
                            fieldLabel: 'Periode Transaksi Pembelian',
                            editable:false
                        },
                        {
                            xtype: 'dfdatefield',
                            value: new Date(),
                            labelWidth: 20,
                            margin: '5px 20px 0 0',
                            width: 170,
                            name: 'periode_end',
                            fieldLabel: 's/d',
                            editable:false
                        }
                    ],
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'fieldset',
                            title: 'Rekap Transaksi Member',
                            items: [
                                {
                                    xtype: 'prosescacgriddetail',
                                    height: 310,
                                    width: 440,
                                    margin: '0 10px 0 0'
                                },
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Detail Nomor Undian',
                            items: [
                                {
                                    xtype: 'prosescacgridnomor',
                                    height: 310,
                                    width: 230
                                }
                            ]
                        },
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
                        action: 'process',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-gear',
                        text: 'Proses'
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
    },
});

