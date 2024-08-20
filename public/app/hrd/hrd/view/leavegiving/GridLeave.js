Ext.define('Hrd.view.leavegiving.GridLeave', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.leavegivingleavegrid',
    itemId:'LeaveGivingLeaveMainGridID',
    storeConfig: {
        id: 'LeaveGivingLeaveGridStore',
        idProperty: 'leaveentitlements_id',
        extraParams:{
            mode_read: 'leave',
            employee_id:0
        }
    },
    id: 'LGChildGridID',
    columnLines: false,
    bindPrefixName: 'Leavegiving',
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
                   
                   dataIndex: 'leavegroup',
                   text: 'Jenis',
                   width:70,
                   align:'center',
                   renderer: function(value, metadata, record) {
                        if (value < 2) {
                            return 'T';
                        }else{
                            return 'B';
                        }
                        
                    },
                },
                {
                   dataIndex: 'start_use',
                   text: 'Periode Awal',
                   width:100
                },
                {
                   dataIndex: 'amount',
                   value:'0',
                   text: 'Hak Cuti'
                },
                {
                   xtype:'booleancolumn',
                   dataIndex: 'is_leave_end',
                   falseText: ' ',
                   trueText: '&#10003;',
                   text: 'Habis Cuti'
                },
                {
                   dataIndex: 'rest',
                   text: 'Sisa Cuti',
                   renderer: function(value, metadata, record) {
                        if (value==="") {
                            return 0;
                        }else{
                            return value;
                        }
                        
                    }
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