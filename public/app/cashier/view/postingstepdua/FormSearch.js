Ext.define('Cashier.view.postingstepdua.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.postingstepduaformsearch',
    uniquename: '_fspostingstepdua',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'hiddenfield',
                    id: 'hideparam' + me.uniquename,
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    id: 'prefix_id' + me.uniquename,
                    name: 'prefix_id',
                },
                {
                    xtype: 'ptusercombobox',
                    fieldLabel: 'Pt / Company',
                    itemId: 'pt_id' + me.uniquename,
                    id: 'pt_id' + me.uniquename,
                    name: 'pt_id',
                    emptyText: '',
                    width: 200,
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
                {
                    xtype: 'voucherprefixcombobox',
                    fieldLabel: 'Prefix',
                    itemId: 'fd_voucherprefix_id' + me.uniquename,
                    id: 'voucherprefix_id' + me.uniquename,
                    name: 'voucherprefix_id',
                    emptyText: '',
                    width: 200,
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
