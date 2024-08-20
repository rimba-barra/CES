Ext.define('Cashier.library.template.combobox.UsermodulecashiercomboboxV2', {
    extend: 'Cashier.library.component.Combobox',    
    alias: 'widget.usermodulecashiercomboboxV2',
    store: 'UsermodulecashierV2', //masuk dalam store
    dynamicdata:1, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'User',
    displayField: 'user_name', //mengambil data dari store
    valueField: 'user_id', //mengambil data dari store
    matchFieldWidth: false,
    typeAhead: true,
    tpl: Ext.create('Ext.XTemplate',
          '<table class="x-grid-table" width="500px" >',
            '<tr class="x-grid-row">',
                '<th width="50px"><div class="x-column-header x-column-header-inner">User id</div></th>',
                '<th width="50px"><div class="x-column-header x-column-header-inner">Username</div></th>',
                '<th width="50px"><div class="x-column-header x-column-header-inner">User Fullname</div></th>',
            '</tr>',
            '<tpl for=".">',
                '<tr class="x-boundlist-item">',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{user_id}</div></td>',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{user_name}</div></td>',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{user_fullname}</div></td>',
                '</tr>',
            '</tpl>',
         '</table>'
     ), 
    initComponent: function() {
        var me = this;       
        me.callParent(arguments);
       
    }
})


