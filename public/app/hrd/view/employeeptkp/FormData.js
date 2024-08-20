Ext.define('Hrd.view.employeeptkp.FormData', {
    extend: 'Hrd.library.template.view.FormData',
    alias: 'widget.employeeptkpformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 350,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                anchor: '80%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'mode_read',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'employeeptkp_id',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'employee_id',
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Employee Name',
                    name: 'employee_name',
                    id: 'employee_name',
                    readOnly:true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Project',
                    name: 'projectname',
                    id: 'projectname',
                    readOnly:true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'PT',
                    name: 'ptname',
                    id: 'ptname',
                    readOnly:true
                },
                {
                    xtype: 'ptkpcombobox',
                    fieldLabel: 'PTKP',
                    name:'ptkp_id', 
                    allowBlank: false,
                    anchor:'40%'
                },
                {
                    xtype: 'ptkpclaimcombobox',
                    fieldLabel: 'PTKP Claim',
                    name:'ptkp_claim_id', 
                    allowBlank: false,
                    anchor:'40%'
                },
                {
                    xtype: 'datefield',
                    format: 'd-m-Y',
                    submitFormat: 'Y-m-d',
                    itemId: 'fdms_effective_date',
                    name: 'effective_date',
                    fieldLabel: 'Effective Date',
                    allowBlank: false,
                    readOnly: false,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    anchor:'40%'
                },
                {
                    xtype: 'datefield',
                    format: 'd-m-Y',
                    submitFormat: 'Y-m-d',
                    itemId: 'fdms_claim_effective_date',
                    name: 'claim_effective_date',
                    fieldLabel: 'Claim Effective Date',
                    allowBlank: false,
                    readOnly: false,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    anchor:'40%'
                },
                {
                    xtype: 'textareafield',
                    itemId: 'fdms_note',
                    name: 'note',
                    fieldLabel: 'Note',
                    readOnly: false,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                },
                {
                    fieldLabel: '&nbsp;',
                    xtype: 'checkbox',
                    itemId: 'fdms_is_checked',
                    name: 'is_checked',
                    boxLabel: 'Checked',
                    inputValue: '1',
                    uncheckedValue: '0'
                },
                {
                    fieldLabel: '&nbsp;',
                    xtype: 'checkbox',
                    itemId: 'fdms_is_applied',
                    name: 'is_applied',
                    boxLabel: 'Applied',
                    inputValue: '1',
                    uncheckedValue: '0'
                }  
            ],
            dockedItems: me.generateDockedItemCustome()
        });

        me.callParent(arguments);
    },
     generateDockedItemCustome: function() {
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
                handler: function() {
                    this.up('window').close();
                }
            }
            ]
        }
        ];
        return x;
    },

});

