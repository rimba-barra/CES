Ext.define('Cashier.view.persentasepajak.Grid', {
    extend: 'Cashier.library.template.view.GridDS2',
    alias: 'widget.persentasepajakgrid',
    bindPrefixName: 'Persentasepajak',
    store: 'Persentasepajak',
    newButtonLabel: 'New Persentase Pajak',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'persentasepajak_id',
                    hidden: true
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    dataIndex: 'project_name',
                    text: 'Project'
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    dataIndex: 'pt_name',
                    text: 'PT'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'tipepajak',
                    text: 'Pajak'
                },
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    dataIndex: 'tipepajakdetail',
                    text: 'Tipe Pajak'
                },
                {
                    xtype: 'gridcolumn',
                    width: 90,
                    dataIndex: 'is_npwp',
                    text: 'NPWP',
                    align: 'center',
                    renderer: function(value, meta, record) {
                        var val = record.get('is_npwp');
                        if (val  == '0') { 
                            return 'Tidak Ada';
                        }else if (val == '1') { 
                            return 'Ada';
                        }
                        return '';
                    }
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'kelaskontraktor',
                    text: 'Kelas Kontraktor'
                },
                {
                    xtype: 'gridcolumn',
                    width: 150,
                    dataIndex: 'tipekontraktor',
                    text: 'Tipe Kontraktor'
                },
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    dataIndex: 'persentase',
                    text: 'Persentase'
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    dataIndex: 'user_name',
                    text: 'Add By'
                },
                {
                    xtype:'datecolumn',
                    format:'d-m-Y H:i:s',
                    dataIndex: 'addon',
                    text: 'Add On',
                    align: 'center',
                    width: 200
                },
                me.generateActionColumn()
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
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'create',
                        //disabled: true,
                        itemId: 'btnCreate',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: 'Add New'
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
                        margin: '0 5 0 0',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected',
                        bindAction: me.bindPrefixName + 'Delete'
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
                }

            ]
        };
        return ac;
    },
});


