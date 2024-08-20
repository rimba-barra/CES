Ext.define('Cashier.view.journaltemplate.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.journaltemplateformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 400,
    bodyBorder: true,
    bodyPadding: 10,
    uniquename: "_fdjournaltemplate",
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
                    id: 'hideparam' + me.uniquename,
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    id: 'journaltemplate_id' + me.uniquename,
                    name: 'journaltemplate_id',
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
                            itemId: 'fd_project_id' + me.uniquename,
                            id: 'project_id' + me.uniquename,
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
                            itemId: 'fd_pt_id' + me.uniquename,
                            id: 'pt_id' + me.uniquename,
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
                            xtype: 'deptprefixcombobox',
                            id: 'fdms_department_id' + me.uniquename,
                            itemId: 'fdms_department_id' + me.uniquename,
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
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'coadeptvouchercombobox',
                            fieldLabel: 'Account Code',
                            itemId: 'fd_coa_id' + me.uniquename,
                            id: 'coa_id' + me.uniquename,
                            name: 'coa_id',
                            emptyText: 'Select COA',
                            width: 230,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                    ]
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
                            xtype: 'textfield',
                            fieldLabel: 'Account Name',
                            itemId: 'fd_coaname' + me.uniquename,
                            id: 'coaname' + me.uniquename,
                            name: 'coaname',
                            emptyText: 'Auto Value',
                            width: 400,
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: "splitter",
                            width: "10",
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Code',
                            itemId: 'fd_code' + me.uniquename,
                            id: 'code' + me.uniquename,
                            name: 'code',
                            emptyText: 'Manual Input',
                            width: 300,
                            readOnly: false,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: "splitter",
                            width: "10",
                        },
                        {
                            xtype: 'textareafield',
                            itemId: 'fdms_description' + me.uniquename,
                            id: 'description' + me.uniquename,
                            name: 'description',
                            fieldLabel: 'Description',
                            allowBlank: true,
                            enforceMaxLength: true,
                            grow: true,
                            width: 500,
                        },
                    ]
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

