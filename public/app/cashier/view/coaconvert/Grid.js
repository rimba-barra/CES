Ext.define('Cashier.view.coaconvert.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.coaconvertgrid',
    store: 'Coaconvert',
    bindPrefixName: 'Coaconvert',
    itemId: 'Coaconvert',
    newButtonLabel: 'Add New Batch',
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
                    itemId: 'colms_coa_old',
                    width: 100,
                    dataIndex: 'coa_old',
                    hideable: false,
                    text: '<text style="color:red"><b>Old Coa</b></text>'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_coa_new',
                    width: 100,
                    dataIndex: 'coa_new',
                    hideable: false,
                    text: '<text style="color:green"><b>New Coa</b></text>'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coa_old_name',
                    width: 100,
                    dataIndex: 'coa_old_name',
                    hideable: false,
                    text: 'Old Coa Name'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_coa_new_name',
                    width: 100,
                    dataIndex: 'coa_new_name',
                    hideable: false,
                    text: 'New Coa Name'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_total_kasbank_old',
                    width: 90,
                    dataIndex: 'total_kasbank_old',
                    hideable: false,
                    text: 'Old Ttl Kasbank'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_total_journal_old',
                    width: 90,
                    dataIndex: 'total_journal_old',
                    hideable: false,
                    text: 'Old Ttl Journal'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_total_kasbank_new',
                    width: 90,
                    dataIndex: 'total_kasbank_new',
                    hideable: false,
                    text: 'New Ttl Kasbank'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_total_journal_new',
                    width: 90,
                    dataIndex: 'total_journal_new',
                    hideable: false,
                    text: 'New Ttl Journal'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_status',
                    width: 500,
                    dataIndex: 'status',
                    hideable: false,
                    text: 'Status'
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
                        xtype: 'ptusercomboboxpersh',
                        itemId: 'fd_pt_id_44',
                        id: 'pt_id_44',
                        name: 'pt_id',
                        fieldLabel: 'PT / Company',
                        emptyText: 'Select PT / Company',
                        enforceMaxLength: true,
                        enableKeyEvents: true,
                        rowdata: null,
                        listeners:{
                            keyup: function (field) {
                                        var searchString = field.getValue().toString().toLowerCase();
                                        if(searchString == null){
                                            return false;
                                        }
                                        if (searchString) {
                                            this.store.filterBy(function (record, id) {
                                                if (record.get('ptname').toString().toLowerCase().indexOf(searchString) > -1) {
                                                    return true;
                                                    this.store.clearFilter(true);
                                                } else if (record.get('ptcode').toString().toLowerCase().indexOf(searchString) > -1) {
                                                    return true;
                                                    this.store.clearFilter(true);
                                                } else {
                                                    return false;
                                                    this.store.clearFilter(true);
                                                }
                                            });
                                        }
                                    },
                                    buffer:300
                                },
                    },
                    {
                        xtype: 'button',
                        action: 'create',
                        hidden: true,
                        itemId: 'btnNew',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName + 'Create',
                        text: me.newButtonLabel
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
                        action: 'doconvertcoa',
                        disabled: false,
                        hidden: false,
                        itemId: 'btnDoconvertcoa',
                        margin: '0 5 0 0',
                        iconCls: 'icon-approve',
                        text: 'Convert Coa!',
                    },
                    {
                        xtype: 'button',
                        action: 'print',
                        hidden: true,
                        itemId: 'btnPrint',
                        margin: '0 5 0 0',
                        bindAction: me.bindPrefixName + 'Print',
                        iconCls: 'icon-print',
                        text: 'Print / Save'
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
});


