Ext.define('Master.library.template.combobox.Typeloancombobox', {
    extend: 'Master.library.component.Combobox',
    alias: 'widget.typeloancombobox',
    store: 'Typeloan', //masuk dalam store
    dynamicdata:0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Type Loan',
    displayField: 'description', //mengambil data dari store
    valueField: 'typeloan_id', //mengambil data dari store
    matchFieldWidth: false,
    typeAhead: true,
    tpl: Ext.create('Ext.XTemplate',
            '<table class="x-grid-table" width="700" >',
            '<tr class="x-grid-row">',
                '<th width="80"><div class="x-column-header x-column-header-inner">Code</div></th>',
                '<th width="250"><div class="x-column-header x-column-header-inner">Description</div></th>',
                '<th width="80"><div class="x-column-header x-column-header-inner">Type Loan</div></th>',
            '</tr>',
            '<tpl for=".">',
            '<tr class="x-boundlist-item">',
                '<td ><div class="x-grid-cell x-grid-cell-inner">{code}</div></td>',
                '<td ><div class="x-grid-cell x-grid-cell-inner">{description}</div></td>',
                '<td ><div class="x-grid-cell x-grid-cell-inner">{typeinterest}</div></td>',           
            '</tr>',
            '</tpl>',
            '</table>'
            ),
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    },
})


