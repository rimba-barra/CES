Ext.define('Hrd.view.trainingname.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.trainingnamegrid',
    storeConfig:{
        id:'TrainingnameGridStore',
        idProperty:'trainingname_id',
        extraParams:{}
    },
    bindPrefixName: 'Trainingname',
    newButtonLabel: 'New Training name',
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
                   dataIndex: 'trainingname',
                   text: 'Training Name',
                   width:200
                },
                {
                   dataIndex: 'vendor',
                   text: 'Vendor',
                   width:175
                },
                // {
                //    dataIndex: 'caption',
                //    text: 'Budget Type',
                //    width:175
                // },
                {
                   dataIndex: 'skill',
                   text: 'Skill Type',
                   width:120
                },
                {
                   dataIndex: 'type',
                   text: 'Training Type',
                   width:100
                },
                {
                   dataIndex: 'certificate',
                   text: 'Certificate',
                   width:75
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
                        text: 'New Training Name'
                    },
                    {
                        xtype: 'button',
                        action: 'copy_trainingname',
                        hidden: true,
                        itemId: 'btnCopy',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName + 'Read',
                        text: 'Copy'
                    },
                    {
                        xtype: 'button',
                        action: 'share_trainingname',
                        hidden: true,
                        itemId: 'btnShare',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName + 'Read',
                        text: 'Share to Project PT'
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