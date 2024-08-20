Ext.define('Cashier.view.coaconvert.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.coaconvertformsearch',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'projectcombobox',
                    name: 'project_id',
                    width: 100,
                    fieldLabel: 'Project',
                    queryMode: 'local',
                    msgTarget: "side",
                    enforceMaxLength: true
                },
                {
                    xtype: 'textfield',
                    itemId: 'fs_coa_old',
                    name: 'coa_old',
                    fieldLabel: 'Coa Old',
                    allowBlank: true,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 20,
                },               
                {
                    xtype: 'textfield',
                    itemId: 'fs_coa_new',
                    name: 'coa_new',
                    fieldLabel: 'Coa New',
                    allowBlank: true,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 20,
                } ,
                {
                    xtype: 'textareafield',
                    itemId: 'fsms_descriptionprpt',
                    name: 'descriptionprpt',
                    fieldLabel: 'Project - PT',
                    enforceMaxLength: true,
                    readOnly: true,
                    enableKeyEvents: true
                }
                
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
