Ext.define('Hrd.view.personal.FormIntranetca', {
    extend: 'Ext.form.Panel',
    alias: 'widget.personalformintranetca',
    requires: ['Hrd.template.ComboBoxFields'],
    frame: true,
    autoScroll: true,
    height: 380,
    bodyBorder: true,
    bodyPadding: 0,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    uniquename: '_personalformdocument',
    initComponent: function () {
        var me = this;
        var cbf = new Hrd.template.ComboBoxFields();

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'employee_id'
                },             
                {
                    xtype: 'fieldcontainer',
                    layout: 'vbox',
                    align: 'right',
                    autoScroll: true,
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit',
                        margin: "0 10 10 0" //atas, kanan, bawah, kiri
                    },
                    items: [
                        {
                            xtype:'label',
                            itemId:'labelInfo',
                            text:'Silahkan pilih Hak Akses Intranet CA untuk karyawan tersebut',
                            style: 'color:black;',
                            margin: '20 10 0 10',
                        },
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            itemId: 'purchasing',
                            name: 'purchasing',
                            boxLabel: 'Purchasing',
                            padding: '0 0 0 0',
                            margin: '20 10 0 10',
                            boxLabelCls: 'x-form-cb-label small',
                            inputValue: '1',
                            uncheckedValue: '0',
                            checked: false
                        },
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            itemId: 'inventory',
                            name: 'inventory',
                            boxLabel: 'Inventory',
                            padding: '0 0 0 0',
                            margin: '5 10 0 10',
                            boxLabelCls: 'x-form-cb-label small',
                            inputValue: '1',
                            uncheckedValue: '0',
                            checked: false
                        },
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            itemId: 'marketing',
                            name: 'marketing',
                            boxLabel: 'Sales & Marketing',
                            padding: '0 0 0 0',
                            margin: '5 10 0 10',
                            boxLabelCls: 'x-form-cb-label small',
                            inputValue: '1',
                            uncheckedValue: '0',
                            checked: false
                        },
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            itemId: 'finance',
                            name: 'finance',
                            boxLabel: 'Finance & Accounting',
                            padding: '0 0 0 0',
                            margin: '5 10 0 10',
                            boxLabelCls: 'x-form-cb-label small',
                            inputValue: '1',
                            uncheckedValue: '0',
                            checked: false
                        },
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            itemId: 'operational',
                            name: 'operational',
                            boxLabel: 'Operational',
                            padding: '0 0 0 0',
                            margin: '5 10 0 10',
                            boxLabelCls: 'x-form-cb-label small',
                            inputValue: '1',
                            uncheckedValue: '0',
                            checked: false
                        },
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            itemId: 'sales',
                            name: 'sales',
                            boxLabel: 'Sales Project',
                            padding: '0 0 0 0',
                            margin: '5 10 0 10',
                            boxLabelCls: 'x-form-cb-label small',
                            inputValue: '1',
                            uncheckedValue: '0',
                            checked: false
                        },
                    ]
                },
            ],
            dockedItems: me.generateDockedItem()
        });
        me.callParent(arguments);
    },
    generateDockedItem: function () {
        var x = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                padding: '0 0 0 0',
                layout: {
                    padding: 6,
                    type: 'hbox',
                },
                items: [
                    {
                        xtype: 'button',
                        action: 'save',
                        itemId: 'btnSave',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Save'
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Cancel',
                        handler: function () {
                            this.up('window').close();
                        }
                    },
                ]
            }
        ];
        return x;
    }
});

