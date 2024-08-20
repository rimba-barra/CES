var currentTime, now, years, y, now;
currentTime = new Date();
now = currentTime.getFullYear();
years = [];
y = currentTime.getFullYear() - 36;

while (y <= now) {
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


Ext.define('Hrd.template.combobox.Year', {
    extend: 'Hrd.library.box.view.components.Combobox',
    alias: 'widget.year',
    queryMode: 'local',
    store: storeThn, //masuk dalam store
    displayField: 'tahun', //mengambil data dari store
    valueField: 'tahun', //mengambil data dari store  
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


