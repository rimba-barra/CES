Ext.define('Hrd.view.holiday.FormData', {
    alias: 'widget.holidayformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.template.combobox.ShiftType', 'Hrd.template.combobox.Department'],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    height: 420,
    initComponent: function() {
        var me = this;



        var years = [];
        var temp = '';
        var yDate = new Date();
        yDate = yDate.getFullYear();
        for (var i = (yDate - 2); i <= (yDate + 5); i++) {

            years.push({
                "number": i, "name": i
            });
        }
        ////
        var yearStore = Ext.create('Ext.data.Store', {
            fields: ['number', 'name'],
            data: years
        });


        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'calendar_id'
                },
                {
                    xtype: 'fieldset',
                    title: 'Filter',
                    layout: 'hbox',
                    defaults: {
                        margin: '0 10',
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Year',
                            name: 'year',
                            displayField: 'name',
                            valueField: 'number',
                            value: yDate,
                            flex: 1,
                            store: yearStore
                        },
                        {
                            flex: 1,
                            xtype: 'cbdepartment',
                            name: 'department_department_id'
                        },
                        {
                            xtype: 'button',
                            action: 'lookup',
                            padding: 5,
                            disabled:true,
                            iconCls: 'icon-search',
                            text: 'Fill from another Calendar'
                        },
                        {
                            xtype: 'button',
                            action: 'process',
                            padding: 5,
                            width: 75,
                            iconCls: 'icon-save',
                            text: 'Process'
                        }
                    ]
                }
                , {
                    xtype: 'tabpanel',
                    id: 'monthTabPanelID',
                    activeTab: 0, // index or id
                    //  items: monthElements,
                    items: []
                }],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});