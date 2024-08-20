Ext.define('Cashier.view.journal.FormDataCopy', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.journalcopyformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 150,
    bodyBorder: true,
    bodyPadding: 10,
    kosongGa: -1,
    uniquename: '_journalcopy',
    id: 'journalcopyformdataformdataID',
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
                    value: 'copyjournal'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'journal_id',
                    id: 'journal_id' + me.uniquename,
                },
                {
                    xtype: 'textfield',
                    name: 'voucher_no',
                    id: 'voucher_no' + me.uniquename,
                    allowBlank: false,
                    fieldLabel: 'New Voucher No'
                },
                {
                    xtype: 'datefield',
                    name: 'voucher_date',
                    id: 'voucher_date' + me.uniquename,
                    allowBlank: false,
                    fieldLabel: 'New Journal Date',
                    format: 'd-m-Y',
                    submitFormat: 'Y-m-d',
                    altFormats: 'd-m-Y|Y-m-d|dmY|Ymd|mdY|dmy|ymd|mdy',
                    value: new Date(),
                    anchor: '60%',
                    listeners: {
                        blur: function(field) {
                            if( ! field.isValid()) {
                                Ext.Msg.alert("Alert", "Invalid Date!");
                                Ext.getCmp("voucher_date" + me.uniquename).setValue("");
                                return false;
                            }
                        }
                    }
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

