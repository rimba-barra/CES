Ext.define('Hrd.view.trainingattendance.TrainingAttendanceBrowseIntranet', {
    alias: 'widget.trainingattendancebrowseintranet',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.view.trainingattendance.Gridbrowseintranettrainingattendance'],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'combobox',
                    fieldLabel: 'Periode',
                    name: 'trainingperiodeapply_id',
                    store: 'Trainingperiode',
                    width:300,
                    displayField: 'periode',
                    valueField: 'periode',
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Employee',
                    name: 'employee_id',
                    width:300,
                    displayField: 'employee_name',
                    valueField: 'employee_id',
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Is HC Approve',
                    name: 'hc_approve_reject',
                    store : new Ext.data.SimpleStore({
                    data : [[99, 'All'], [1, 'Yes'], [-1, 'No'] ],
                        fields : ['value', 'text']
                    }),
                    valueField : 'value',
                    displayField : 'text',
                },
                {
                    xtype:'button',
                    text:'Search',
                    action:'search_trainingattendance'
                },
                {
                    xtype: 'gridbrowseintranettrainingattendance',
                    height: 180,
                    flex: 2,
                    style: 'padding: 10 0 10 0'
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    generateDockedItem: function() {
        var x = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                layout: {
                    padding: 6,
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'button',
                        action: 'processintranet_trainingattendance',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Process'
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Cancel',
                        handler: function() {
                            this.up('window').close();
                        }
                    }
                ]
            }
        ];
        return x;
    }
});