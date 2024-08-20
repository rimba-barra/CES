Ext.define('Gl.view.coa.FormSearch', {
    extend: 'Gl.library.template.view.FormSearch',
    alias: 'widget.coaformsearch',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'parent_code',
                },
                {
                    xtype: 'textfield',
                    itemId: 'fsms_coacode',
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
                    itemId: 'fsms_name',
                    name: 'name',
                    fieldLabel: 'Account Name',
                    enforceMaxLength: true,
                    maxLength: 100,
                    anchor: '-5'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fsms_name',
                    name: 'name',
                    fieldLabel: 'Account Name',
                    enforceMaxLength: true,
                    maxLength: 100,
                    anchor: '-5'
                },
                /*
                {
                    xtype: 'textfield',
                    itemId: 'fsms_name_convert',
                    name: 'name_convert',
                    fieldLabel: 'Account Name (In English)',
                    enforceMaxLength: true,
                    maxLength: 100,
                    anchor: '-5'
                },
                */
                {
                    xtype: 'coacombobox',
                    fieldLabel: 'Parent (COA)',
                    emptyText: 'Please Select Parent',
                    anchor: '-5',
                    name: 'parent_id',
                    itemId: 'fsms_parent_id',
                    id: 'fsms_parent_id',
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
                            id: 'radio1_search'
                        },
                        {
                            boxLabel: 'Credit',
                            name: 'type',
                            inputValue: 'C',
                            id: 'radio2_search'
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
                            id: 'radio3_search'
                        },
                        {
                            boxLabel: 'No Journal',
                            name: 'is_journal',
                            inputValue: '0',
                            checked: false,
                            id: 'radio4_search'
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
                            id: 'radio5_search'
                        },
                        {
                            boxLabel: 'Profit Loss',
                            name: 'report',
                            inputValue: 'L',
                            id: 'radio6_search'
                        }
                    ]

                },
                {
                    xtype: 'numberfield',
                    anchor: '100%',
                    itemId: 'fsms_level',
                    name: 'level',
                    allowBlank: false,
                    fieldLabel: 'Account Level',
                    maxValue: 12,
                    minValue: 1,
                    readOnly: false
                },
                {
                    xtype: 'subaccountgroupcombobox',
                    emptyText: 'Please Select',
                    fieldLabel: 'Sub Account Group',
                    anchor: '-5',
                    allowBlank: true,
                    name: 'kelsub_id',
                    itemId: 'fsms_kelsub_id',
                    id: 'fsms_kelsub_id',
                    flex: 1
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Acc Code Group',
                    emptyText: 'Please Select',
                    name: 'group_gl',
                    queryMode: 'local',
                    anchor: '100%',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['group_gl_id', 'code', 'desc'],
                        data: [
                            {
                                "group_gl_id": 1,
                                "code": "01",
                                "desc": "Active"

                            },
                            {
                                "group_gl_id": 2,
                                "code": "02",
                                "desc": "Passive"
                            }
                        ]
                    }),
                    displayField: 'desc',
                    valueField: 'group_gl_id',
                    autoSelect: true,
                    forceSelection: true
                }


            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
