Ext.define('Hrd.view.absentrecord.GridReasondetail', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.absentrecordreasondetailgrid',
    itemId:'AbsentrecordreasondetailgridID',   
    storeConfig: {
        id: 'AbsentrecordreasondetailgridIDStore',
        //idProperty: 'description',
        extraParams:{
            mode_read: 'reasondetail',
            employee_id:0
        }
    },
    columnLines: false,
    bindPrefixName: 'Absentrecord',
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
            /*selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),*/
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                   dataIndex: 'absenttype',
                   text: 'Absent Type',
                   width:150
                },
                {
                    dataIndex: 'description',
                    width: 450,
                    text: 'Description'
                },
                me.generateActionColumn()
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
            
            ]
        };
        return ac;
    }
});