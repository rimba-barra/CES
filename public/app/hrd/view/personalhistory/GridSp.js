Ext.define('Hrd.view.personalhistory.GridSp', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.personalhistoryspgrid',
    storeConfig: {
        id: 'PersonalhistoryGridSpStore',
        idProperty: 'sanction_id',
        extraParams: {
            mode_read: 'sp',
            employee_id:0
        }
    },
    id: 'PrsSpGridID',
    bindPrefixName: 'Personalhistory',
    newButtonLabel: '',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems:[],
            defaults: {
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
                   dataIndex: 'sanctiontype_sanctiontype',
                   text: 'Type'
                },
                {
                   
                   dataIndex: 'employee_employee_name',
                   text: 'Employee'
                },
                {
                   xtype:'datecolumn',
                   format:'d-m-Y',
                   dataIndex: 'start_date',
                   text: 'Start Date'
                },
                {
                   xtype:'datecolumn',
                   format:'d-m-Y',
                   dataIndex: 'end_date',
                   text: 'End date'
                },
                
                
                //me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});