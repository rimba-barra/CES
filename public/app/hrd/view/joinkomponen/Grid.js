Ext.define('Hrd.view.joinkomponen.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.joinkomponengrid',
    storeConfig: {
        id: 'JoinkomponenGridStore',
        idProperty: 'joinkomponen_id',
        extraParams: {}
    },
    columnLines: false,
    bindPrefixName: 'Joinkomponen',
    newButtonLabel: 'New',
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {},
            defaults: {
                xtype: 'gridcolumn',
                align: 'center'


            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                   dataIndex: 'master_code',
                   text: 'Komponen'
                },
                {
                   
                   dataIndex: 'ka_code',
                   text:'Komponen Join 1'
                },
                {
                   
                   dataIndex: 'kb_code',
                   text:'Komponen Join 2'
                },
                {
                   
                   dataIndex: 'kc_code',
                   text:'Komponen Join 3'
                },
                {
                   
                   dataIndex: 'kd_code',
                   text:'Komponen Join 4'
                },
                {
                   
                   dataIndex: 'ke_code',
                   text:'Komponen Join 5'
                }
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