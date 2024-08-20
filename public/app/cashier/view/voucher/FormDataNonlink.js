Ext.define('Cashier.view.voucher.FormDataNonlink', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.nonlinkformdata',
    frame: true,
    autoScroll: true,
    kosongGa: -1,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    editedRow: -1,
    initComponent: function () {
        var me = this;

        var cbf = new Cashier.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'top',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [{
                    xtype: 'hiddenfield',
                    itemId: 'fdms_id',
                    name: 'payment_id'
                },
                {
                    xtype: 'hiddenfield',
                    itemId: 'fskasbank_id',
                    name: 'kasbank_id'
                },
                {
                    xtype: 'hiddenfield',
                    itemId: 'fschedule_dsid',
                    name: 'paymenttype'
                },
                {
                    xtype: 'combobox',
                    queryMode: 'local',
                    fieldLabel: 'Payment Type',
                    name: 'paymenttype_id',
                    displayField: 'paymenttype',
                    valueField: 'paymenttype_id',
                    anchor: '-70'

                },
                //me.myField.number('payment', 'Amount'),
                {
                    xtype: 'xmoneyfield',
                    fieldLabel: 'Amount',
                    name: 'amount',
                    anchor: '-70',
                    fieldStyle: 'text-align:right',
                    value: 0.00,
                },
                {
                    xtype: 'textareafield',
                    height: 60,
                    itemId: 'fdms_description',
                    name: 'description',
                    fieldLabel: 'Description',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 255,
                    flex: 1,
                    anchor: '-70'
                }],
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
                        itemId: 'btnSaveOps',
                        padding: 5,
                        width: 75, iconCls: 'icon-save',
                        text: 'Save'
                    },
                    {
                        xtype: 'tbspacer',
                        flex: 1
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel2',
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

