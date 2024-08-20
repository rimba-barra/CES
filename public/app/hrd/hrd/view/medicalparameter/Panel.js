Ext.define('Hrd.view.medicalparameter.Panel', {
    extend: 'Hrd.library.box.view.Panel',
    alias: 'widget.medicalparameterpanel',
    itemId: 'MedicalparameterPanel',
    gridPanelName: 'medicalparametergrid',
    formSearchPanelName: 'medicalparameterformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    bodyStyle: 'background:none;border:0;',
                    id:'formMedicalparameterID',
                 
                    margin:'20px 0 0 20px',
                    items: [
                        {
                            xtype: 'fieldset',
                            title: 'Glasses',
                            layout: 'vbox',
                            defaults: {
                                xtype: 'container',
                                layout: 'hbox',
                                margin: '0 0 10px 0'
                            },
                            items: [
                                {
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Lens Claim Limit',
                                            name: 'claim_lens_limit',
                                            margin: '0 10px 0 10px'
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Year',
                                            margin: '5px 0 0 0'
                                        }
                                    ]
                                },
                                {
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Frame Claim Limit',
                                            name: 'claim_frame_limit',
                                            margin: '0 10px 0 10px'
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Year',
                                            margin: '5px 0 0 0'
                                        }
                                    ]
                                }

                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Password',
                            layout: 'vbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    name: 'claim_password',
                                    inputType: 'password',
                                    fieldLabel: ''
                                }
                            ]

                        }
                    ]
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    id:'toolbarMedicalparameterID',
                    height: 28,
                    defaults:[
                        {
                            xtype:'button',
                            margin: '0 5 0 0'
                        }
                    ],
                    items: [
                        
                        {
                         
                            action: 'create',
                            iconCls: 'icon-new',
                            text: 'Add'
                        },
                        {
                         
                            action: 'edit',
                            iconCls: 'icon-edit',
                            text: 'Edit'
                        },
                        {
                         
                            action: 'save',
                            text: 'Save',
                            iconCls: 'icon-save',
                        },
                        {
                         
                            action: 'cancel',
                            iconCls: 'icon-cancel',
                            text: 'Cancel'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});