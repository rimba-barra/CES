Ext.define('Hrd.view.absentrecord.GridEmployee', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.absentrecordemployeegrid',
    storeConfig:{
        id:'AbsentGridEmployeeStore',
        idProperty:'absent_id',
        extraParams:{
            mode_read: 'startparams'
        }
    },
    height:200,
    id:'AbrecEmployeeGridID',
    bindPrefixName: 'Absentrecord',
    newButtonLabel: 'New Employee',
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
                   dataIndex: 'employee_employee_nik',
                   text: 'NIK',
                   width:50
                },
                {
                   dataIndex: 'employee_employee_name',
                   text: 'Name',
                   width:170
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
            hidden: false,
            items: [
            ]
        };
        return ac;
    }
});