Ext.define('Hrd.view.leavegiving.GridKompensasiextraleave', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.leavegivingkompensasiextraleavegrid',
    itemId:'LeavegivingkompensasiextraleavegridID',  
    storeConfig:{
        id:'LeavegivingGridKompensasiextraleaveStore',
        idProperty:'employee_id',
        extraParams:{
            mode_read: 'kompensasiextraleave'
        }
    },
    columnLines: false,
    height:250,
    bindPrefixName: 'Leavegiving',
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
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                   
                   dataIndex: 'employee_employee_nik',
                   text: 'N.I.K',
                   width:70,
                },
                {
                    dataIndex: 'employee_employee_name',
                    width: 120,
                    text: 'Employee Name'
                },
                {
                   
                   dataIndex: 'start_date',
                   text: 'Start Date',
                   width:80,
                },
                {
                    dataIndex: 'expired_date',
                    width: 80,
                    text: 'Expired Date'
                },
                {
                   
                   dataIndex: 'type',
                   text: 'Type',
                   width:80,
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'amount',
                    width: 70,
                    text: 'Hak Cuti'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'rest',
                    width: 70,
                    text: 'Sisa Cuti'
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