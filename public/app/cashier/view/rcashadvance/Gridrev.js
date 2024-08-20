Ext.define('Cashier.view.rcashadvance.Gridrev', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.rcashadvancegridrev',
    store: 'Rcashadvancelog',
    bindPrefixName: 'Rcashadvance',
    itemId: 'Rcashadvancelog',
    newButtonLabel: 'Add New',
    title: 'Cash advance revision',
    uniquename: '_rcashadvancegridrev',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            //contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                me.generateActionColumnrev(),
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_kasbon_id',
                    width: 100,
                    dataIndex: 'kasbon_id',
                    hideable: false,
                    text: 'Cash Advance ID'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_projectname',
                    width: 120,
                    dataIndex: 'projectname',
                    hideable: false,
                    text: 'Project'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ptname',
                    width: 180,
                    dataIndex: 'ptname',
                    hideable: false,
                    text: 'PT (Company)'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_department',
                    width: 180,
                    dataIndex: 'department',
                    hideable: false,
                    text: 'Department'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_statusdata',
                    width: 100,
                    dataIndex: 'statusdata',
                    hideable: false,
                    text: 'Status'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_voucher_no',
                    width: 100,
                    dataIndex: 'voucher_no',
                    hideable: false,
                    text: 'Voucher No'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_revision_date',
                    width: 100,
                    dataIndex: 'revision_date',
                    hideable: false,
                    text: 'Revision Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_amount',
                    width: 100,
                    dataIndex: 'amount',
                    hideable: false,
                    text: 'Old Amount'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_amount_revision',
                    width: 100,
                    dataIndex: 'amount_revision',
                    hideable: false,
                    text: 'New Amount'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_remaining_balance',
                    width: 150,
                    dataIndex: 'remaining_balance',
                    hideable: false,
                    text: 'Old Remaining Balance'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_remaining_balance_revision',
                    width: 150,
                    dataIndex: 'remaining_balance_revision',
                    hideable: false,
                    text: 'New Remaining Balance'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_revision_note',
                    width: 200,
                    dataIndex: 'revision_note',
                    hideable: false,
                    text: 'Description'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_employeename',
                    width: 100,
                    dataIndex: 'employeename',
                    hideable: false,
                    text: 'Revision by'
                },
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function () {
        var me = this;
        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 100,
                items: [
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        bodyBorder: false,
                        defaults: {
                            layout: 'fit'
                        },
                        padding: '0 0 0 0',
                        items: [
                            {
                                xtype: 'ptusercombobox',
                                itemId: 'fd_pt_id' + me.uniquename,
                                id: 'pt_id' + me.uniquename,
                                name: 'pt_id',
                                fieldLabel: 'PT / Company',
                                emptyText: 'Select PT / Company',
                                enforceMaxLength: true,
                                enableKeyEvents: true,
                                rowdata: null

                            },
                            {
                                xtype: 'splitter',
                                width: '5'
                            },
                            {
                                xtype: 'departmentcombobox',
                                itemId: 'fd_department_id' + me.uniquename,
                                id: 'department_id' + me.uniquename,
                                name: 'department_id',
                                fieldLabel: 'Department',
                                emptyText: 'Select Department',
                                enforceMaxLength: true,
                                enableKeyEvents: true,
                                rowdata: null

                            },
                            {
                                xtype: 'splitter',
                                width: '5'
                            },
                            {
                                xtype: 'statusciacombobox',
                                itemId: 'fd_statusdata' + me.uniquename,
                                id: 'statusdata' + me.uniquename,
                                name: 'statusdata',
                                fieldLabel: 'Status',
                                emptyText: 'Select Status',
                                enforceMaxLength: true,
                                enableKeyEvents: true,
                                rowdata: null

                            },
                            {
                                xtype: 'splitter',
                                width: '5'
                            },
                            {
                                xtype: 'textfield',
                                itemId: 'fdms_voucher_no' + me.uniquename,
                                name: 'voucher_no',
                                fieldLabel: 'Voucher No.',
                                allowBlank: false,
                                enableKeyEvents: true,
                                enforceMaxLength: true,
                                maxLength: 20,
                            },
                            {
                                xtype: 'splitter',
                                width: '5'
                            },
                            {
                                xtype: 'button',
                                action: 'search',
                                itemId: 'btnSearch',
                                padding: 5,
                                width: 75,
                                iconCls: 'icon-search',
                                text: 'Search'
                            },
                            {
                                xtype: 'button',
                                action: 'reset',
                                itemId: 'btnReset',
                                padding: 5,
                                width: 75,
                                iconCls: 'icon-reset',
                                text: 'Reset'
                            }
                        ]
                    },
                ]   
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }
        ];
        return dockedItems;
    },
    generateActionColumnrev: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            hidden: true,
            itemId: 'actioncolumn',
            width: 50,
            resizable: false,
            align: 'right',
            hideable: false,
            items: [
                {
                    text: 'Edit',
                    iconCls: 'icon-edit',
                    bindAction: me.bindPrefixName + 'Editrev',
                    altText: 'Edit',
                    tooltip: 'Edit'
                }
               
            ]
        };
        return ac;
    },
});


