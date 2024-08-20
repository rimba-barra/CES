Ext.define('Hrd.view.transaksidinas.GridDate', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.transaksidinasdategrid',
    itemId:'TransaksiDinasDateGridID',
    storeConfig: {
        id: 'TransaksiDinasDateGridStore',
        idProperty: 'dinasdetail_id',
        extraParams:{
            mode_read: 'biaya',
            employee_id:0
        }
    },
    id: 'TDDTGID',
    columnLines: false,
    bindPrefixName: 'Transaksidinas',
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
                   xtype:'datecolumn',
                   format:'d/m/Y',
                   dataIndex: 'date',
                   text: 'Tanggal',
                   width:100
                },
                {
                   dataIndex: 'hari',
                   value:'0',
                   text: 'Hari',
                   width:60
                },
              //  me.generateActionColumn()
            ]
        });
        me.callParent(arguments);
    },
    generateDockedItems: function() {
        var me = this;
        var dockedItems = [];
        return dockedItems;
    },
    generateActionColumn: function() {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            hidden: true,
            itemId: 'actioncolumn',
            width: 50,
            resizable: false,
            align: 'right',
            hideable: false,
            items: [
                {
                    text: 'Edit',
                    iconCls: 'icon-edit',
                    bindAction: me.bindPrefixName + 'Update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                },
                {
                    text: 'Delete',
                    iconCls: 'icon-delete',
                    bindAction: me.bindPrefixName + 'Delete',
                    altText: 'Delete',
                    tooltip: 'Delete'
                }
            
            ]
        };
        return ac;
    }
});