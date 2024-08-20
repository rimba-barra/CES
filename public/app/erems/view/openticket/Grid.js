Ext.define('Erems.view.openticket.Grid',{
     extend: 'Erems.library.template.view.GridDS2',
    storeConfig: {
        id: 'MasterSideGridStore',
        idProperty: 'side_id',
        extraParams: {}
    },
    alias:'widget.openticketgrid',
    bindPrefixName:'Openticket',
   // itemId:'',
    newButtonLabel:'New Ticket',
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
                }
                /*{
                    xtype: 'gridcolumn',
                    itemId: 'colms_id',
                    width: 60,
                    align: 'right',
                    dataIndex: 'side_id',
                    text: 'ID'
                }*/,
		
                {
                    xtype: 'gridcolumn',
                    itemId: 'subject',
                    width: 200,
                    dataIndex: 'subject',
                    hideable: false,
                    text: 'Subject'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_createdby',
                    width: 110,
                    dataIndex: 'priority',
                    hideable: false,
                    text: 'Urgency '
                },{
                    xtype: 'gridcolumn',
                    itemId: 'request',
                    width: 150,
                    dataIndex: 'request',
                    hideable: false,
                    text: 'Request by'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'attend',
                    width: 150,
                    dataIndex: 'direct',
                    hideable: false,
                    text: 'Directed to'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_create_date',
                    width: 110,
                    dataIndex: 'Added',
                    hideable: false,
                    text: 'Created date'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_last_update_date',
                    width: 110,
                    dataIndex: 'Modion',
                    hideable: false,
                    text: 'Modion'
                },
                
                
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});


