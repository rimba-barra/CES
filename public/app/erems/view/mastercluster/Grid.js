Ext.define('Erems.view.mastercluster.Grid', {
    alias: 'widget.masterclustergrid',
    extend: 'Erems.library.template.view.GridDS2',
    storeConfig: {
        id: 'MasterClusterGridStore',
        idProperty: 'cluster_id',
        extraParams: {}
    },
    newButtonLabel: 'New Master Cluster',
    bindPrefixName: 'Mastercluster',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            defaults:{
                xtype: 'gridcolumn',
                align:'center',
                width:90
            },
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    
                    dataIndex: 'code',
                    text: 'Code',
                    width:65
                },
                {
                    dataIndex: 'cluster',
                    text: 'Cluster',
                    width:125
                }, {
                    dataIndex: 'description',
                    text: 'Description',
                    width:265
                }, {
                    dataIndex: 'user_user_fullname',
                    text: 'Created By'
                }, {
                    xtype:'datecolumn',
                    format:'d-m-Y',
                    dataIndex: 'Addon',
                    text: 'Created Date'
                }, {
                    dataIndex: 'usermodi_user_fullname',
                    text: 'Last Edit By'
                }, {
                    xtype:'datecolumn',
                    format:'d-m-Y',
                    dataIndex: 'Modion',
                    text: 'Last Edit Date'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});


