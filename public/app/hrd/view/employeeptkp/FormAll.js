Ext.define('Hrd.view.employeeptkp.FormAll', {
    extend: 'Hrd.library.template.view.FormData',
    alias: 'widget.employeeptkpformall',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 300,
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
                    name: 'mode_name',
                    value: 'default'
                },
                {
                    xtype: 'ptkpcombobox',
                    fieldLabel: 'PTKP',
                    name:'ptkp_id', 
                    allowBlank: false,
                    anchor:'40%'
                },
                {
                    xtype: 'ptkpcombobox',
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
                action: 'saveselected',
                itemId: 'btnSave',
                padding: 5,
                width: 150,
                iconCls: 'icon-save',
                text: 'Save to Selected Record'
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
            },
            {
                xtype:'tbfill'
            },
            {
                xtype: 'button',
                action: 'saveall',
                itemId: 'btnSaveall',
                padding: 5,
                width: 150,
                iconCls: 'icon-save',
                text: 'Save to Filtered Record'
            }
            ]
        }
        ];
        return x;
    },

});

