var currentTime, now, years, y, now;
currentTime = new Date();
now = currentTime.getFullYear();
years = [];
y = currentTime.getFullYear() - 36;

while (y <= (now+10)) {
    years.push([y]);
    y++;
}


var storeThn = new Ext.data.SimpleStore({
    fields: ['tahun'],
    data: years,
    sorters: [{
            property: 'tahun',
            direction: 'DESC'
        }],
});


Ext.define('Cashier.library.template.combobox.Year2combobox', {
    extend: 'Cashier.library.component.Combobox',
    alias: 'widget.year2combobox',
    queryMode: 'local',
    store: storeThn, //masuk dalam store
    displayField: 'tahun', //mengambil data dari store
    valueField: 'tahun', //mengambil data dari store  
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


