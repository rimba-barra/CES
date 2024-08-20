Ext.define('Cashier.view.reportarkawasan.FormSearch',{
    extend:'Cashier.library.template.view.FormSearch',
    alias:'widget.reportarkawasanformsearch',
    initComponent: function() {
        var me = this;
        

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'pt_id',
                },
                {
                    xtype: 'textfield',
                    itemId: 'fsms_name',
                    name: 'name',
                    fieldLabel: 'Name',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50
                },
                {
                    xtype: 'textfield',
                    itemId: 'fsms_description',
                    name: 'description',
                    fieldLabel: 'Description',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50
                },
                {
                    xtype: 'combobox',
                    name: 'pt_pt_id',
                    fieldLabel: 'Company',
                    displayField: 'name',
                    valueField: 'pt_id',
                    queryMode:'local',
                },
                {
                    xtype: 'combobox',
                    name: 'year',
                    fieldLabel: 'Periode',
                    displayField: 'year',
                    valueField: 'year',
                    queryMode:'local',
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
