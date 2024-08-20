Ext.define('Erems.view.spk.UnitGrid', {
    extend: 'Erems.library.template.view.GridDS2Browse',
    alias: 'widget.spkunitgrid',
    
    storeConfig: {
        id: 'SPKUnitGridStore',
        idProperty: 'unit_id',
        extraParams: {
            mode_read:'unitlistxx'
        }
    },
    simpleSelect: true,
    height: 300,
    bindPrefixName: 'Spk',
    newButtonLabel: 'New Unit',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
           
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            defaults: {
                xtype: 'gridcolumn',
                width: 11
            },
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    dataIndex: 'unit_number',
                    text: 'Unit Number'
                },
                 {
                    xtype: 'gridcolumn',
                   
                    width: 70,
                    dataIndex: 'block_code',
                    hideable: false,
                    text: 'Block'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_cluster',
                    width: 100,
                    dataIndex: 'cluster_code',
                    hideable: false,
                    text: 'Cluster'
                },
                {
                dataIndex: 'unitstatus_status',
                text: 'Status'
            },
            {
                dataIndex: 'pt_name',
                width: 200,
                text: 'PT Name'
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
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            },
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'select',
                        disabled: true,
                        margin: '0 5 0 0',
                        text: "Select Unit"
                    }
                ]
            }
        ];
        return dockedItems;
    }
});