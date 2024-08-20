Ext.define('Cashier.library.template.combobox.Subglcomboboxb', {
    extend: 'Cashier.library.component.Combobox',
    alias: 'widget.subglcomboboxb',
    store: 'Subglb', //masuk dalam store
    dynamicdata:0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Sub Code',
    displayField: 'code', //mengambil data dari store
    valueField: 'subgl_id', //mengambil data dari store
    matchFieldWidth: false,
    typeAhead: true,
    minChar: 2,
    listeners: {
        afterrender: function(c) {
            new Ext.ToolTip({
                target: Ext.ComponentQuery.query('[name='+c.name+']')[0].getEl(),
                html: 'Mohon ketik beberapa karakter terlebih dahulu untuk memunculkan daftar sub.'
            });
        },
        keyup: function(field) {
            if (field.getValue() == "" || field.getValue() == null) {
                field.getStore().removeAll();
            }
        }
    },  
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


