Ext.define('Cashier.view.masteroffbalancesheet.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.masteroffbalancesheetformsearch',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                xtype: 'combobox',
                width: '100%',
                labelAlign: 'top',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '91%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'project_id'
                },
                {
                    xtype: 'projectptcombobox',
                    fieldLabel:'PT',
                    emptyText: 'Select PT/Project',
                    name: 'pt_id',
                    allowBlank: false,
                    margin: '0 0 5 0',
                    enableKeyEvents: true,
                    enforeMaxLength: true,
                    forceSelection:true,
                },
                {
                    xtype: 'textfield',
                    name: 'banktype',
                    fieldLabel: 'Bank Type',
                    anchor: '97%'
                },
                {
                    xtype: 'textfield',
                    name: 'bank_name',
                    fieldLabel: 'Bank Name',
                    anchor: '97%'
                },
                {
                    xtype: 'textfield',
                    name: 'bank_acc_no',
                    fieldLabel: 'Bank ACC No',
                    anchor: '97%'
                }

            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
