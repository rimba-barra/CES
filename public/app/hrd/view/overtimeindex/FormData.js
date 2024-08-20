Ext.define('Hrd.view.overtimeindex.FormData', {
    alias: 'widget.overtimeindexformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.template.ComboBoxFields'],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;

        var cbf = new Hrd.template.ComboBoxFields();




        Ext.applyIf(me, {
            defaults: {},
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'overtimeindex_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'overtimetype',
                    value:1
                },
                
                {
                    xtype: 'textfield',
                    name: 'hour',
                    fieldLabel: 'Jam',
                    readOnly: true,
                    size: 10
                },
                {
                    xtype: 'textfield',
                    name: 'cut_break',
                    fieldLabel: 'Potong Istirahat',
                    readOnly: true,
                    size: 10
                },
                {
                    xtype: 'textfield',
                    name: 'meal',
                    fieldLabel: 'Makan Lembur',
                    readOnly: true,
                    size: 10
                },
               /* {
                    xtype: 'textfield',
                    name: 'break_limit',
                    fieldLabel: 'Limit Break',
                    readOnly: true,
                    size: 10
                },*/
                {
                            flex:1,
                            itemId:'breakLimitID',
                            xtype: 'fieldset',
                            title: 'Batasan Istirahat',
                            layout: 'hbox',
                            margin:'15 10 10 0',
                            items: [
                                {
                                    xtype: 'radiogroup',
                                    fieldLabel: '',
                                    // Arrange radio buttons into two columns, distributed vertically
                                    labelWidth: 1,
                                    width: '100%',
                                    layout: 'hbox',
                                    defaults: {
                                        margin: '0 7 0 0'
                                    },
                                    flex: 3,
                                    items: [
                                        {boxLabel: 'Ya', name: 'break_limit', inputValue: "1"},
                                        {boxLabel: 'Tidak', name: 'break_limit', inputValue: "0", checked: true},
                                    ]
                                }
                            ]
                        },
            ],
            dockedItems: []

        });

        me.callParent(arguments);
    }

});