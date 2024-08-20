Ext.define('Hrd.view.absentrecord.FormCorrectionAbsent', {
    alias: 'widget.absentrecordformcorrectionabsent',
    extend: 'Hrd.library.box.view.FormData',
    frame: true,
    requires: ['Hrd.template.ComboBoxFields'],
    autoScroll: true,
    editedRow: -1,
    height:275,
    deletedData: {},
    initComponent: function() {
        var me = this;
        var cbf = new Hrd.template.ComboBoxFields();

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'timein'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'timeout'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'timein_type'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'timeout_type'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'absentdetail_id'
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '10px 0 0 0',
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Date',
                            name: 'absentrecorddate',
                            readOnly: true
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '10px 0 0 0',
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Time In (Before)',
                            name: 'absentrecordtimein',
                            readOnly: true
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype:'combobox',
                            fieldLabel: 'Time In (After)',
                            name:'timein_id',
                            displayField: 'time',
                            valueField: 'time',
                            emptyText: 'Select Time In',
                            allowBlank:false,
                            onFocus: function() {
                                var me = this;

                                if (!me.isExpanded) {
                                    me.expand()
                                }
                                me.getPicker().focus();
                            },
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'checkbox',
                            name: 'timein_null',
                            inputValue: '1',
                            boxLabel: 'Set Null',
                            flex: 1,
                            listeners: { // added by rico 13022024
                                change: function(el, newValue, oldValue, eOpts) {
                                    if(newValue){
                                        me.down('[name=timein_id]').setValue('00:00:00');
                                    }else{
                                        me.down('[name=timein_id]').setValue(me.down('[name=timein]').getValue());
                                    }
                                }
                            }
                        },
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '10px 0 0 0',
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Time Out (Before)',
                            name: 'absentrecordtimeout',
                            readOnly: true
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype:'combobox',
                            fieldLabel: 'Time Out (After)',
                            name:'timeout_id',
                            displayField: 'time',
                            valueField: 'time',
                            emptyText: 'Select Time Out',
                            allowBlank:false,
                            onFocus: function() {
                                var me = this;

                                if (!me.isExpanded) {
                                    me.expand()
                                }
                                me.getPicker().focus();
                            },
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'checkbox',
                            name: 'timeout_null',
                            inputValue: '1',
                            boxLabel: 'Set Null',
                            flex: 1,
                            listeners: { // added by rico 13022024
                                change: function(el, newValue, oldValue, eOpts) {
                                    if(newValue){
                                        me.down('[name=timeout_id]').setValue('00:00:00');
                                    }else{
                                        me.down('[name=timeout_id]').setValue(me.down('[name=timeout]').getValue());
                                    }
                                }
                            }
                        },
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '10px 0 0 0',
                    items: [
                        {
                            fieldLabel: 'Reason',
                            xtype: 'textareafield',
                            width:'540px',
                            name:'reason',
                            allowBlank:false
                        }
                    ]
                }

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
                        action: 'process',
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
                    },
                    {xtype:'tbfill'},
                    {
                        xtype: 'button',
                        action: 'view',
                        itemId: 'btnView',
                        padding: 5,
                        width: 75,
                        text: 'View Log',                       
                    },
                ]
            }
        ];
        return x;
    }
});