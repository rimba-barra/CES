Ext.define('Hrd.view.generalparameter.FormData', {
    alias: 'widget.generalparameterformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: [],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;

        var hours = [];

        var dataType = [{data_type: 'float', data_type_text: 'float'},
            {data_type: 'hour-minute', data_type_text: 'hour-minute'},
            {data_type: 'int', data_type_text: 'int'},
            {data_type: 'boolean', data_type_text: 'boolean'}
        ];

        var moduleListStore = Ext.create('Ext.data.Store', {
            fields: ['module_name', 'module_text'],
            data: hours
        });

        var dataTypeStore = Ext.create('Ext.data.Store', {
            fields: ['data_type', 'data_type_text'],
            data: dataType
        });

        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'generalparameter_id'
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 10 0',
                    defaults: {
                        fieldLabel: 'Module',
                        margin: '0 10 0 0',
                        flex: 1
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            itemId: 'textNameGP',
                            name: 'module_name',
                        },
                        {
                            xtype: 'combobox',
                            itemId: 'comboNameGP',
                            name: 'module_name',
                            store: moduleListStore,
                            queryMode: 'local',
                            displayField: 'module_text',
                            valueField: 'module_name'
                        },
                        {
                            xtype: 'button',
                            currentOpen: 0,
                            action: 'switch',
                            text: 'Create New',
                            width: 100
                        }
                    ]
                },
                {
                    fieldLabel: 'Parameter Name',
                    name: 'name'
                },
                {
                    fieldLabel: 'Data Type',
                    name: 'data_type',
                    xtype: 'combobox',
                    store: dataTypeStore,
                    queryMode: 'local',
                    displayField: 'data_type_text',
                    valueField: 'data_type'

                }

            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});