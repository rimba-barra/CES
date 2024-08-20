Ext.define('Cashier.library.template.combobox.Kasbonreffcombobox', {
    extend         : 'Cashier.library.component.Combobox',
    alias          : 'widget.kasbonreffcombobox',
    store          : 'Kasbonreffcombo',
    fieldLabel     : 'Reference Cashbon',
    dynamicdata    : 0,
    displayField   : 'voucher_no',
    valueField     : 'kasbondept_id',
    matchFieldWidth: false,
    typeAhead      : true,
    tpl            : Ext.create('Ext.XTemplate',
          '<table class="x-grid-table" width="500px" >',
            '<tr class="x-grid-row">',
                '<th width="300px"><div class="x-column-header x-column-header-inner">Cashbon No.</div></th>',
                '<th width="100px"><div class="x-column-header x-column-header-inner">Amount</div></th>',
                '<th width="100px"><div class="x-column-header x-column-header-inner">Remaining</div></th>',
           
            '</tr>',
            '<tpl for=".">',
                '<tr class="x-boundlist-item">',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{voucher_no}</div></td>',
                    '<td><div class="x-grid-cell x-grid-cell-inner">{amount}</div></td>',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{remainingkasbon}</div></td>',                     
                '</tr>',
            '</tpl>',
         '</table>'
    ),
     
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})