Ext.define('Cashier.view.kasbondeptextend.FormApprove', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.kasbondeptextendformapprove',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 200,
    bodyBorder: true,
    bodyPadding: 10,
    uniquename: "_fdkasbondeptextend",
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    id: 'hideparam' + me.uniquename,
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    id: 'project_id' + me.uniquename,
                    name: 'project_id',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'kasbondept_id' + me.uniquename,
                    name: 'kasbondept_id',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'kasbon_extension_id' + me.uniquename,
                    name: 'kasbon_extension_id',
                },
               {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                       {
                    
                    xtype: 'numberfield',
                    fieldLabel: 'Extension Days',
                    anchor: '-5',
                    name: 'extension_days',
                    flex: 1,
                    maxValue: 99,
                    minValue: 1,
                    value:0,
                    enableKeyEvents: true,
                    allowBlank: false,
                    blankText: 'This should not be blank!',
                        },
                      
                    ]
                },
             {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                       {
                            xtype: 'textareafield',
                            fieldLabel: 'Notes',
                            itemId: 'fd_' + me.uniquename,
                            id: 'approval_notes' + me.uniquename,
                            name: 'approval_notes',
                            emptyText: 'Notes',
                            width: 250,
                            readOnly: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                             allowBlank: false,
                            blankText: 'This should not be blank!',
                        },
                      
                    ]
                },
              
              
               
              
             
               
               
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    generateDockedItem: function () {
        var me = this;
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
                        xtype: 'fieldcontainer',
                        layout: 'vbox',
                        align: 'right',
                        bodyBorder: false,
                        defaults: {
                            layout: 'fit'
                        },
                        items: [
                           
                            {xtype: 'tbspacer', height: 5},
                            {
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                align: 'right',
                                bodyBorder: false,
                                defaults: {
                                    layout: 'fit'
                                },
                                items: [
                                    {
                                        xtype: 'button',
                                        action: 'save',
                                        itemId: 'btnSave',
                                        padding: 5,
                                        width: 75,
                                        iconCls: 'icon-approve',
                                        text: 'Approve'
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
                            },
                        ]
                    },
                ]
            }
        ];
        return x;
    }
});

