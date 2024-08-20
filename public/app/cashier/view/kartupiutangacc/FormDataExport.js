Ext.define('Cashier.view.kartupiutangacc.FormDataExport', {
    extend: 'Ext.form.Panel',
    alias: 'widget.kartupiutangaccformdataexport',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 150,
    bodyBorder: true,
    bodyPadding: 10,
    uniquename: "_kartupiutangaccexport",
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
                    xtype: 'combobox',
                    id: 'type',
                    name: 'type',
                    fieldLabel: 'Type',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['type', 'label'],
                        data : [
                            {"type":"all", "label":"ALL"},
                            {"type":"pph", "label":"PPH"},
                            {"type":"ppn", "label":"PPN"},
                            {"type":"um", "label":"UM"},
                        ]
                    }),
                    valueField: "type",
                    displayField: "label",
                    allowBlank: false,
                    value: 'all'
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    fieldLabel: 'Period',
                    items: [
                        {
                            xtype: 'datefield',
                            name: 'period_from',
                            allowBlank: false,
                            width: 90,
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d'
                        },
                        {
                            xtype: 'label',
                            text: 's/d',
                            margin: '0 0 0 10'
                        },
                        {
                            xtype: 'datefield',
                            name: 'period_until',
                            allowBlank: false,
                            width: 90,
                            margin: '0 0 0 10',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d'
                        }
                    ]
                }
            ],
            dockedItems: me.generateDockedItem()
        }),

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
                        action: 'process',
                        itemId: 'btnProcess',
                        padding: 5,
                        width: 75, 
                        iconCls: 'icon-excel',
                        text: 'Process'
                    },
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
    },
})