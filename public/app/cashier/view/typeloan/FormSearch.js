Ext.define('Cashier.view.typeloan.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.typeloanformsearch',
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
                    fieldLabel: 'Project',
                    itemId: 'fd_project_id',
                    id: 'project_id_ddd',
                    name: 'project_id',
                    emptyText: 'Project Name',
                    width: 400,
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null,
                    grow: true,
                },
                {
                    xtype: 'projectptcombobox',
                    fieldLabel: 'Pt/Company',
                    itemId: 'fd_pt_id',
                    id: 'pt_id_ddd',
                    name: 'pt_id',
                    emptyText: 'Pt/Company',
                    width: 400,
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
                {
                    xtype: 'textfield',
                    itemId: 'fs_code',
                    id: 'code_ddd',
                    name: 'code',
                    fieldLabel: 'Code',
                    allowBlank: true,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                },
                {
                    xtype: 'textfield',
                    itemId: 'fs_typeloanprefix',
                    id: 'typeloanprefix_ddd',
                    name: 'typeloanprefix',
                    fieldLabel: 'Prefix',
                    allowBlank: true,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                },
                {
                    xtype: 'flaginterestcombobox',
                    fieldLabel: 'Flag Interest',
                    itemId: 'fd_flag_interest',
                    id: 'flag_interest_ddd',
                    name: 'flag_interest',
                    emptyText: 'Flag for Interest',
                    width: 250,
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
                {
                    xtype: 'textfield',
                    itemId: 'fs_description',
                    id: 'description_ddd',
                    name: 'description',
                    fieldLabel: 'Description',
                    allowBlank: true,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
