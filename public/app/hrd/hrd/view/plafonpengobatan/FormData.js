Ext.define('Hrd.view.plafonpengobatan.FormData', {
    alias: 'widget.plafonpengobatanformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.template.ComboBoxFields'],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;

        var cbf = new Hrd.template.ComboBoxFields();
        
        var yearStore = Ext.create('Ext.data.ArrayStore', {
            fields: ['number', 'name'],
            id:0,
            data:[]
        });


        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'shifttype_id'
                },
                {
                    xtype:'combobox',
                    name: 'year',
                    store:yearStore,
                    queryMode:'local',
                    displayField:'name',
                    valueField:'number',
                    fieldLabel: 'Year'
                },
                {
                    xtype: 'fieldset',
                    layout: 'hbox',
                    border: 0,
                    margin: '0 0 5px 0',
                    padding: 0,
                    width: 400,
                    defaults: {
                        xtype: 'datefield',
                        flex: 1,
                        format: 'd-m-Y',
                        submitFormat: 'Y-m-d',
                        margin: '0 10 0 0'
                    },
                    items: [
                        {
                            fieldLabel: 'Period',
                            flex: 3,
                            name: 'start_date'
                        },
                        {
                            fieldLabel: 'to',
                            flex: 2,
                            labelWidth: 30,
                            name: 'end_date'
                        }
                    ]
                },
                {
                    xtype: 'combobox',
                    name: 'group_group_id',
                    fieldLabel: 'Group (Golongan)',
                    displayField: cbf.group.d,
                    valueField: cbf.group.v
                },
                {
                    xtype: 'fieldset',
                    layout: 'hbox',
                    border: 0,
                    margin: '0 0 5px 0',
                    padding: 0,
                    width: 400,
                    defaults: {
                        flex: 1,
                        margin: '0 10 0 0'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            name: 'jenispengobatan_jenispengobatan_id',
                            fieldLabel: 'Jenis',
                           
                            displayField: cbf.jenispengobatan.d,
                            valueField: cbf.jenispengobatan.v
                        },
                        {
                          
                            fieldLabel: '',
                            xtype:'textfield',
                            readOnly:true,
                            name: 'jenispengobatan_jenispengobatan'
                        }
                    ]
                },
                {
                    name: 'value',
                    fieldLabel: 'Nilai',
                    width: 500
                }

            ],
            dockedItems: [],
            tbar: [
                {
                    padding: '4px 6px',
                    xtype: 'button',
                    disabled: true,
                    action: 'save',
                    cls: 'InfoButton',
                    text: 'Save',
                    iconAlign: 'left',
                    iconCls: 'icon-save'
                },
                '->'

            ]
        });

        me.callParent(arguments);
    }

});