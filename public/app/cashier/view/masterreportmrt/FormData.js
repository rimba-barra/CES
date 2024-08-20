Ext.define('Cashier.view.masterreportmrt.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.masterreportmrtformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    deletedRows: [],
    editedRow: -1,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'left',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'combobox',
                    name: 'group_gl',
                    fieldLabel: 'Report type',
                    queryMode: 'local',
                    valueField: 'status',
                    allowBlank: false,
                    forceSelection: true,
                    displayField: 'description',
                    store: new Ext.data.JsonStore({
                        fields: ['status', 'description'],
                        data: [
                            {status: '1', description: 'Giro BCA'},
                            {status: '2', description: 'Cheque BCA'},
                            {status: '3', description: 'Giro Mandiri'},
                            {status: '4', description: 'Cheque Mandiri'},
                        ]
                    }),
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
                        text: 'Close',
                        handler: function () {
                            this.up('window').close();
                        }
                    }
                ]
            }
        ];
        return x;
    },
});

