Ext.define('Hrd.view.hcreportlog.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.hcreportloggrid',
    storeConfig:{
        id:'HcreportlogGridStore',
        idProperty:'department_id',
        extraParams:{}
    },
    bindPrefixName: 'Hcreportlog',
    // newButtonLabel: 'New Department',
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
                    dataIndex: 'report_type_description',
                    text: 'Report Type',
                    width:120
                },
                {
                    dataIndex: 'cutoff_date',
                    text: 'Cut off Date',
                    width:80
                },
                {
                    dataIndex: 'filename',
                    text: 'Filename',
                    width:230
                },
                {
                    dataIndex: 'addby_desc',
                    text: 'Added By',
                    width:100,
                },
                {
                    xtype: 'datecolumn',
                    dataIndex: 'addon',
                    text: 'Added Date',
                    width:120,
                    format: 'd-m-Y H:i:s',
                },
                {
                    dataIndex: 'is_mark',
                    text: 'Marked',
                    xtype: 'booleancolumn',
                    trueText: '&#10003;',
                    falseText: ' ',
                    width: 50,
                    resizable: false,
                    align: 'center'
                },
                {
                    dataIndex: 'marked_periode',
                    text: 'Marked Periode',
                    width: 100,
                    align: 'center'
                },
                {
                    dataIndex: 'modiby_desc',
                    text: 'Modified By',
                    width:100
                },
                {
                    xtype: 'datecolumn',
                    dataIndex: 'modion',
                    text: 'Modified Date',
                    width:120,
                    format: 'd-m-Y H:i:s',
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            action: 'downloadLog',
            width: 50,
            hidden: false,
            resizable: false,
            align: 'right',
            items: [
                {
                    xtype: 'button',
                    icon: 'app/main/images/icons/printer.png',
                    action: 'downloadLog',
                    bindAction: me.bindPrefixName + 'Read',
                    // text: 'View',
                    tooltip: 'Download',
                },
            ]
        }

        return ac;

    },
    generateDockedItems: function () {
        var me = this;

        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    // {
                    //     xtype: 'button',
                    //     action: 'create',
                    //     hidden: true,
                    //     itemId: 'btnNew',
                    //     margin: '0 5 0 0',
                    //     iconCls: 'icon-new',
                    //     bindAction: me.bindPrefixName + 'Create',
                    //     text: 'New Training Caption'
                    // },
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
                    // {
                    //     xtype: 'button',
                    //     action: 'destroy',
                    //     disabled: true,
                    //     hidden: true,
                    //     itemId: 'btnDelete',
                    //     bindAction: me.bindPrefixName + 'Delete',
                    //     iconCls: 'icon-delete',
                    //     text: 'Delete Selected'
                    // },
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