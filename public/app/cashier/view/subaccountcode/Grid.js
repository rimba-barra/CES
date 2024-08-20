Ext.define('Cashier.view.subaccountcode.Grid',{
    extend:'Cashier.library.template.view.Grid',
    alias:'widget.subaccountcodegrid',
    store:'Subaccountcode',
    bindPrefixName:'Subaccountcode',
   // itemId:'',
    newButtonLabel:'Add New',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
          //  dockedItems: me.generateDockedItems(),
            dockedItems: me.generateDockedItemsCustome(),
            viewConfig: {

            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {

            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                /*
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_subgl_id',
                    width: 50,
                    align: 'right',
                    dataIndex: 'subgl_id',
                    text: 'ID'
                },
                */
               //Rizal 31 Mei 2019
               
		{
                    xtype: 'gridcolumn',
                    itemId: 'colms_projectname',
                    width: 150,
                    dataIndex: 'projectname',
                    hideable: false,
                    text: 'Project'
                },
		{
                    xtype: 'gridcolumn',
                    itemId: 'colms_ptname',
                    width: 150,
                    dataIndex: 'ptname',
                    hideable: false,
                    text: 'PT'
                },
               //
		{
                    xtype: 'gridcolumn',
                    itemId: 'colms_kelsub',
                    width: 150,
                    dataIndex: 'accountgroup',
                    hideable: false,
                    text: 'Kelompok sub account'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_code',
                    width: 150,
                    dataIndex: 'code',
                    hideable: false,
                    text: 'Code sub account'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_code1',
                    width: 60,
                    dataIndex: 'code1',
                    hideable: false,
                    text: 'Code 1'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_code2',
                    width: 60,
                    dataIndex: 'code2',
                    hideable: false,
                    text: 'Code 2'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_code3',
                    width: 100,
                    dataIndex: 'subdsk3',
                    hideable: false,
                    text: 'Code 3'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_code4',
                    width: 100,
                    dataIndex: 'subdsk4',
                    hideable: false,
                    text: 'Code 4'
                },
              
				
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    width: 150,
                    dataIndex: 'description',
                    hideable: false,
                    text: 'Description'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_active',
                    width: 70,
                    dataIndex: 'active',
                    hideable: false,
                    text: 'Active',
                    renderer: function(value, meta, record) {
                        var val = record.get('active');
                        if (val  == '1') { 
                            return 'Yes';
                        }else if (val == '0') { 
                            return 'No';
                        }
                        return '';
                    },
                    align: 'center'
                },
                 {
                    xtype: 'gridcolumn',
                    itemId: 'colms_addby_name',
                    width: 80,
                    dataIndex: 'addby_name',
                    hideable: false,
                    text: 'Addby',
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_addon',
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'addon',
                    width: 120,
                    hideable: false,
                    text: 'Addon',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                // Seftian 02 Juli 2021
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_unit_erems',
                    width: 100,
                    dataIndex: 'unit_erems',
                    hideable: false,
                    text: 'Unit Erems'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_unit_erems_status',
                    width: 100,
                    dataIndex: 'unit_status',
                    hideable: false,
                    align: 'center' ,
                    text: 'Status Unit Erems',
                    renderer: function(value, meta, record) {
                        var val = record.get('unit_status');
                        console.log(val);
                        if (val  == '1') { 
                            return '<span style="color:red">Deleted</span>';
                        }else if (val == '0') { 
                            return '<span style="color:green">Active</span>';
                        }
                        return '-';
                    },
                },
                // 
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_notes',
                    width: 150,
                    dataIndex: 'notes',
                    hideable: false,
                    text: 'Notes'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItemsCustome: function() {
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
                        xtype: 'tbspacer',
                        flex: 1
                    },
                    {
                        xtype: 'tbseparator'
                    },
                    {
                        xtype: 'button',
                        action: 'importsub',
                        hidden: false,
                        itemId: 'btnImport2',
                        icon: 'app/main/images/icons/excel.png',
                        margin: '0 0 0 0',
                        bindAction: me.bindPrefixName + 'Import',
                        text: 'Import Data'
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
});


