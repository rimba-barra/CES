Ext.define('Erems.view.spk.GridUnit',{
    extend: 'Erems.library.template.view.GridDS2',
    storeConfig: {
        id: 'SpkGridUnitStore',
        idProperty: 'spkdetail_id',
        extraParams: {
            mode_read:'spklist'
        }
    },
    alias:'widget.spkgridunit',
    
    bindPrefixName:'Spk',
   // itemId:'',
    newButtonLabel:'New Unit',
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
            {
               // xtype:'numbercolumn',
                dataIndex: 'unit_progress',
                text: 'Progress'
            },
            
            me.generateActionColumn(),
            
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
                        action: 'addNewDetail',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: 'Add Unit'
                    },
                    {
                        xtype: 'button',
                        action: 'deleteDetail',
                        margin: '0 5 0 0',
                        iconCls: 'icon-delete',
                        text: 'Delete'
                    },
                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            },
        ];
        return dockedItems;
    },
});


