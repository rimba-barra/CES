Ext.define('Erems.view.expenserequestview.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    requires:['Erems.library.template.component.Departmentcombobox',
        'Erems.library.template.component.Paymentmethodcombobox',
        'Erems.library.template.component.Approvedcombobox'],
    alias:'widget.expenserequestviewformsearch',
    initComponent: function() {
        var me = this;

        var cbf = new Erems.template.ComboBoxFields();
        
        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
            {
                xtype: 'textfield',
                name: 'expense_no',
                fieldLabel: 'Expense No',
                enforceMaxLength: true,
                maskRe: /[^\`"\']/,
                maxLength: 50
            },
            {
                xtype: 'textfield',
                name: 'voucher_no',
                fieldLabel: 'Voucher No',
                enforceMaxLength: true,
                maskRe: /[^\`"\']/,
                maxLength: 50
            },
            {
                xtype:'combobox',
                anchor:'-15',
                name:'department_id',
                fieldLabel: 'Department',
                queryMode:'local',
                displayField: cbf.department.d,
                valueField: cbf.department.v,
            },
            {
                xtype:'paymentmethodcombobox',
                name:'paymentmethod_id',
                anchor:'-15'
            },
            {
                xtype:'approvedcombobox',
                name:'approved',
                anchor:'-15'
            },
            {
                xtype: 'panel',
                height: 48,
                bodyStyle:'background:none;border:0;',
                layout: {
                    type: 'column'
                },
                items: [
                    {
                        xtype: 'datefield',
                        width: 100,
                        id:'fs_mastertype_botexpense_date',
                        name:'bot_expense_date',
                        fieldLabel: 'Request Date',
                        labelSeparator:'',
                        labelAlign: 'top',
                        format:'d-m-Y',
                        labelWidth: 50,
                        submitFormat: 'Y-m-d H:i:s.u',
                        flex: 1,
                        maskRe:/[0-9-]/,
                        enforceMaxLength:true,
                        maxLength:10,
                        listeners: {
                            blur: function(field) {
                                var today = new Date();
                                if(!field.isValid()) {
                                    Ext.Msg.alert('Info', 'Date is invalid!');
                                    field.setValue(today);
                                }
                            }
                        }
                    },
                    {
                        xtype: 'label',
                        margin: '20px 5px',
                        padding: '0px 20px',
                        styleHtmlContent: false,
                        width: 15,
                        text:'s/d'
                    },
                    {
                        xtype: 'datefield',
                        width: 100,
                        id:'fs_mastertype_topexpense_date',
                        name:'top_expense_date',
                        fieldLabel: '&nbsp;',
                        labelSeparator:'',
                        format:'d-m-Y',
                        labelAlign: 'top',
                        submitFormat: 'Y-m-d H:i:s.u',
                        flex: 1,
                        maskRe:/[0-9-]/,
                        enforceMaxLength:true,
                        maxLength:10,
                        listeners: {
                            blur: function(field) {
                                var today = new Date();
                                if(!field.isValid()) {
                                    Ext.Msg.alert('Info', 'Date is invalid!');
                                    field.setValue(today);
                                }
                            }
                        }
                    },
                    {
                        xtype: 'label',
                        margin: '20px 0px',
                        padding: '0px 5px',
                        text: ''
                    }
                ]
            },
            {
                xtype: 'panel',
                height: 48,
                bodyStyle:'background:none;border:0;',
                layout: {
                    type: 'column'
                },
                items: [
                    {
                        xtype: 'datefield',
                        width: 100,
                        id:'fs_mastertype_botapprove_date',
                        name:'bot_approve_date',
                        fieldLabel: 'Approve Date',
                        labelSeparator:'',
                        labelAlign: 'top',
                        format:'d-m-Y',
                        labelWidth: 50,
                        submitFormat: 'Y-m-d H:i:s.u',
                        flex: 1,
                        maskRe:/[0-9-]/,
                        enforceMaxLength:true,
                        maxLength:10,
                        listeners: {
                            blur: function(field) {
                                var today = new Date();
                                if(!field.isValid()) {
                                    Ext.Msg.alert('Info', 'Date is invalid!');
                                    field.setValue(today);
                                }
                            }
                        }
                    },
                    {
                        xtype: 'label',
                        margin: '20px 5px',
                        padding: '0px 20px',
                        styleHtmlContent: false,
                        width: 15,
                        text:'s/d'
                    },
                    {
                        xtype: 'datefield',
                        width: 100,
                        id:'fs_mastertype_topapprove_date',
                        name:'top_approve_date',
                        fieldLabel: '&nbsp;',
                        labelSeparator:'',
                        format:'d-m-Y',
                        labelAlign: 'top',
                        submitFormat: 'Y-m-d H:i:s.u',
                        flex: 1,
                        maskRe:/[0-9-]/,
                        enforceMaxLength:true,
                        maxLength:10,
                        listeners: {
                            blur: function(field) {
                                var today = new Date();
                                if(!field.isValid()) {
                                    Ext.Msg.alert('Info', 'Date is invalid!');
                                    field.setValue(today);
                                }
                            }
                        }
                    },
                    {
                        xtype: 'label',
                        margin: '20px 0px',
                        padding: '0px 5px',
                        text: ''
                    }
                ]
            }],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});