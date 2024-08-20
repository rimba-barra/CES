Ext.define('Erems.view.followup.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.followupformdata',
    requires: ['Erems.template.ComboBoxFields'],
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
                    name: 'followup_id'
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
                    fieldLabel: 'Tgl Proses'
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
                            fieldLabel: 'Periode Transaksi Pembelian'
                        },
                        {
                            xtype: 'dfdatefield',
                            value: new Date(),
                            labelWidth: 20,
                            margin: '5px 20px 0 0',
                            width: 170,
                            name: 'periode_end',
                            fieldLabel: 's/d'
                        }
                    ],
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

