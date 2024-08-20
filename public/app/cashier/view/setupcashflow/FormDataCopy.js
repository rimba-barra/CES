Ext.define('Cashier.view.setupcashflow.FormDataCopy', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.setupcashflowformdatacopy',
    requires: [
        'Cashier.library.template.combobox.Ptprojectcombobox',
        'Cashier.library.template.combobox.Projectcombobox',
        'Cashier.model.Department'
    ],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 500,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    uniquename: '_setupcashflowformdatacopy',
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
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'projectcombobox',
                    fieldLabel: 'Project',
                    name: 'from_project_id',
                    allowBlank: false,
                    margin: '0 0 5 0',
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
                    )
                },
                {
                    xtype: 'ptprojectcombobox',
                    fieldLabel: 'PT',
                    name: 'from_pt_id',
                    allowBlank: false,
                    margin: '0 0 5 0',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['pt_id', 'ptname', 'project_id', 'projectname', 'projectpt_id'],
                        data: []
                    }),
                    tpl: Ext.create('Ext.XTemplate',
                        '<table class="x-grid-table" width="500px" >',
                            '<tr class="x-grid-row">',
                                '<th width="200px"><div class="x-column-header x-column-header-inner">PT</div></th>',
                                '<th width="200px"><div class="x-column-header x-column-header-inner">Project</div></th>',
                            '</tr>',
                            '<tpl for=".">',
                                '<tr class="x-boundlist-item">',
                                    '<td><div class="x-grid-cell x-grid-cell-inner">{ptname}</div></td>',
                                    '<td><div class="x-grid-cell x-grid-cell-inner">{projectname}</div></td>',
                                '</tr>',
                            '</tpl>',
                        '</table>'
                    )
                },
                {
                    xtype: 'projectcombobox',
                    fieldLabel: 'Copy to Project',
                    name: 'to_project_id',
                    allowBlank: false,
                    margin: '0 0 5 0',
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
                    )
                },
                {
                    xtype: 'ptprojectcombobox',
                    fieldLabel: 'Copy to PT',
                    name: 'to_pt_id',
                    allowBlank: false,
                    margin: '0 0 5 0',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['pt_id', 'ptname', 'project_id', 'projectname', 'projectpt_id'],
                        data: []
                    }),
                    tpl: Ext.create('Ext.XTemplate',
                        '<table class="x-grid-table" width="500px" >',
                            '<tr class="x-grid-row">',
                                '<th width="200px"><div class="x-column-header x-column-header-inner">PT</div></th>',
                                '<th width="200px"><div class="x-column-header x-column-header-inner">Project</div></th>',
                            '</tr>',
                            '<tpl for=".">',
                                '<tr class="x-boundlist-item">',
                                    '<td><div class="x-grid-cell x-grid-cell-inner">{ptname}</div></td>',
                                    '<td><div class="x-grid-cell x-grid-cell-inner">{projectname}</div></td>',
                                '</tr>',
                            '</tpl>',
                        '</table>'
                    )
                },
                {
                    xtype: 'radiogroup',
                    fieldLabel: 'Copy Method',
                    columns: 3,
                    vertical: true,
                    margin: '0 0 5 0',
                    items: [
                        { boxLabel: 'Selected Data', name: 'copy_method', inputValue: 1, checked: true },
                        { boxLabel: 'All Data', name: 'copy_method', inputValue: 2 }
                    ],
                    allowBlank: false
                },
                {
                    xtype: 'fieldset',
                    title: 'Mapping Department',
                    collapsible: true,
                    anchor: '99%',
                    collapsed: true,
                    items: [
                        {
                            xtype: 'setupcashflowgridmappingdept',
                            name: 'setupcashflowgridmappingdept',
                            title: 'Mapping Department',
                        }
                    ]
                }
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    generateDockedItem: function() {
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
                action: 'process',
                itemId: 'btnProcess',
                padding: 5,
                width: 75,
                iconCls: 'icon-save',
                text: 'Process'
            },
            {
                xtype: 'button',
                action: 'cancel',
                itemId: 'btnCancel',
                padding: 5,
                width: 75,
                iconCls: 'icon-cancel',
                text: 'Cancel',
                handler: function() {
                    this.up('window').close();
                }
            }
            ]
        }
        ];
        return x;
    },
});

