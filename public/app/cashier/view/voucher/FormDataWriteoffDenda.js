Ext.define('Cashier.view.voucher.FormDataWriteoffDenda', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.voucherformwriteoffdenda',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    kosongGa: -1,
    height: 350,
    uniquename: '_voucherwriteoffdenda',
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
                    name: 'wd_unit_id',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'wd_purchaseletter_id',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'wd_schedule_id',
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Schedule',
                    name: 'wd_schedule_description',
                    readOnly: true,
                    width: 300,
                    allowBlank: true,
                },
                {
                    xtype: 'xmoneyfield',
                    name: 'wd_remaining_denda',
                    itemId: 'wd_remaining_denda',
                    id: 'wd_remaining_denda',
                    fieldLabel: 'Remaining Denda',
                    width: '100',
                    readOnly: true,
                    allowBlank: true,
                    fieldStyle: 'text-align:right;align:right;background-color:#eee;background-image: none;',
                },
                {
                    xtype: 'xmoneyfield',
                    name: 'wd_amount_writeoff',
                    fieldLabel: 'Writeoff Amount',
                    itemId: 'wd_amount_writeoff',
                    id: 'wd_amount_writeoff',
                    width: '100',
                    readOnly: false,
                    allowBlank: false,
                    fieldStyle: 'text-align:right;align:right;background-color:#ffffff;background-image: none;',
                },
                {
                    xtype: 'xmoneyfield',
                    name: 'wd_afterwriteoff_denda',
                    itemId: 'wd_afterwriteoff_denda',
                    id: 'wd_afterwriteoff_denda',
                    fieldLabel: 'After Writeoff Denda',
                    width: '100',
                    readOnly: true,
                    allowBlank: true,
                    fieldStyle: 'text-align:right;align:right;background-color:#eee;background-image: none;',
                },
                {
                    xtype: 'textareafield',
                    fieldLabel: 'Notes',
                    anchor: '-5',
                    name: 'wd_description',
                    width: 300,
                    allowBlank: false,
                    fieldStyle: 'text-transform: uppercase',
                    height: 40,
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
                        text: 'Submit'
                    },
                    {
                        xtype: 'button',
                        action: 'close',
                        itemId: 'btnClose',
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

