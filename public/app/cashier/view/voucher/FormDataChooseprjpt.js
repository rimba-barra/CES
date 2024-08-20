Ext.define('Cashier.view.voucher.FormDataChooseprjpt', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.voucherformchooseprjpt',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    kosongGa: -1,
    height: 250,
    uniquename: '_voucherformchooseprjpt',
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
                    name: 'project_project_id',
                    fieldLabel: 'Project',
                    displayField: 'project_name',
                    valueField: 'project_project_id',
                    width: '300',
                    queryMode: 'local',
                    allowBlank: false,
                    msgTarget: "side",
                    enforceMaxLength: true,
                    blankText: 'This should not be blank!',
                    //readOnly: true,
                    //fieldStyle: 'background-color:#eee;background-image: none;'
                },
                {
                    xtype: 'splitter',
                    width: '20'
                },
                {
                    xtype: 'combobox',
                    name: 'pt_pt_id',
                    fieldLabel: 'Company',
                    displayField: 'name',
                    valueField: 'pt_id',
                    width: '300',
                    forceSelection: true,
                    allowBlank: false,
                    enforceMaxLength: true,
                            //readOnly: true,
                            //fieldStyle: 'background-color:#eee;background-image: none;'
                },
                {
                    xtype: 'splitter',
                    width: '20'
                },
                {
                    xtype: 'combobox',
                    name: 'notevoucher',
                    fieldLabel: 'Pilihan menampilkan catatan pada voucher.',
                    queryMode: 'local',
                    valueField: 'status',
                    allowBlank: false,
                    forceSelection: true,
                    msgTarget: "side",
                    blankText: 'This should not be blank!',
                    displayField: 'description',
                    store: new Ext.data.JsonStore({
                        fields: ['status', 'description'],
                        data: [
                            {status: '1', description: 'Notes Voucher'},
                            {status: '2', description: 'Notes Voucher and Note of Vendor'},
                            {status: '3', description: 'Note of Vendor'},
                            {status: '4', description: 'Blank'},
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
                        xtype: 'tbspacer',
                        flex: 1
                    },
                    {
                        xtype: 'button',
                        action: 'printchooseprjpt',
                        itemId: 'btnSave',
                        padding: 5,
                        width: 100, iconCls: 'icon-print',
                        text: 'Print'
                    },
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

