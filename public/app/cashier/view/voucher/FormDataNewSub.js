Ext.define('Cashier.view.voucher.FormDataNewSub', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.voucherformnewsub',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    kosongGa: -1,
    height: 250,
    uniquename: '_voucherformnewsub',
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
                    name: 'fns_project_id',
                },{
                    xtype: 'hiddenfield',
                    name: 'fns_pt_id',
                },{
                    xtype: 'hiddenfield',
                    name: 'fns_kelsub_id',
                },
                {
                    xtype: 'textfield',
                    name: 'code',
                    fieldLabel: 'Sub Code',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    anchor: '-5',
                    width: '300',
                    readOnly: false,
                    allowBlank: false,

                },
                {
                    xtype: 'textareafield',
                    name: 'description',
                    fieldLabel: 'Sub Description',
                    enforceMaxLength: true,
                    anchor: '-5',
                    width: '300',
                    readOnly: false,
                    maskRe: /[^\`\"\']/,
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
                        xtype: 'tbspacer',
                        flex: 1
                    },
                    {
                        xtype: 'button',
                        action: 'save',
                        itemId: 'btnSave',
                        padding: 5,
                        width: 100, iconCls: 'icon-save',
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

