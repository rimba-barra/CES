Ext.define('Hrd.view.lookup.project.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.lookupprojectgrid',
    storeConfig:{
        id:'LookupProjectStore',
        idProperty:'project_id',
        extraParams:{
            mode_read:'project'
        }
    },
    bindPrefixName: 'Project',
    newButtonLabel: 'New Project',
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
                },
                {
                   dataIndex: 'code',
                   text: 'Kode'
                },
                {
                   dataIndex: 'name',
                   text: 'Nama',
                   width:300
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
                        border:1,
                        action: 'select',
                        margin: '0 5 0 0',
                        text: 'Select Project'
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
    generateActionColumn: function() {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            itemId: 'actioncolumn',
            width: 50,
            resizable: false,
            align: 'right',
            hideable: false,
            items: [
                {
                    text: 'Select',
                    altText: 'Edit',
                    action:'selects',
                    tooltip: 'Edit'
                }
            ]
        };
        return ac;
    }
});