Ext.define('Cashier.view.voucher.FormDataVendorBank', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.voucherformvendorbank',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    kosongGa: -1,
    height: 350,
    uniquename: '_vouchervendorbank',
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
                    name: 'vendor_bankacc_id',
                },
                {
                    xtype: 'combobox',
                    name: 'vendor_bank_name',
                    fieldLabel: 'Bank Name',
                    displayField: 'bank_name',
                    valueField: 'bank_id',
                    width: '250',
                    allowBlank: true,
                    forceSelection: true,
                    msgTarget: "side",
                    queryMode: 'local',
                    enforceMaxLength: true,
                    matchFieldWidth: false,
                    tpl: Ext.create('Ext.XTemplate',
                            '<table class="x-grid-table" width="300px" >',
                            '<tr class="x-grid-row">',
                            '<th width="300px"><div class="x-column-header x-column-header-inner">Bank Name</div></th>',
                            '<th width="350px"><div class="x-column-header x-column-header-inner">Bank Company Name</div></th>',
                            '</tr>',
                            '<tpl for=".">',
                            '<tr class="x-boundlist-item">',
                            '<td ><div class="x-grid-cell x-grid-cell-inner">{bank_name}</div></td>',
                            '<td ><div class="x-grid-cell x-grid-cell-inner">{bank_company_name}</div></td>',
                            '</tr>',
                            '</tpl>',
                            '</table>'
                            ),
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Bank Account No',
                    name: 'vendor_bank_account_no',
                    readOnly: false,
                    width: 300,
                    allowBlank: false,
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Bank Account Name',
                    name: 'vendor_bank_account_name',
                    readOnly: false,
                    width: 300,
                    allowBlank: false,
                },
                {
                    xtype: 'combobox',
                    name: 'vendor_bank_currency',
                    fieldLabel: 'Currency',
                    displayField: 'currency_name',
                    valueField: 'currency_id',
                    width: '250',
                    allowBlank: true,
                    forceSelection: true,
                    msgTarget: "side",
                    queryMode: 'local',
                    enforceMaxLength: true,
                    matchFieldWidth: false,
                    tpl: Ext.create('Ext.XTemplate',
                            '<table class="x-grid-table" width="300px" >',
                            '<tr class="x-grid-row">',
                            '<th width="300px"><div class="x-column-header x-column-header-inner">Currency</div></th>',
                            '<th width="350px"><div class="x-column-header x-column-header-inner">Description</div></th>',
                            '</tr>',
                            '<tpl for=".">',
                            '<tr class="x-boundlist-item">',
                            '<td ><div class="x-grid-cell x-grid-cell-inner">{currency_name}</div></td>',
                            '<td ><div class="x-grid-cell x-grid-cell-inner">{description}</div></td>',
                            '</tr>',
                            '</tpl>',
                            '</table>'
                            ),
                },
                {
                    xtype: 'textareafield',
                    fieldLabel: 'Notes',
                    name: 'vendor_bank_remarks',
                    readOnly: false,
                    width: 300,
                    height: 40,
                    allowBlank: true,
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

