Ext.define('Erems.view.prosessp.FormDataProses', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.prosesspprosesformdata',
    requires: [
        'Erems.library.template.view.MoneyField'
    ],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 170,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'padding:5px 5px 0',
    editedRow: -1,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'dfdatefield',
                            name: 'proses_date',
                            fieldLabel: 'Tanggal Proses',
                            value: new Date()
                        },
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'dfdatefield',
                            name: 'pldate_start',
                            fieldLabel: 'Purchaseletter Date ',
                            margin: '0 5px 0 0',
                            value: new Date()
                        },
                        {
                            fieldLabel: 's/d',
                            margin: '5px 5px 0 0',
                            xtype: 'dfdatefield',
                            name: 'pldate_end',
                            labelWidth:20,
                                    value: new Date()
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
                        action: 'proses',
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