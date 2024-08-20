Ext.define('Erems.view.facilitiestype.Grid', {
    extend: 'Erems.library.box.view.Grid',
    alias: 'widget.facilitiestypegrid',
    storeConfig:{
        id:'FacilitiestypeGridStore',
        idProperty:'facilitiestype_id',
        extraParams:{}
    },
    bindPrefixName: 'Facilitiestype',
    newButtonLabel: 'New Facilities Type',
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
                   dataIndex: 'code',
                   text: 'Code Test'
                },
                {
                   dataIndex: 'facilitiestype',
                   text: 'Facilities Type',
                   width:200
                },
                 {
                   dataIndex: 'description',
                   text: 'Description'
                   
                }
                ,
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }

});