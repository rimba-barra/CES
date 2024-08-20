Ext.define('Master.library.template.combobox.Ptbydefaultprojectcombobox', {
    extend: 'Master.library.component.Combobox',
    xtype: 'combo',
    alias: 'widget.ptbydefaultprojectcombobox',
    store: 'Ptbydefaultproject', //masuk dalam store
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'PT/ Company',
    displayField: 'ptname', //mengambil data dari store
    valueField: 'pt_id', //mengambil data dari store
    matchFieldWidth: false,
    // width: 300,
    typeAhead: true,
    tpl: Ext.create('Ext.XTemplate',
            '<table class="x-grid-table" width="700" >',
            '<tr class="x-grid-row">',
            '<th width="300"><div class="x-column-header x-column-header-inner">Pt Name</div></th>',
            '</tr>',
            '<tpl for=".">',
            '<tr class="x-boundlist-item">',
            '<td ><div class="x-grid-cell x-grid-cell-inner">{ptname}</div></td>',
            '</tr>',
            '</tpl>',
            '</table>'
            ),
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    },
})


