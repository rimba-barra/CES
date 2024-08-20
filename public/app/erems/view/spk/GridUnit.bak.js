Ext.define('Erems.view.spk.GridUnit', {
    alias: 'widget.spkgridunit',
    extend:'Erems.library.template.view.GridDS2',
    
    storeConfig:{
        id:'ScheduleDetailGridStore',
        idProperty:'spkdetail_id',
        extraParams:{
            mode_read:'spklist'
        }
    },
    bindPrefixName: 'Spk',
    itemId:"SPKGridUnit",
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: {},
            dockedItems: me.generateDockedItemscustome(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
                }),
            defaults: {
                xtype: 'gridcolumn',
                width: 100,
                hidden: false
            },
            columns: [
            {
                xtype: 'rownumberer'
            },
            {
                dataIndex: 'cluster_cluster',
                text: 'Cluster'
            },
            {
                dataIndex: 'block_block',
                text: 'Block'
            },
            {
                dataIndex: 'unit_unit_number',
                text: 'Unit'
            },
            me.generateActionColumn(),
            ],
            bbar: [
            '',
            {
                xtype: 'tbfill'
            },
            '',
            {
                xtype: 'tbfill'
            },
            me.showAddNewButton()
            ]
        });

        me.callParent(arguments);
    },
    showAddNewButton: function() {
        var x = {
            xtype: 'button',
            itemId: 'btnAddNew',
            margin: '0 5 0 0',
            action: 'addNewDetail',
            iconCls: 'icon-new',
            text: 'Add New'
        };
        return x;
    },
    generateActionColumn: function() {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            width: 50,
            hidden: false,
            resizable: false,
            align: 'right',
            items: [
           
            {
                defaultIcon: 'icon-delete',
                action: 'destroy',
                iconCls: 'ux-actioncolumn icon-delete act-destroy',
                altText: 'Delete',
                tooltip: 'Delete'
            }
            ]
        };
        return ac;
    },
    generateDockedItemscustome: function() {
        var me = this;
        var dockedItems = [
            {
                xtype: 'pagingtoolbar',
                id: 'pagingtoolbar_spkgridunit',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: me.getStore()
            }
        ];
        return dockedItems;
    }
});