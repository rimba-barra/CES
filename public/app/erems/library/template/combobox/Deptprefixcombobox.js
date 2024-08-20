Ext.define('Erems.library.template.combobox.Deptprefixcombobox', {
    extend: 'Erems.library.component.Comboboxcashier', 
    alias: 'widget.deptprefixcombobox',
    store: 'Deptprefixcombo', //masuk dalam store
    dynamicdata: 1, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Department Prefix',
    displayField: 'department', //mengambil data dari store
    valueField: 'department_id', //mengambil data dari store  
    matchFieldWidth: false,// settingan agar tidak mengikuti field di form
    tpl: Ext.create('Ext.XTemplate',
          '<table class="x-grid-table" width="500px" >',
            '<tr class="x-grid-row">',             
                '<th width="100px"><div class="x-column-header x-column-header-inner">Dept Code</div></th>',
                '<th width="100px"><div class="x-column-header x-column-header-inner">Dept Prefix</div></th>',
                '<th width="200px"><div class="x-column-header x-column-header-inner">Dept Name</div></th>',
            '</tr>',
            '<tpl for=".">',
                '<tr class="x-boundlist-item">',                   
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{deptcode}</div></td>',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{deptprefix}</div></td>',
                    '<td><div class="x-grid-cell x-grid-cell-inner">{department}</div></td>',
                '</tr>',
            '</tpl>',
         '</table>'
     ),    
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


