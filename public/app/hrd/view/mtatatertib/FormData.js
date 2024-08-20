Ext.define('Hrd.view.mtatatertib.FormData', {
    alias: 'widget.mtatatertibformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: [],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'tatatertib_id'
                },
//                {
//                    fieldLabel: 'Index No',
//                    name: 'index_no'
//                },
                 {
                    xtype: 'numberfield',
                    name: 'index_no',
                    fieldLabel: 'Index No',
                    width: 180,
                    hideTrigger: true,
                    keyNavEnabled: false,
                    mouseWheelEnabled: false,
                    readOnly: false,
                    allowBlank: false,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                },
                {
                    xtype: 'textareafield',
                    fieldLabel: 'Disiplin Item',
                    name: 'disiplin_item',
                    grow: true,
                    anchor: '100%',
                    allowBlank: false,
                },
//                {
//                    fieldLabel: 'Bobot (%)',
//                    name: 'bobot',
//                    allowBlank: false,
//                },
                {
                    xtype: 'numberfield',
                    name: 'bobot',
                    fieldLabel: 'Bobot (%)',
                    width: 180,
                    hideTrigger: true,
                    keyNavEnabled: false,
                    mouseWheelEnabled: false,
                    readOnly: false,
                    allowBlank: false,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                },
                {
                    // Fieldset in Column 1
                    xtype: 'fieldset',
                    title: 'RATE PENILAIAN',
                    collapsible: false,
                    defaults: {
                        anchor: '100%',
                        xtype: 'textareafield',
                        grow:true,
                        height:40,

                    },
                    layout: 'vbox',
                    items: [
                        {
                            fieldLabel: 'Rate 1',
                            name: 'rate_1',
                            allowBlank: false,
                            width: '100%',
                        },
                        {
                            fieldLabel: 'Rate 2',
                            name: 'rate_2',
                            allowBlank: false,
                            width: '100%',
                        },
                        {
                            fieldLabel: 'Rate 3',
                            name: 'rate_3',
                            allowBlank: false,
                            width: '100%',
                        },
                        {
                            fieldLabel: 'Rate 4',
                            name: 'rate_4',
                            allowBlank: false,
                            width: '100%',
                        },
                        {
                            fieldLabel: 'Rate 5',
                            name: 'rate_5',
                            allowBlank: false,
                            width: '100%',
                            
                        },
                    ]
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});