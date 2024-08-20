Ext.define('Cashier.view.coadept.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.coadeptformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 470,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
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
                    name: 'coadept_id',
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'projectcombobox',
                            fieldLabel: 'Project',
                            itemId: 'fd_project_id',
                            id: 'project_id',
                            name: 'project_id',
                            emptyText: 'Project Name',
                            padding: '0 30 10 0',
                            anchor: '100%',
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            grow: true,
                        },
                        {
                            xtype: 'splitter',
                            width: '40'
                        },
                        {
                            xtype: 'projectptcombobox',
                            fieldLabel: 'Pt/Company',
                            itemId: 'fd_pt_id',
                            id: 'pt_id',
                            name: 'pt_id',
                            emptyText: 'Pt/Company',
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'departmentcombobox',
                            itemId: 'fdms_department_id',
                            name: 'department_id',
                            width: 300,
                            fieldLabel: 'Department',
                            allowBlank: false,
                            enforceMaxLength: true,
                        },
                    ]
                },
                {
                    xtype: 'tbspacer',
                    height: 10
                },
                {
                    xtype: 'coadeptgridcoa',
                    itemId: 'fd_coadeptgridcoa',
                    name: 'coadeptgridcoa',
                    title: 'Chart Of Account',
                    width: '98%',
                    height: 300,
                    padding: '20px 0 0 20px',
                    disabled:true,
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    generateDockedItem: function () {
        var x = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                padding: '0 0 0 450',
                layout: {
                    padding: 6,
                    type: 'hbox',
                },
                items: [
                    {
                        xtype: 'button',
                        action: 'save',
                        itemId: 'btnSave',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Save'
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Cancel',
                        handler: function () {
                            this.up('window').close();
                        }
                    },
                ]
            }
        ];
        return x;
    }
});

