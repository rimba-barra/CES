Ext.define('Hrd.view.competencywawancara.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.competencywawancaragrid',
    storeConfig:{
        id:'CompetencywawancaraGridStore',
        idProperty:'competency_wawancara_id',
        extraParams:{}
    },
    bindPrefixName: 'Competencywawancara',
    newButtonLabel: 'New Competencywawancara',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            defaults:{
                 xtype: 'gridcolumn',
                 
                 
            },
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },{
                   dataIndex: 'pertanyaan_wawancara',
                   text: 'Interview Questions',
                   width:300
                },
                {
                   dataIndex: 'competency_name',
                   text: 'Competency Name',
                   width:200
                },
                {
                   dataIndex: 'banding',
                   text: 'Banding',
                   width:200
                },
                {
                   dataIndex: 'level_category',
                   text: 'Competency Level',
                   width:200
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
                        hidden: true,
                        itemId: 'btnNew',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName + 'Create',
                        text: 'New Interview Questions'
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