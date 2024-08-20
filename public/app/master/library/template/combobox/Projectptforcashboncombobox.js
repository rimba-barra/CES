Ext.define('Master.library.template.combobox.Projectptforcashboncombobox', {
    extend: 'Master.library.component.Combobox',
    alias: 'widget.projectptforcashboncombobox',
    store: 'Projectptcashbon', //masuk dalam store
    dynamicdata: 1, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Project PT',
    displayField: 'ptname', //mengambil data dari store
    valueField: 'pt_id_cashbon', //mengambil data dari store
    matchFieldWidth: false,
    typeAhead: true,
    tpl: Ext.create('Ext.XTemplate',
            '<table class="x-grid-table" width="700" >',
            '<tr class="x-grid-row">',
            '<th width="80"><div class="x-column-header x-column-header-inner">Project Code</div></th>',
            '<th width="250"><div class="x-column-header x-column-header-inner">Project Name</div></th>',
            '<th width="80"><div class="x-column-header x-column-header-inner">Pt Code</div></th>',
            '<th width="300"><div class="x-column-header x-column-header-inner">Pt Name</div></th>',
            '</tr>',
            '<tpl for=".">',
            '<tr class="x-boundlist-item">',
            '<td ><div class="x-grid-cell x-grid-cell-inner">{projectcode}</div></td>',
            '<td ><div class="x-grid-cell x-grid-cell-inner">{projectname}</div></td>',
            '<td ><div class="x-grid-cell x-grid-cell-inner">{ptcode}</div></td>',
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


