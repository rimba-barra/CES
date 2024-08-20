Ext.define('Cashier.view.setupcashflow.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.setupcashflowformdata',
    requires: [
        'Cashier.view.setupcashflow.Gridcoasource',
        'Cashier.view.setupcashflow.Gridcoadestination',
        'Cashier.library.template.combobox.Cashflowtypecombobox',
        'Cashier.library.template.combobox.Cashflowtypecomboboxv2',
        'Cashier.library.template.combobox.Ptbydefaultprojectcombobox',
        'Cashier.library.template.combobox.Departmentcombobox',
        'Cashier.library.template.combobox.Ptcombobox',
        'Cashier.library.template.combobox.Projectcombobox'
    ],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 500,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    uniquename: '_setupcashflowformdata',
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
                    xtype: 'hiddenfield',
                    name: 'setupcashflow_id',
                    id: 'setupcashflow_id' + me.uniquename,
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'vbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'projectcombobox',
                            name: 'project_id',
                            fieldLabel: 'Project',
                            enforceMaxLength: true,
                            maxLength: 100,
                            allowBlank: false,
                            enableKeyEvents: true,
                            width: 500,
                            readOnly: true,
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
                            width: 500,
                            readOnly: true,
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
                        },
                        {
                            xtype: 'departmentcombobox',
                            itemId: 'fs_department_id',
                            id: 'department_id' + me.uniquename,
                            name: 'department_id',
                            fieldLabel: 'Department',
                            allowBlank: false,
                            width: 500,
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    
                    items: [
                        {
                            xtype: 'cashflowtypecomboboxv2',
                            itemId: 'fs_cashflowtype_id',
                            id: 'cashflowtype_id' + me.uniquename,
                            name: 'cashflowtype_id',
                            fieldLabel: 'Cashflow Name',
                            allowBlank: false,
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                        },
                                /*
                                 {
                                 xtype: 'button',
                                 action: 'create_vendor',
                                 itemId: 'btnCreateVendor',
                                 width: 80,
                                 iconCls: 'icon-new',
                                 text: 'Create'
                                 },
                                 */
                        // SEFTIAN ALFREDO 12/04/2022
                        {
                            xtype: 'splitter',
                            width: '130'
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'is_link_coa',
                            name: 'is_link_coa',
                            boxLabel: 'Link COA CF ?',
                            inputValue: '1',
                            uncheckedValue: '0',
                            width: 100
                        }
                    ]
                },
                {
                    xtype: 'tbspacer',
                    height: 20,
                },
                {
                    xtype: 'fieldcontainer',
                    align: 'right',
                    region: 'center',
                    bodyBorder: false,
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'vbox',
                            border: false,
                            bodyBorder: false,
                            items: [
                                {
                                    xtype: 'setupcashflowgridsource',
                                    flex: 1,
                                    height: 300,
                                    width: 320,
                                },
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'vbox',
                            border: false,
                            bodyBorder: false,
                            items: [
                                {
                                    xtype: 'tbspacer',
                                    height: 100,
                                    width: 80,
                                },
                                {
                                    xtype: 'button',
                                    name: 'btntodesctionation',
                                    action: 'btntodesctionation',
                                    id: 'btntodesctionation',
                                    text: '>>',
                                    margin: '10 5 3 20',
                                },
                                {
                                    xtype: 'button',
                                    name: 'btntosource',
                                    action: 'btntosource',
                                    id: 'btntosource',
                                    text: '<<',
                                    margin: '10 5 3 20',
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'vbox',
                            border: false,
                            bodyBorder: false,
                            items: [
                                {
                                    xtype: 'setupcashflowgridcoadestination',
                                    flex: 1,
                                    height: 300,
                                    width: 370,
                                },
                            ]
                        },
                    ]
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

