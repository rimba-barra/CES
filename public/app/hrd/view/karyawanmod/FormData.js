Ext.define('Hrd.view.karyawanmod.FormData', {
    alias: 'widget.karyawanmodformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: [],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;



        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'karyawanmod_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'employee_employee_id'
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype:'textfield',
                            name: 'employee_employee_nik',
                            fieldLabel: 'N.I.K Karyawan',
                            margin:'10px 20px 10px 0',
                            width:'200px'
                        },
                        {
                            margin:'10px 20px 10px 0',
                            xtype:'button',
                            text:'BROWSE',
                            action:'lookup'
                        }
                    ]
                },
                {
                    name: 'employee_employee_name',
                    fieldLabel: 'Nama Karyawan'
                }


            ],
            dockedItems: [],
            tbar: [
                {
                    padding: '4px 6px',
                    xtype: 'button',
                    disabled: true,
                    action: 'save',
                    cls: 'InfoButton',
                    text: 'Save',
                    iconAlign: 'left',
                    iconCls: 'icon-save'
                },
                '->'

            ]
        });

        me.callParent(arguments);
    }

});