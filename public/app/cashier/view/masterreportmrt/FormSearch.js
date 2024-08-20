Ext.define('Cashier.view.masterreportmrt.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.masterreportmrtformsearch',
    initComponent: function () {
        var me = this;


        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'combobox',
                    name: 'pt_id',
                    fieldLabel: 'Company',
                    displayField: 'name',
                    valueField: 'pt_id',
                    readOnly: false,
                    allowBlank: true,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null,
                    forceSelection: true,
                },
                {
                    xtype: 'textfield',
                    itemId: 'fsms_coacode',
                    name: 'coa',
                    fieldLabel: 'Chart of Account(COA)',
                    allowBlank: false,
                    enforceMaxLength: true,
                    maxLength: 9,
                    absoluteReadOnly: true,
                    anchor: '-5',
                    enableKeyEvents: true
                },
                {
                    xtype: 'textfield',
                    itemId: 'fsms_name',
                    name: 'name',
                    fieldLabel: 'Account Name',
                    enforceMaxLength: true,
                    maxLength: 100,
                    anchor: '-5'
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
