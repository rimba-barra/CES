Ext.define('Cashier.library.template.combobox.Rewardcombobox', {
    extend         : 'Cashier.library.component.Combobox',
    alias          : 'widget.rewardcombobox',
    store          : 'Rewardcombo',                          //masuk dalam store
    fieldLabel     : 'Reward',
    dynamicdata    : 0,                                      //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    displayField   : 'purchaseletter_no',                    //mengambil data dari store
    valueField     : 'purchaseletter_reward_id',             //mengambil data dari store   
    matchFieldWidth: false,
    typeAhead      : true,
    tpl            : Ext.create('Ext.XTemplate',
          '<table class="x-grid-table" width="500px" >',
            '<tr class="x-grid-row">',
                '<th width="300px"><div class="x-column-header x-column-header-inner">Purchaseletter No.</div></th>',
                '<th width="100px"><div class="x-column-header x-column-header-inner">Unit</div></th>',
                '<th width="100px"><div class="x-column-header x-column-header-inner">Code</div></th>',
                '<th width="100px"><div class="x-column-header x-column-header-inner">Reward</div></th>',
                '<th width="100px"><div class="x-column-header x-column-header-inner">Amount</div></th>',
           
            '</tr>',
            '<tpl for=".">',
                '<tr class="x-boundlist-item">',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{purchaseletter_no}</div></td>',
                    '<td><div class="x-grid-cell x-grid-cell-inner">{unit_no}</div></td>',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{code}</div></td>',                   
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{reward_name}</div></td>',                   
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{amount}</div></td>',                   
                '</tr>',
            '</tpl>',
         '</table>'
    ),
     
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


