Ext.define('Hrd.view.personalhistory.GridEmployee', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.personalhistoryemployeegrid',
    storeConfig:{
        id:'PersonalhistoryGridEmployeeStore',
        idProperty:'employee_id',
        extraParams:{
            mode_read: 'employee'
        }
    },
    height:200,
    id:'PersonalhistoryemployeegridID',
    bindPrefixName: 'Personalhistory',
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
                   dataIndex: 'employee_nik',
                   text: 'NIK',
                   width:50
                },
                {
                   dataIndex: 'employee_name',
                   text: 'Name'
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