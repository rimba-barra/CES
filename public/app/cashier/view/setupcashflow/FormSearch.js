Ext.define('Cashier.view.setupcashflow.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.setupcashflowformsearch',
    requires: [
        'Cashier.library.template.combobox.Ptbydefaultprojectcombobox',
        'Cashier.library.template.combobox.Projectcombobox',
        'Cashier.library.template.combobox.Departmentcombobox',
        'Cashier.library.template.combobox.Cashflowtypecombobox',
        'Cashier.library.template.combobox.Ptcombobox'
    ],
    uniquename: '_setupcashflowformsearch',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    id: 'hideparam' + me.uniquename,
                    value: 'default'
                },
                {
                    xtype: 'projectcombobox',
                    name: 'project_id',
                    fieldLabel: 'Project',
                    enforceMaxLength: true,
                    maxLength: 100,
                    allowBlank: false,
                    enableKeyEvents: true,
                    anchor: '-5',
                    tpl: Ext.create('Ext.XTemplate',
                        '<table class="x-grid-table" width="500px" >',
                            '<tr class="x-grid-row">',
                                '<th width="200px"><div class="x-column-header x-column-header-inner">Project</div></th>',
                            '</tr>',
                            '<tpl for=".">',
                                '<tr class="x-boundlist-item">',
                                    '<td><div class="x-grid-cell x-grid-cell-inner">{projectname}</div></td>',
                                '</tr>',
                            '</tpl>',
                        '</table>'
                    ), 
                    value: parseInt(apps.project)
                },
                {
                    xtype: 'ptcombobox',
                    itemId: 'fs_pt_id',
                    id: 'pt_id' + me.uniquename,
                    name: 'pt_id',
                    fieldLabel: 'PT',
                    enforceMaxLength: true,
                    maxLength: 100,
                    allowBlank: false,
                    enableKeyEvents: true,
                    anchor: '-5',
                    tpl: Ext.create('Ext.XTemplate',
                        '<table class="x-grid-table" width="500px" >',
                            '<tr class="x-grid-row">',
                                '<th width="200px"><div class="x-column-header x-column-header-inner">Pt</div></th>',
                            '</tr>',
                            '<tpl for=".">',
                                '<tr class="x-boundlist-item">',
                                    '<td><div class="x-grid-cell x-grid-cell-inner">{ptname}</div></td>',
                                '</tr>',
                            '</tpl>',
                        '</table>'
                    ),    
                    value: parseInt(apps.pt)
                },
                {
                     xtype: 'departmentcombobox',
                    itemId: 'fs_department_id',
                    id: 'department_id' + me.uniquename,
                    name: 'department_id',
                    fieldLabel: 'Department',
                    enforceMaxLength: true,
                    maxLength: 100,
                    anchor: '-5'
                },
                 {
                    xtype: 'cashflowtypecombobox',
                    itemId: 'fs_name',
                    name: 'cashflowtype_id',
                    fieldLabel: 'Cashflow Name',
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
