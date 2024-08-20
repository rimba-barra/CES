Ext.define('Gl.view.coa.FormData', {
    extend: 'Gl.library.template.view.FormData',
    alias: 'widget.coaformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'padding:5px 5px 0',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                //labelAlign: 'top',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'countparam',
                    value: 0
                },
                {
                    xtype: 'hiddenfield',
                    itemId: 'fdms_coa_id',
                    name: 'coa_id'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_coacode',
                    emptyText: 'Insert with number',
                    name: 'coacode',
                    fieldLabel: 'Chart of Account(COA)',
                    allowBlank: false,
                    enforceMaxLength: true,
                    maxLength: 9,
                    absoluteReadOnly: true,
                    anchor: '-5',
                    enableKeyEvents: true
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_name',
                    name: 'name',
                    fieldLabel: 'Account Name',
                    emptyText: 'Insert with string',
                    allowBlank: false,
                    enforceMaxLength: true,
                    //absoluteReadOnly: true,
                    maxLength: 100,
                    anchor: '-5'
                },
                /*
                 {
                 xtype: 'textfield',
                 itemId: 'fdms_name_convert',
                 name: 'name_convert',
                 fieldLabel: 'Account Name (In English)',
                 emptyText:'Insert with string',
                 allowBlank: false,
                 enforceMaxLength: true,
                 //absoluteReadOnly: true,
                 maxLength: 100,
                 anchor: '-5'
                 },
                 */
                {
                    xtype: 'coacombobox',
                    fieldLabel: 'Parent (COA)',
                    emptyText: 'Please Select Parent',
                    anchor: '-5',
                    allowBlank: true,
                    name: 'parent_id',
                    itemId: 'fdms_parent_id',
                    id: 'fdms_parent_id',
                    absoluteReadOnly: true,
                    flex: 1,
                    /*
                     listeners: {
                     afterrender: function() {
                     var stateform = this.up('window').state.toLowerCase();
                     if(stateform=='update'){
                     Ext.getCmp('fdms_coa').setDisabled(true);
                     }                           
                     }                        
                     }
                     */
                },
                {
                    xtype: 'hiddenfield',
                    fieldLabel: 'Parent Code(COA)',
                    anchor: '-5',
                    allowBlank: false,
                    name: 'parent_code',
                    itemId: 'fdms_parent_code',
                    id: 'fdms_parent_code',
                    flex: 1
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Account Type',
                    defaultType: 'radiofield',
                    defaults: {
                        flex: 3
                    },
                    layout: 'hbox',
                    items: [
                        {
                            boxLabel: 'Debet',
                            name: 'type',
                            inputValue: 'D',
                            id: 'radio1'
                        },
                        {
                            boxLabel: 'Credit',
                            name: 'type',
                            inputValue: 'C',
                            id: 'radio2'
                        }
                    ]

                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Status of Journal',
                    defaultType: 'radiofield',
                    itemId: 'datajournal',
                    defaults: {
                        flex: 3
                    },
                    layout: 'hbox',
                    items: [
                        {
                            boxLabel: 'Journal',
                            name: 'is_journal',
                            inputValue: '1',
                            checked: false,
                            id: 'radio3'
                        },
                        {
                            boxLabel: 'No Journal',
                            name: 'is_journal',
                            inputValue: '0',
                            checked: false,
                            id: 'radio4'
                        }
                    ]

                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Status of Report',
                    defaultType: 'radiofield',
                    defaults: {
                        flex: 1
                    },
                    layout: 'hbox',
                    items: [
                        {
                            boxLabel: 'Neraca',
                            name: 'report',
                            inputValue: 'N',
                            id: 'radio5'
                        },
                        {
                            boxLabel: 'Profit Loss',
                            name: 'report',
                            inputValue: 'L',
                            id: 'radio6'
                        }
                    ]

                },
                {
                    xtype: 'numberfield',
                    anchor: '100%',
                    itemId: 'fdms_level',
                    name: 'level',
                    allowBlank: false,
                    fieldLabel: 'Account Level',
                    maxValue: 12,
                    minValue: 1,
                    readOnly: true,
                },
                {
                    xtype: 'subaccountgroupcombobox',
                    emptyText: 'Please Select',
                    fieldLabel: 'Sub Account Group',
                    anchor: '-5',
                    allowBlank: true,
                    name: 'kelsub_id',
                    itemId: 'fdms_kelsub_id',
                    id: 'fdms_kelsub_id',
                    flex: 1
                },
                {
                    xtype: 'groupglcombobox',
                    emptyText: 'Please Select',
                    name: 'group_gl',
                    id: 'fdms_group_gl',
                }
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

