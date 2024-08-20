Ext.define('Cashier.view.rcash.Gridrev', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.rcashgridrev',
    store: 'Rcashlog',
    bindPrefixName: 'Rcash',
    itemId: 'Rcashlog',
    newButtonLabel: 'Add New',
    title: 'Cash Bank revision',
    uniquename: '_rcashgridrev',
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
                    itemId: 'colms_kasbank_id',
                    width: 100,
                    dataIndex: 'kasbank_id',
                    hideable: false,
                    text: 'CashBank ID'
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
                    text: 'Old PT (Company)'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ptname_revision',
                    width: 180,
                    dataIndex: 'ptname_revision',
                    hideable: false,
                    text: 'New PT (Company)'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_kasbank_date',
                    width: 150,
                    dataIndex: 'kasbank_date',
                    hideable: false,
                    text: 'Old Voucher Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_kasbank_date_revision',
                    width: 150,
                    dataIndex: 'kasbank_date_revision',
                    hideable: false,
                    text: 'Old Voucher Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_voucher_no',
                    width: 120,
                    dataIndex: 'voucher_no',
                    hideable: false,
                    text: 'Old Voucher No'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_voucher_no_revision',
                    width: 120,
                    dataIndex: 'voucher_no_revision',
                    hideable: false,
                    text: 'New Voucher No'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_dataflow',
                    width: 120,
                    dataIndex: 'dataflow',
                    hideable: false,
                    text: 'Old Data Flow'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_dataflow_revision',
                    width: 120,
                    dataIndex: 'dataflow_revision',
                    hideable: false,
                    text: 'New Data Flow'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_revision_note',
                    width: 120,
                    dataIndex: 'revision_note',
                    hideable: false,
                    text: 'Revision Note'
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
                height: 40,
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
                                xtype: 'statusallcombobox',
                                itemId: 'fd_status' + me.uniquename,
                                id: 'status' + me.uniquename,
                                name: 'status',
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


