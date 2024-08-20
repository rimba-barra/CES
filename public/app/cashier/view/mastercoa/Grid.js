Ext.define('Cashier.view.mastercoa.Grid', {
    extend: 'Cashier.library.template.view.GridDS2',
    alias: 'widget.mastercoagrid',
    bindPrefixName: 'Mastercoa',
    storeConfig: {
        id: 'MastercoaGridStore',
        idProperty: 'coa_id',
        extraParams: {},

    },
    
    // itemId:'',
    newButtonLabel: 'New Budget Coa ',
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
                me.generateActionColumn(),
                {
                    xtype: 'rownumberer',
                    resizable:true,
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coacode',
                    width: 100,
                    dataIndex: 'coa',
                    hideable: false,
                    text: 'COA'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_name',
                    width: 200,
                    dataIndex: 'name',
                    hideable: false,
                    text: 'Account Name'
                },               
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_type',
                    width: 40,
                    dataIndex: 'type',
                    hideable: false,
                    text: 'Type'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_level',
                    width: 40,
                    dataIndex: 'level',
                    hideable: false,
                    text: 'Level'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_parent_code',
                    width: 100,
                    dataIndex: 'parent_code',
                    hideable: false,
                    text: 'Parent Account'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_statusjournal',
                    width: 80,
                    dataIndex: 'is_journal',
                    hideable: false,
                    text: 'Journal Status',
                    renderer: me.checkBoxStatus
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_report',
                    width: 80,
                    dataIndex: 'report',
                    hideable: false,
                    text: 'Report'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_kelsub',
                    width: 120,
                    dataIndex: 'kelsub_kelsub',
                    hideable: false,
                    text: 'Sub Account Group'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_parentname',
                    width: 200,
                    dataIndex: 'parent_name',
                    hideable: false,
                    text: 'Parent Name',
                    hidden:true
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_addon',
                    dataIndex: 'addon',
                    hideable: false,
                    text: 'Add On',
                    align: 'center',
                    renderer: function (value, meta) {
                        return Ext.util.Format.substr(value, 0,10);
                    }
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_addby',
                    dataIndex: 'addby',
                    hideable: false,
                    text: 'Add By'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_modion',
                    dataIndex: 'modion',
                    hideable: false,
                    text: 'Modi On',
                    width: 150,
                    align: 'center',
                    renderer: function (value, meta) {
                        return Ext.util.Format.substr(value, 0,19);
                    }
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_modiby',
                    dataIndex: 'modiby',
                    hideable: false,
                    text: 'Modi By'
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
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'create',
                        //disabled: true,
                        itemId: 'btnCreate',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: 'Add New COA',
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
                        action: 'updatecoa',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnEditCoa',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Edit COA',
                        bindAction: me.bindPrefixName + 'UpdateCoa'
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
                    {
                        xtype: 'button',
                        action: 'copy',
                        disabled: false,
                        hidden: true,
                        itemId: 'btnCopy',
                        margin: '0 5 0 0',
                        iconCls: 'icon-copy',
                        text: 'Copy COA',
                        bindAction: me.bindPrefixName + 'Copy'
                    },
                    {
                        xtype: 'button',
                        action: 'validate',
                        itemId: 'btnValidate',
                        margin: '0 5 0 0',
                        iconCls: 'icon-checked',
                        text: 'Validate COA'
                        // bindAction: me.bindPrefixName + 'Copy'
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
    checkBoxStatus: function (val, meta, record, rowIndex, colIndex, store) {
        name = 'is_journal';
        return this.comboBoxFieldGen(name, record, false);  
    },
    comboBoxFieldGen: function(name, record, enable){
        if (record.get(name)) {
            if(record.get("is_journal") == 0){
                var a = '';

            }else{
                var a = '&#10003;';
            }
          /*  if(enable){
                var a = '<input type="checkbox" disabled name="'+name+'" data=' + record.get("is_journal") + ' checked />';
            }else{
                var a = '&#10003;';
            } */
        } /*else {
            if(enable){
                var a = '<input type="checkbox" disabled name="'+name+'" data=' + record.get("is_journal") + ' />';
            }else{
                var a = '';
            }
        }*/
        return a;  
    }
    
});


