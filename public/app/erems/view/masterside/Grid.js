Ext.define('Erems.view.masterside.Grid',{
     extend: 'Erems.library.template.view.GridDS2',
    storeConfig: {
        id: 'MasterSideGridStore',
        idProperty: 'side_id',
        extraParams: {}
    },
    alias:'widget.mastersidegrid',
    bindPrefixName:'Masterside',
   // itemId:'',
    newButtonLabel:'New Master Side',
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
                    itemId: 'colms_code',
                    width: 100,
                    dataIndex: 'code',
                    hideable: false,
                    text: 'Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_side',
                    width: 200,
                    dataIndex: 'side',
                    hideable: false,
                    text: 'Side name'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_createdby',
                    width: 110,
                    dataIndex: 'user_user_fullname',
                    hideable: false,
                    text: 'Created By'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_createddate',
                    width: 110,
                    dataIndex: 'Addon',
                    hideable: false,
                    text: 'Created Date'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_modiby',
                    width: 110,
                    // dataIndex: 'modi_user_name',
                    dataIndex: 'usermodi_user_fullname',
                    hideable: false,
                    text: 'Last Edit By'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_modion',
                    width: 110,
                    dataIndex: 'Modion',
                    hideable: false,
                    text: 'Last Edit Date'
                },
                
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});


