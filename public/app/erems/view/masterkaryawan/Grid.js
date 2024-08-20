Ext.define('Erems.view.masterkaryawan.Grid',{
     extend: 'Erems.library.template.view.GridDS2',
    storeConfig: {
        id: 'MasterSideGridStore',
        idProperty: 'employee_id',
        extraParams: {}
    },
    alias:'widget.masterkaryawangrid',
    bindPrefixName:'Masterkaryawan',
   // itemId:'',
    newButtonLabel:'Tambah Karyawan Baru',
    initComponent: function() {
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
                },{
                    xtype: 'gridcolumn',
                    width: 300,
                    dataIndex: 'employee_name',
                    text: 'Nama Karyawan'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'position_position',
                    text: 'Jabatan'
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
                        action: 'print',
                        hidden: true,
                        itemId: 'btnPrint',
                        margin: '0 5 0 0',
                        bindAction: me.bindPrefixName + 'Print',
                        iconCls: 'icon-print',
                        text: 'Print / Save'
                    },
                    {
                        xtype: 'button',
                        action: 'upload',
                        itemId: 'btnUpload',
                        margin: '0 5 0 0',
                        iconCls: 'icon-archive',
                        text: "Upload File"
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
    }
});


