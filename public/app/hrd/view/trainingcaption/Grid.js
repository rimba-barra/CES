Ext.define('Hrd.view.trainingcaption.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.trainingcaptiongrid',
    storeConfig:{
        id:'TrainingcaptionGridStore',
        idProperty:'trainingcaption_id',
        extraParams:{}
    },
    bindPrefixName: 'Trainingcaption',
    newButtonLabel: 'New Training caption',
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
                   dataIndex: 'caption',
                   text: 'Caption',
                   width:300
                },
                {
                    xtype       : 'booleancolumn',
                    text        : 'Lock Budget',
                    dataIndex   : 'lockbudget',
                    trueText    : '&#10003;',
                    falseText   : ' ',
                    width       : 100,
                    resizable   : false,
                    align       : 'center'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    // generateDockedItems: function () {
    //     var me = this;

    //     var dockedItems = [
    //         {
    //             xtype: 'toolbar',
    //             dock: 'top',
    //             height: 28,
    //             items: [
    //                 {
    //                     xtype: 'button',
    //                     action: 'create',
    //                     hidden: true,
    //                     itemId: 'btnNew',
    //                     margin: '0 5 0 0',
    //                     iconCls: 'icon-new',
    //                     bindAction: me.bindPrefixName + 'Create',
    //                     text: 'New Training Caption'
    //                 },
    //                 {
    //                     xtype: 'button',
    //                     action: 'update',
    //                     disabled: true,
    //                     hidden: true,
    //                     itemId: 'btnEdit',
    //                     margin: '0 5 0 0',
    //                     iconCls: 'icon-edit',
    //                     text: 'Edit',
    //                     bindAction: me.bindPrefixName + 'Update'
    //                 },
    //                 {
    //                     xtype: 'button',
    //                     action: 'destroy',
    //                     disabled: true,
    //                     hidden: true,
    //                     itemId: 'btnDelete',
    //                     bindAction: me.bindPrefixName + 'Delete',
    //                     iconCls: 'icon-delete',
    //                     text: 'Delete Selected'
    //                 },
    //             ]
    //         },
    //         {
    //             xtype: 'pagingtoolbar',
    //             dock: 'bottom',
    //             width: 360,
    //             displayInfo: true,
    //             store: this.getStore()
    //         }
    //     ];
    //     return dockedItems;
    // },
});