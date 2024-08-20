Ext.define('Cashier.library.template.combobox.Ptcustomcombobox', {
    extend: 'Cashier.library.component.Combobox',
    xtype:'combo',
    alias: 'widget.ptcustomcombobox',
    store: 'Ptcustom', //masuk dalam store
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'PT/ Company',
    displayField: 'pt_name', //mengambil data dari store
    valueField: 'projectpt_id', //mengambil data dari store
    matchFieldWidth: false,
   // width: 300,
    typeAhead: true,
    tpl: Ext.create('Ext.XTemplate',
            '<table class="x-grid-table" width="700" >',
            '<tr class="x-grid-row">',
            '<th style="display:none" width="200px"><div class="x-column-header x-column-header-inner">Project ID</div></th>',
            '<th width="80"><div class="x-column-header x-column-header-inner">Project Code</div></th>',
            '<th width="250"><div class="x-column-header x-column-header-inner">Project Name</div></th>',
            '<th width="80"><div class="x-column-header x-column-header-inner">Pt Code</div></th>',
            '<th width="300"><div class="x-column-header x-column-header-inner">Pt Name</div></th>',
            '</tr>',
            '<tpl for=".">',
            '<tr class="x-boundlist-item">',
             '<td style="display:none"><div class="x-grid-cell x-grid-cell-inner">{project_id}</div></td>',
            '<td ><div class="x-grid-cell x-grid-cell-inner">{project_code}</div></td>',
            '<td ><div class="x-grid-cell x-grid-cell-inner">{project_name}</div></td>',
            '<td ><div class="x-grid-cell x-grid-cell-inner">{pt_code}</div></td>',
            '<td ><div class="x-grid-cell x-grid-cell-inner">{pt_name}</div></td>',
            '</tr>',
            '</tpl>',
            '</table>'
            ),
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    },
})


