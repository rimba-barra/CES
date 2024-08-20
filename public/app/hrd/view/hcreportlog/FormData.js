Ext.define('Hrd.view.hcreportlog.FormData', {
    alias: 'widget.hcreportlogformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: [],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;

        var monthList = [], yearList = [];
        for (var i = 0; i < 12; i++) {
            monthList.push({
                "id": i + 1, "name": i + 1
            });
        }

        var year = new Date().getFullYear();
        year_ = parseInt(year) - 5;

        for (var i = year; i >= year_; i--) {
            yearList.push({
                "id": i, "name": i
            });
        }

        var monthStore = Ext.create('Ext.data.Store', {
            fields: ['id', 'name'],
            data: monthList
        });

        var yearStore = Ext.create('Ext.data.Store', {
            fields: ['id', 'name'],
            data: yearList
        });

        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'log_hcreport_id'
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'label',
                            text: 'Filename',
                            width: 100
                        },
                        {
                            xtype: 'textfield',
                            name: 'filename',
                            readOnly: true,
                            width:250,
                        },
                    ]
                }, 
                {
                    xtype: 'checkbox',
                    boxLabel: 'mark this file',
                    fieldLabel:'&nbsp;',
                    name: 'is_mark',
                    uncheckedValue: '0',
                    inputValue: '1',
                    margin:'10 0 0 0'                    
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'label',
                            text: 'Periode',
                            width: 100
                        },

                        {
                            xtype: 'combobox',
                            name: 'mark_month',
                            store: monthStore,
                            queryMode: 'local',
                            width:140,
                            displayField: 'name',
                            valueField: 'id',
                            margin:'0 10 0 0'
                        },
                        {
                            xtype: 'combobox',
                            name: 'mark_year',
                            store: yearStore,
                            queryMode: 'local',
                            width:140,
                            displayField: 'name',
                            valueField: 'id',
                        }

                    ]
                },   
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});