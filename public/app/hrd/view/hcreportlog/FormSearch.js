Ext.define('Hrd.view.hcreportlog.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.hcreportlogformsearch',
    initComponent: function() {
        var me = this;

        var monthList = [], yearList = [];
        for (var i = 0; i < 12; i++) {
            monthList.push({
                "id": i + 1, "name": i + 1
            });
        }

        var year = new Date().getFullYear();
        // var year_ = new Date().getFullYear();
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
                xtype:'textfield'
            },
            
            items: [
                {
                    name:'report_type',
                    fieldLabel:'Report Type'
                },
                {
                    xtype: 'datefield',
                    name:'cutoff_date',
                    fieldLabel:'Cut Off Date'
                },
                {
                    fieldLabel:'Marked',
                    xtype: 'combobox',
                    name: 'is_mark',
                    store: new Ext.data.SimpleStore({
                        data : [['1', 'Yes'], ['0', 'No']],
                        fields : ['id', 'name']
                    }),
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    value: ''
                },
                {
                    fieldLabel:'Marked Month',
                    xtype: 'combobox',
                    name: 'mark_month',
                    store: monthStore,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                },
                {
                    fieldLabel:'Marked Year',
                    xtype: 'combobox',
                    name: 'mark_year',
                    store: yearStore,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});