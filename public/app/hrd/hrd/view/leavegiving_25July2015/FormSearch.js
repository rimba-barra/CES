Ext.define('Hrd.view.leavegiving.FormSearch', {
    extend: 'Hrd.library.box.view.FormSearch',
    alias: 'widget.leavegivingformsearch',
    requires: ['Hrd.template.combobox.Department','Hrd.view.leavegiving.GridEmployee'],
    collapsed: false,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield',
                margin:'0 0 10 0'
            },
            items: [
                {
                    xtype: 'radiogroup',
                    title:'Employee Status',
                    // Arrange radio buttons into two columns, distributed vertically
                    itemId: 'EmployeeStatusFSId',
                 
                    width: '100%',
                    layout: {
                        type:'table',
                        columns:2
                    },
                    defaults: {
                        margin: '0 7 0 0'
                    },
                    flex: 1,
                    items: [
                        {boxLabel: 'Permanet', name: 'employee_status', inputValue: 1, checked: true},
                        {boxLabel: 'Contract', name: 'employee_status', inputValue: 2},
                        {boxLabel: 'Candidate', name: 'employee_status', inputValue: 3},
                        {boxLabel: 'Permanent Daily', name: 'employee_status', inputValue: 4},
                        {boxLabel: 'Contract Daily', name: 'employee_status', inputValue: 5},
                        {boxLabel: 'Temporary', name: 'employee_status', inputValue: 6},
                    ]
                },
                
                {
                    xtype:'cbdepartment',
                    name:'department_id',
                    labelAlign:'top',
                    width:'100%',
                    preLoad:true
                },
                {
                    xtype:'leavegivingemployeegrid'
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});