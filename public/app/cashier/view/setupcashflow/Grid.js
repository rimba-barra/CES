Ext.define('Cashier.view.setupcashflow.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.setupcashflowgrid',
    store: 'Mhsetupcashflow',
    bindPrefixName: 'Setupcashflow',
    itemId: 'Setupcashflow',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
                mode: 'MULTI'
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ptname',
                    width: 250,
                    dataIndex: 'ptname',
                    hideable: false,
                    text: 'Pt'
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
                    itemId: 'colms_grouptype',
                    width: 180,
                    dataIndex: 'grouptype',
                    hideable: false,
                    text: 'Group Type'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_cashflowtype',
                    width: 180,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'cashflowtype',
                    hideable: false,
                    text: 'Cashflow Name'
                },
                {
                    xtype: 'gridcolumn',
                    action: 'exportListCashbon',
                    itemId: 'colms_count_cd',
                    titleAlign: 'center',
                    align: 'center',
                    dataIndex: 'count_cd',
                    hideable: false,
                    tooltip: 'Jumlah setup cashflow yang digunakan di Cashbon department',
                    text: 'Cashbon Department',
                    width: 120,
                    renderer: function(value) {
                        if (value == 0 || value == '0') {
                            return "-";    
                        }else{
                            return '<span style="color:blue"><a href="#">' + value +'</a></span>';
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    action: 'exportListVoucherDept',
                    itemId: 'colms_count_vdr',
                    titleAlign: 'center',
                    align: 'center',
                    dataIndex: 'count_vdr',
                    hideable: false,
                    width: 120,
                    tooltip: 'Jumlah setup cashflow yang digunakan di Voucher department',
                    text: 'Voucher Department',
                    renderer: function(value) {
                        if (value == 0 || value == '0') {
                            return "-";    
                        }else{
                            return '<span style="color:blue"><a href="#">' + value +'</a></span>';
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    action: 'exportListVoucher',
                    itemId: 'colms_count_v',
                    titleAlign: 'center',
                    align: 'center',
                    dataIndex: 'count_v',
                    hideable: false,
                    width: 100,
                    tooltip: 'Jumlah setup cashflow yang digunakan di Voucher',
                    text: 'Voucher',
                    renderer: function(value) {
                        if (value == 0 || value == '0') {
                            return "-";    
                        }else{
                            return '<span style="color:blue"><a href="#">' + value +'</a></span>';
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    action: 'exportListJournal',
                    itemId: 'colms_count_j',
                    titleAlign: 'center',
                    align: 'center',
                    dataIndex: 'count_j',
                    hideable: false,
                    name: 'colJurnal',
                    width: 100,
                    tooltip: 'Jumlah setup cashflow yang digunakan di Journal',
                    text: 'Journal',
                    renderer: function(value) {
                        if (value == 0 || value == '0') {
                            return "-";    
                        }else{
                            return '<span style="color:blue"><a href="#">' + value +'</a></span>';
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_is_link_coa',
                    width: 80,
                    align: 'center',
                    dataIndex: 'is_link_coa',
                    hideable: false,
                    text: 'Link COA CF',
                    renderer: me.checkBoxStatus
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function() {
        var me = this;
        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'create',
                        disabled: false,
                        hidden: false,
                        itemId: 'btnCreate',
                        margin: '0 5 0 0',
                        iconCls: 'icon-add',
                        text: 'Add New',
                        bindAction: me.bindPrefixName + 'Create'
                    },
                    {
                        xtype: 'button',
                        action: 'update',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnEdit',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Edit',
                        bindAction: me.bindPrefixName + 'Update'
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnDelete',
                        bindAction: me.bindPrefixName + 'Delete',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
                    },
                    {
                        xtype: 'button',
                        action: 'export',
                        hidden: false,
                        disabled: false,
                        itemId: 'btnExport',
                        margin: '0 5 0 0',
                        // bindAction: me.bindPrefixName + 'Export',
                        iconCls: 'icon-excel',
                        text: 'Export Setup Cashflow'
                    },
                    {
                        xtype: 'button',
                        action: 'copy',
                        hidden: true,
                        disabled: false,
                        itemId: 'btnCopy',
                        margin: '0 5 0 0',
                        bindAction: me.bindPrefixName + 'Copy',
                        iconCls: 'icon-copy',
                        text: 'Copy Setup Cashflow'
                    }
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
    generateActionColumn: function () {
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
                    bindAction: me.bindPrefixName + 'Update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                },
                {
                    text: 'Delete',
                    iconCls: 'icon-delete',
                    bindAction: me.bindPrefixName + 'Delete',
                    altText: 'Delete',
                    tooltip: 'Delete'
                },
                {
                    text: 'Export Setup Cashflow',
                    iconCls: 'icon-print',
                    bindAction: me.bindPrefixName + 'Export',
                    altText: 'Export',
                    tooltip: 'Export'
                },
            ]
        };
        return ac;
    },
    checkBoxStatus: function (val, meta, record, rowIndex, colIndex, store) {
        name = 'is_link_coa';
        return this.comboBoxFieldGen(name, record, false);  
    },
    comboBoxFieldGen: function(name, record, enable){
        if (record.get(name)) {
            if(record.get("is_link_coa") == 0 || !record.get("is_link_coa") ){
                var a = '';

            }else{
                var a = '&#10003;';
            }
       
        } 
        return a;  
    },
});


