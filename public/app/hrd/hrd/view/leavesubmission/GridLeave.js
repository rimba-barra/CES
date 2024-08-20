Ext.define('Hrd.view.leavesubmission.GridLeave', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.leavesubmissiongridleave',
    storeConfig: {
        id: 'LeavesubmissionGridLeaveStore',
        idProperty: 'leave_id',
        extraParams: {
            mode_read:'leave'
        }
    },
    columnLines: false,
    bindPrefixName: 'Leavesubmission',
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
                   dataIndex: 'absenttype_absenttype',
                   text: 'Jenis Cuti',
                   width:150
                },{
                   xtype:'datecolumn',
                   dataIndex: 'start_date',
                   format:'d M Y',
                   
                   text: 'Tgl. Awal'
                },
                {
                   xtype:'datecolumn',
                   dataIndex: 'end_date',
                   format:'d M Y',
                   text: 'Tgl. Akhir'
                },
                {
                   dataIndex: 'duration',
                   text: 'Lama Cuti'
                },
                
                me.generateActionColumn()
            ]
        });
        me.callParent(arguments);
    },
    generateDockedItems: function() {
        var me = this;
        var dockedItems = [
           
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
    generateActionColumn: function() {
        var me = this;
        var ac = {};
        return ac;
    }
});