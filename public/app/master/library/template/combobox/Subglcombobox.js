Ext.define('Master.library.template.combobox.Subglcombobox', {
    extend: 'Master.library.component.Combobox',
    alias: 'widget.subglcombobox',
    store: 'Subgl', //masuk dalam store
    dynamicdata:0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Sub Code',
    displayField: 'code', //mengambil data dari store
    valueField: 'subgl_id', //mengambil data dari store
    matchFieldWidth: false,
    typeAhead: true,
    tpl: Ext.create('Ext.XTemplate',
            '<table class="x-grid-table" width="700" >',
            '<tr class="x-grid-row">',
                '<th width="80"><div class="x-column-header x-column-header-inner">Kelsub</div></th>',
                '<th width="80"><div class="x-column-header x-column-header-inner">Subcode</div></th>',
                '<th width="80"><div class="x-column-header x-column-header-inner">Code 1</div></th>',
                '<th width="80"><div class="x-column-header x-column-header-inner">Code 2</div></th>',
                '<th width="80"><div class="x-column-header x-column-header-inner">Code 3</div></th>',
                '<th width="80"><div class="x-column-header x-column-header-inner">Code 4</div></th>',
                '<th width="150"><div class="x-column-header x-column-header-inner">Description</div></th>',
            '</tr>',
            '<tpl for=".">',
            '<tr class="x-boundlist-item">',
                '<td ><div class="x-grid-cell x-grid-cell-inner">{kelsub}</div></td>',
                '<td ><div class="x-grid-cell x-grid-cell-inner">{subcode}</div></td>',
                '<td ><div class="x-grid-cell x-grid-cell-inner">{code1}</div></td>',
                '<td ><div class="x-grid-cell x-grid-cell-inner">{code2}</div></td>',
                '<td ><div class="x-grid-cell x-grid-cell-inner">{code3}</div></td>',
                '<td ><div class="x-grid-cell x-grid-cell-inner">{code4}</div></td>',
                '<td ><div class="x-grid-cell x-grid-cell-inner">{subdesc}</div></td>',
            '</tr>',
            '</tpl>',
            '</table>'
            ),
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    },
})


