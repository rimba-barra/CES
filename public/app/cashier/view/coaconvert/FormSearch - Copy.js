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
                    itemId: 'fd_project_id'+me.uniquename,
                    id: 'project_id'+me.uniquename,
                    name: 'project_id',
                    fieldLabel: 'Project',
                    emptyText: 'Select Project',
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
                {
                    xtype: 'ptusercombobox',
                    itemId: 'fd_pt_id'+me.uniquename,
                    id: 'pt_id'+me.uniquename,
                    name: 'pt_id',
                    fieldLabel: 'PT / Company',
                    emptyText: 'Select PT / Company',
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
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
                }   
                
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
