Ext.define('Hrd.view.tunjangantetap.FormData', {
    alias: 'widget.tunjangantetapformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.template.combobox.AbsentType','Hrd.library.template.view.MoneyField'],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    height: 500,
    initComponent: function() {
        var me = this;





        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'employee_employee_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'tunjangantetap_id'
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    width: '100%',
                    defaults: {
                        xtype: 'textfield',
                        margin: '0 5 5 0'

                    },
                    items: [
                        {
                            fieldLabel: 'NIK / Nama',
                            name: 'employee_employee_nik',
                            readOnly: true,
                            keepRO: true,
                            width: 300
                        },
                        {
                            fieldLabel: '',
                            name: 'employee_employee_name',
                            readOnly: true,
                            keepRO: true,
                            width: 400
                        },
                        {
                            xtype: 'button',
                            border: 1,
                            text: 'BROWSE..',
                            action: 'lookup_employee',
                            disabled:true,
                            width: 100
                        }
                    ]
                },
                {
                    xtype: 'combobox',
                    name: 'komponengaji_komponengaji_id',
                    fieldLabel: 'Komponen Gaji',
                    displayField: 'code',
                    valueField: 'komponengaji_id',
                },
                {
                    xtype:'xmoneyfield',
                    name:'value',
                    fieldLabel: 'Value',
                }
            ],
            dockedItems: []
        });

        me.callParent(arguments);
    }
});