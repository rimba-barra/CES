Ext.define('Cashier.view.mastercheque.FormTanggal', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.masterchequeformtanggaldata',
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
                    xtype: 'hiddenfield',
                    name: 'cheque_cheque_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'kasbank_kasbank_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'kasbank_dataflow'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'cheque_cheque_type'
                },
                 {
                    xtype: 'textfield',
                    name: 'voucherId',
                    fieldLabel: 'Voucher ID',
                    readOnly:true,
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Tanggal',
                    name: 'cheque_issued_date',
                    format: 'd/m/Y',
                    submitFormat: 'Y-m-d',
                    allowBlank: false,
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
                        action: 'save',
                        itemId: 'btnSave',
                        padding: 5,
                        width: 75, iconCls: 'icon-save',
                        text: ' OK '
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
});

