Ext.define('Hrd.view.absentrecord.GridShiftDetail', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.absentrecordshiftdetailgrid',
    itemId:'AbsentrecordshiftdetailgridID',   
    storeConfig: {
        id: 'AbsentrecordshiftdetailgridIDStore',
        idProperty: 'employee_id',
        extraParams:{
            mode_read: 'shiftdetail',
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
                   
                   dataIndex: 'code',
                   text: 'Code',
                   width:150,
                },
                {
                    dataIndex: 'shifttype',
                    width: 140,
                    text: 'Shift'
                },
                {
                    dataIndex: 'in_time',
                    width: 140,
                    text: 'In',
                    renderer: function(value, metadata, record) {
                        return value == '00:00:00' ? '' : value;
                        
                    },
                },
                {
                    dataIndex: 'out_time',
                    width: 140,
                    text: 'Out',
                    renderer: function(value, metadata, record) {
                        return value == '00:00:00' ? '' : value;
                        
                    },
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