Ext.define('Hrd.view.privacypolicy.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.privacypolicyformsearch',
    initComponent: function() {
        var me = this;

        var yearList = [];

        var year = new Date().getFullYear();
        // var year_ = new Date().getFullYear();
        year_ = parseInt(year) - 5;

        for (var i = year; i >= year_; i--) {
            yearList.push({
                "id": i, "name": i
            });
        }

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
                    fieldLabel:'Marked Year',
                    xtype: 'combobox',
                    name: 'year_submit',
                    store: yearStore,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                },
                {
                    name:'employee_name',
                    fieldLabel:'Employee Name'
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});